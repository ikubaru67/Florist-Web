<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Show order form for specific product
     * 
     * @param \App\Models\Product $product
     * @return \Inertia\Response
     */
    public function create(Product $product)
    {
        return Inertia::render('Order/Create', [
            'product' => $product,
            'user' => Auth::user()
        ]);
    }

    /**
     * Store new order
     * 
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
            'shipping_name' => 'required|string|max:255',
            'shipping_email' => 'required|email',
            'shipping_phone' => 'required|string',
            'shipping_address' => 'required|string',
            'shipping_city' => 'required|string',
            'shipping_postal_code' => 'required|string',
            'notes' => 'nullable|string',
            'custom_request' => 'nullable|string'
        ]);

        $product = Product::findOrFail($validated['product_id']);

        // Check stock
        if ($product->stock < $validated['quantity']) {
            return back()->with('error', 'Stock tidak mencukupi');
        }

        DB::beginTransaction();

        try {
            $totalAmount = $product->price * $validated['quantity'];

            // Create order
            $order = Order::create([
                'user_id' => Auth::id(),
                'total_amount' => $totalAmount,
                'status' => 'pending',
                'payment_method' => 'whatsapp',
                'payment_status' => 'pending',
                'shipping_name' => $validated['shipping_name'],
                'shipping_email' => $validated['shipping_email'],
                'shipping_phone' => $validated['shipping_phone'],
                'shipping_address' => $validated['shipping_address'],
                'shipping_city' => $validated['shipping_city'],
                'shipping_postal_code' => $validated['shipping_postal_code'],
                'notes' => $validated['notes'] ?? null
            ]);

            // Create order item
            OrderItem::create([
                'order_id' => $order->id,
                'product_id' => $product->id,
                'product_name' => $product->name,
                'quantity' => $validated['quantity'],
                'price' => $product->price,
                'subtotal' => $totalAmount
            ]);

            // Update stock
            $product->decrement('stock', $validated['quantity']);

            DB::commit();

            // Redirect to invoice
            return redirect()->route('orders.invoice', $order)
                ->with('success', 'Pesanan berhasil dibuat!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    /**
     * Show user's orders
     * 
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $tab = $request->get('tab', 'all');
        
        $query = Order::with(['items.product', 'items.review'])
            ->where('user_id', Auth::id());

        // Filter based on active tab
        switch ($tab) {
            case 'processing':
                $query->whereIn('status', ['pending', 'processing']);
                break;
            case 'completed':
                $query->where('status', 'completed');
                break;
            case 'cancelled':
                $query->where('status', 'cancelled');
                break;
            case 'need_review':
                // Orders that are completed and have items without reviews
                $query->where('status', 'completed')
                    ->whereHas('items', function($q) {
                        $q->whereDoesntHave('review');
                    });
                break;
            case 'all':
            default:
                // Show all orders
                break;
        }

        $orders = $query->latest()->paginate(10);

        return Inertia::render('Orders/Index', [
            'orders' => $orders,
            'activeTab' => $tab
        ]);
    }

    /**
     * Show order detail
     * 
     * @param \App\Models\Order $order
     * @return \Inertia\Response
     */
    public function show(Order $order)
    {
        // Ensure user owns this order
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->load('items.product');

        return Inertia::render('Orders/Show', [
            'order' => $order
        ]);
    }

    /**
     * Show invoice
     * 
     * @param \App\Models\Order $order
     * @return \Inertia\Response
     */
    public function invoice(Order $order)
    {
        // Ensure user owns this order
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->load('items.product');

        // Generate WhatsApp message
        $message = "Halo, saya ingin konfirmasi pesanan:\n\n";
        $message .= "Order Number: {$order->order_number}\n";
        $message .= "Nama: {$order->shipping_name}\n";
        $message .= "Total: Rp " . number_format($order->total_amount, 0, ',', '.') . "\n\n";
        $message .= "Produk:\n";
        foreach ($order->items as $item) {
            $message .= "- {$item->product_name} x{$item->quantity}\n";
        }

        // Ganti nomor di bawah ini dengan nomor WhatsApp admin Anda
        // Format: kode negara (62 untuk Indonesia) + nomor tanpa 0 di depan
        // Contoh: 081234567890 menjadi 6281234567890
        $whatsappNumber = '6281380973824'; 
        $whatsappUrl = 'https://wa.me/' . $whatsappNumber . '?text=' . urlencode($message);

        return Inertia::render('Orders/Invoice', [
            'order' => $order,
            'whatsappUrl' => $whatsappUrl
        ]);
    }

    /**
     * Show invoice by order number
     * 
     * @param string $orderNumber
     * @return \Inertia\Response
     */
    public function showInvoice($orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)
            ->with('items.product')
            ->firstOrFail();

        // Ensure user owns this order
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        // Generate WhatsApp message
        $message = "Halo, saya ingin konfirmasi pesanan:\n\n";
        $message .= "Order Number: {$order->order_number}\n";
        $message .= "Nama: {$order->shipping_name}\n";
        $message .= "Total: Rp " . number_format($order->total_amount, 0, ',', '.') . "\n\n";
        $message .= "Produk:\n";
        foreach ($order->items as $item) {
            $message .= "- {$item->product_name} x{$item->quantity}\n";
        }

        $whatsappNumber = '6281380973824'; 
        $whatsappUrl = 'https://wa.me/' . $whatsappNumber . '?text=' . urlencode($message);

        return Inertia::render('Orders/Invoice', [
            'order' => $order,
            'whatsappUrl' => $whatsappUrl
        ]);
    }
}
