<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use App\Models\Product;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
    public function index()
    {
        $userId = Auth::id();
        Log::info('Cart Index - User ID: ' . $userId);
        
        $cartItems = CartItem::with(['product.category', 'product.addons'])
            ->where('user_id', $userId)
            ->get()
            ->filter(function ($item) {
                // Filter out items with deleted products
                return $item->product !== null;
            });

        // Remove orphaned cart items (products that were deleted)
        CartItem::where('user_id', $userId)
            ->whereDoesntHave('product')
            ->delete();

        Log::info('Cart Items Count: ' . $cartItems->count());

        // Transform to include subtotal and addon details
        $cartItems = $cartItems->map(function ($item) {
            // Calculate product subtotal
            $productSubtotal = $item->quantity * $item->price;
            
            // Calculate addon subtotal
            $addonSubtotal = 0;
            if (!empty($item->addon_ids)) {
                $addonIds = array_column($item->addon_ids, 'addon_id');
                $addonsDetail = $item->product->addons->whereIn('id', $addonIds);
                
                foreach ($item->addon_ids as $addonItem) {
                    $addon = $addonsDetail->firstWhere('id', $addonItem['addon_id']);
                    if ($addon) {
                        $addonSubtotal += $addon->price * $addonItem['quantity'];
                    }
                }
                
                $item->addons_detail = $addonsDetail->map(function($addon) use ($item) {
                    $addonItem = collect($item->addon_ids)->firstWhere('addon_id', $addon->id);
                    $addon->cart_quantity = $addonItem['quantity'] ?? 0;
                    return $addon;
                })->values();
            }
            
            $item->subtotal = $productSubtotal + $addonSubtotal;
            
            return $item;
        });

        $total = $cartItems->sum('subtotal');

        return Inertia::render('Cart/Index', [
            'cartItems' => $cartItems->values(), // Convert to array with sequential keys
            'total' => $total
        ]);
    }

    /**
     * Add product to cart
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        Log::info('Add to Cart Request - All:', $request->all());
        Log::info('Add to Cart Request - Input:', $request->input());
        Log::info('Add to Cart Request - JSON:', $request->json()->all());
        
        $product = Product::find($request->product_id);
        
        if (!$product) {
            Log::error('Product not found:', ['product_id' => $request->product_id]);
            return back()->with('error', 'Produk tidak ditemukan');
        }

        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => [
                    'required',
                    'integer',
                    'min:1',
                    function ($attribute, $value, $fail) use ($product) {
                        if ($value > $product->stock) {
                            $fail("Stok tidak mencukupi. Stok tersedia: {$product->stock}");
                        }
                    },
                ],
                'addon_items' => 'nullable|array',
                'addon_items.*.addon_id' => 'required|exists:addons,id',
                'addon_items.*.quantity' => 'required|integer|min:1',
                'addon_items.*.custom_message' => 'nullable|string|max:500'
            ]);
            Log::info('Validation passed:', $validated);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed:', $e->errors());
            throw $e;
        }

        Log::info('Product found:', ['id' => $product->id, 'name' => $product->name, 'stock' => $product->stock]);

        $quantity = $validated['quantity'];
        $addonItems = $validated['addon_items'] ?? [];

        // Validate and calculate addon prices (addons now have independent quantity)
        $addonTotalPrice = 0;
        $addonData = [];
        
        if (!empty($addonItems)) {
            foreach ($addonItems as $item) {
                $addon = \App\Models\Addon::where('id', $item['addon_id'])
                    ->where('is_available', true)
                    ->first();

                if (!$addon) {
                    return back()->with('error', "Add-on tidak ditemukan");
                }
                
                // Verify addon is actually available for this product
                if (!$product->addons->contains('id', $addon->id)) {
                    return back()->with('error', "Add-on '{$addon->name}' tidak tersedia untuk produk ini");
                }

                if ($addon->stock < $item['quantity']) {
                    return back()->with('error', "Stok add-on '{$addon->name}' tidak mencukupi. Tersedia: {$addon->stock}");
                }

                $addonTotalPrice += $addon->price * $item['quantity'];
                $addonData[] = [
                    'addon_id' => $addon->id,
                    'quantity' => $item['quantity'],
                    'custom_message' => $item['custom_message'] ?? null
                ];
            }
        }

        $totalItemPrice = $product->price;

        // Check if product is active
        if (!$product->is_active) {
            Log::warning('Product not active:', ['product_id' => $product->id]);
            return back()->with('error', 'Produk tidak tersedia');
        }

        // Check stock
        if ($product->stock < $quantity) {
            Log::warning('Stock insufficient:', ['product_id' => $product->id, 'stock' => $product->stock, 'requested' => $quantity]);
            return back()->with('error', 'Stok tidak mencukupi. Stok tersedia: ' . $product->stock);
        }

        // Check if item already exists in cart (with same addon configuration)
        $existingCartItem = CartItem::where('user_id', Auth::id())
            ->where('product_id', $validated['product_id'])
            ->get()
            ->first(function ($item) use ($addonData) {
                $itemAddonData = $item->addon_ids ?? [];
                
                // Compare addon configurations
                if (count($itemAddonData) !== count($addonData)) {
                    return false;
                }
                
                // Sort both arrays by addon_id for comparison
                usort($itemAddonData, function($a, $b) {
                    return $a['addon_id'] <=> $b['addon_id'];
                });
                usort($addonData, function($a, $b) {
                    return $a['addon_id'] <=> $b['addon_id'];
                });
                
                return $itemAddonData == $addonData;
            });

        if ($existingCartItem) {
            // Update existing cart item - just increase quantity
            $newQuantity = $existingCartItem->quantity + $quantity;
            if ($product->stock < $newQuantity) {
                Log::warning('Stock insufficient for update:', ['product_id' => $product->id, 'stock' => $product->stock, 'requested' => $newQuantity]);
                return back()->with('error', 'Stok tidak mencukupi. Stok tersedia: ' . $product->stock);
            }
            
            // Also need to validate addon stock for new quantities
            $existingAddonData = $existingCartItem->addon_ids ?? [];
            foreach ($existingAddonData as $addonItem) {
                $addon = \App\Models\Addon::find($addonItem['addon_id']);
                $newAddonQty = $addonItem['quantity'] + ($addonData[array_search($addonItem['addon_id'], array_column($addonData, 'addon_id'))]['quantity'] ?? 0);
                if ($addon && $addon->stock < $newAddonQty) {
                    return back()->with('error', "Stok add-on '{$addon->name}' tidak mencukupi");
                }
            }
            
            $existingCartItem->update([
                'quantity' => $newQuantity,
                'price' => $totalItemPrice
            ]);
            
            Log::info('Cart item updated:', ['cart_item_id' => $existingCartItem->id, 'new_quantity' => $newQuantity]);
            return back()->with('success', 'Jumlah produk di keranjang berhasil diperbarui!');
        } else {
            // Create new cart item
            $cartItem = CartItem::create([
                'user_id' => Auth::id(),
                'product_id' => $validated['product_id'],
                'quantity' => $quantity,
                'price' => $totalItemPrice,
                'addon_ids' => !empty($addonData) ? $addonData : null
            ]);
            
            Log::info('New cart item created:', ['cart_item_id' => $cartItem->id, 'user_id' => Auth::id(), 'product_id' => $product->id, 'quantity' => $quantity, 'addons' => $addonData]);
            return back()->with('success', 'Produk berhasil ditambahkan ke keranjang!');
        }
    }

    /**
     * Update cart item quantity
     * 
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\CartItem $cartItem
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, CartItem $cartItem)
    {
        // Ensure user owns this cart item
        if ($cartItem->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'quantity' => 'required|integer|min:1'
        ]);

        if ($cartItem->product->stock < $validated['quantity']) {
            return back()->with('error', 'Stock tidak mencukupi');
        }

        $cartItem->update([
            'quantity' => $validated['quantity']
        ]);

        return back()->with('success', 'Keranjang diperbarui');
    }

    /**
     * Remove item from cart
     * 
     * @param \App\Models\CartItem $cartItem
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(CartItem $cartItem)
    {
        // Ensure user owns this cart item
        if ($cartItem->user_id !== Auth::id()) {
            abort(403);
        }

        $cartItem->delete();

        return back()->with('success', 'Item dihapus dari keranjang');
    }

    public function clear()
    {
        CartItem::where('user_id', Auth::id())->delete();

        return back()->with('success', 'Keranjang dikosongkan');
    }

    public function count()
    {
        $count = CartItem::where('user_id', Auth::id())->sum('quantity');
        return response()->json(['count' => $count]);
    }

    /**
     * Show checkout page for cart items
     */
    public function checkout()
    {
        $cartItems = CartItem::with(['product.category', 'product.addons'])
            ->where('user_id', Auth::id())
            ->get();

        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')->with('error', 'Keranjang Anda kosong!');
        }

        // Transform to include addon details and calculate proper subtotal
        $cartItems = $cartItems->map(function ($item) {
            
            // Calculate product subtotal
            $productSubtotal = $item->quantity * $item->price;
            
            // Calculate addon subtotal and prepare addon details
            $addonSubtotal = 0;
            $addonsDetail = [];
            
            if (!empty($item->addon_ids) && is_array($item->addon_ids)) {
                $addonIds = array_column($item->addon_ids, 'addon_id');
                
                $addons = $item->product->addons->whereIn('id', $addonIds);
                
                foreach ($item->addon_ids as $addonItem) {
                    $addon = $addons->firstWhere('id', $addonItem['addon_id']);
                    if ($addon) {
                        $addonSubtotal += $addon->price * $addonItem['quantity'];
                        
                        // Add to addons_detail array
                        $addonsDetail[] = [
                            'id' => $addon->id,
                            'name' => $addon->name,
                            'price' => (float)$addon->price,
                            'cart_quantity' => $addonItem['quantity'],
                            'custom_message' => $addonItem['custom_message'] ?? null,
                        ];
                    }
                }
            }
            
            // Convert to array to ensure proper serialization
            return [
                'id' => $item->id,
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => (float)$item->price,
                'subtotal' => $productSubtotal + $addonSubtotal,
                'product' => [
                    'id' => $item->product->id,
                    'name' => $item->product->name,
                    'image' => $item->product->image,
                    'slug' => $item->product->slug,
                ],
                'addons_detail' => $addonsDetail,
            ];
        });

        // Check stock for all items
        foreach ($cartItems as $item) {
            $product = Product::find($item['product_id']);
            
            if ($product->stock < $item['quantity']) {
                return redirect()->route('cart.index')->with('error', 
                    'Stok tidak mencukupi untuk produk: ' . $product->name);
            }
            
            if (!$product->is_active) {
                return redirect()->route('cart.index')->with('error', 
                    'Produk tidak tersedia: ' . $product->name);
            }
        }

        $user = Auth::user();
        $total = $cartItems->sum('subtotal');

        return Inertia::render('CartCheckout', [
            'cartItems' => $cartItems->values()->toArray(),
            'total' => $total,
            'user' => $user,
        ]);
    }

    /**
     * Process checkout from cart
     */
    public function processCheckout(Request $request)
    {
        Log::info('Process Checkout - Request Data:', $request->all());
        
        $request->validate([
            'shipping_name' => 'required|string|max:255',
            'shipping_email' => 'required|email|max:255',
            'shipping_phone' => 'required|string|max:255',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string|max:255',
            'shipping_postal_code' => 'required|string|max:10',
            'notes' => 'nullable|string',
        ]);
        
        Log::info('Validation passed for checkout');

        $cartItems = CartItem::with('product')
            ->where('user_id', Auth::id())
            ->get();

        Log::info('Cart items for checkout:', ['count' => $cartItems->count()]);

        if ($cartItems->isEmpty()) {
            Log::warning('Cart is empty during checkout');
            return redirect()->route('cart.index')->with('error', 'Keranjang Anda kosong!');
        }

        DB::beginTransaction();
        Log::info('Transaction started');

        try {
            // Lock products and validate stock (prevent race conditions)
            $totalAmount = 0;
            $productsToUpdate = [];
            
            foreach ($cartItems as $item) {
                // Lock product row for update to prevent concurrent modifications
                $product = Product::where('id', $item->product_id)
                    ->lockForUpdate()
                    ->first();
                
                if (!$product) {
                    throw new \Exception('Produk tidak ditemukan: ' . $item->product->name);
                }
                
                if ($product->stock < $item->quantity) {
                    throw new \Exception("Stok tidak mencukupi untuk produk: {$product->name}. Stok tersedia: {$product->stock}");
                }
                
                if (!$product->is_active) {
                    throw new \Exception('Produk tidak tersedia: ' . $product->name);
                }
                
                $productsToUpdate[] = [
                    'product' => $product,
                    'quantity' => $item->quantity
                ];
                
                $totalAmount += $item->subtotal;
            }
            
            Log::info('Stock check passed with locks, total amount:', ['total' => $totalAmount]);

            // Generate order number dengan retry untuk prevent race condition
            $maxRetries = 5;
            $orderNumber = null;
            
            for ($i = 0; $i < $maxRetries; $i++) {
                $date = now()->format('Ymd');
                $randomSuffix = strtoupper(substr(uniqid(), -6)); // 6 char random
                $orderNumber = 'ORD-' . $date . '-' . $randomSuffix;
                
                // Check if exists (very unlikely with random suffix)
                if (!Order::where('order_number', $orderNumber)->exists()) {
                    break;
                }
            }
            
            // Fallback jika masih duplicate (almost impossible)
            if (!$orderNumber || Order::where('order_number', $orderNumber)->exists()) {
                $orderNumber = 'ORD-' . strtoupper(uniqid());
            }

            Log::info('Creating order:', ['order_number' => $orderNumber]);

            // Create order
            $order = Order::create([
                'user_id' => Auth::id(),
                'order_number' => $orderNumber,
                'shipping_name' => $request->shipping_name,
                'shipping_email' => $request->shipping_email,
                'shipping_phone' => $request->shipping_phone,
                'shipping_address' => $request->shipping_address,
                'shipping_city' => $request->shipping_city,
                'shipping_postal_code' => $request->shipping_postal_code,
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'payment_status' => 'pending',
                'notes' => $request->notes,
            ]);

            Log::info('Order created:', ['order_id' => $order->id, 'order_number' => $order->order_number]);

            // Create order items and update stock using locked products
            foreach ($cartItems as $index => $item) {
                // Prepare addon data for order item (with independent quantities)
                $addonData = [];
                if (!empty($item->addon_ids)) {
                    foreach ($item->addon_ids as $addonItem) {
                        $addon = \App\Models\Addon::find($addonItem['addon_id']);
                        if ($addon) {
                            $addonData[] = [
                                'addon_id' => $addon->id,
                                'name' => $addon->name,
                                'price' => $addon->price,
                                'quantity' => $addonItem['quantity'],
                                'custom_message' => $addonItem['custom_message'] ?? null
                            ];
                            // Reduce addon stock by its specific quantity
                            $addon->decrement('stock', $addonItem['quantity']);
                        }
                    }
                }

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'product_name' => $item->product->name,
                    'price' => $item->price,
                    'quantity' => $item->quantity,
                    'subtotal' => $item->subtotal,
                    'addon_data' => !empty($addonData) ? $addonData : null,
                ]);

                // Reduce stock using the locked product reference
                $productsToUpdate[$index]['product']->decrement('stock', $item->quantity);

                // Delete cart item
                $item->delete();
            }

            DB::commit();
            Log::info('Transaction committed successfully');

            return redirect()->route('invoice.show', $order->order_number)
                ->with('success', 'Pesanan berhasil dibuat!');

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Checkout failed:', ['error' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);
            
            return back()->with('error', $e->getMessage());
        }
    }
}
