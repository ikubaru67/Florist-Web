<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    // Admin Dashboard - List all orders
    public function index(Request $request)
    {
        $query = Order::with(['user', 'items.product'])->latest();

        // Filter by status
        if ($request->has('status') && $request->status != '') {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->has('search') && $request->search != '') {
            $query->where(function ($q) use ($request) {
                $q->where('order_number', 'like', '%' . $request->search . '%')
                  ->orWhere('shipping_name', 'like', '%' . $request->search . '%')
                  ->orWhere('shipping_email', 'like', '%' . $request->search . '%');
            });
        }

        $orders = $query->paginate(20);

        return Inertia::render('Admin/Orders/Index', [
            'auth' => [
                'user' => $request->user()
            ],
            'orders' => $orders,
            'filters' => [
                'status' => $request->status,
                'search' => $request->search
            ]
        ]);
    }

    // Show order detail
    public function show(Request $request, Order $order)
    {
        $order->load(['user', 'items.product']);

        return Inertia::render('Admin/Orders/Show', [
            'auth' => [
                'user' => $request->user()
            ],
            'order' => $order
        ]);
    }

    // Accept order (Proses Pesanan)
    public function accept(Request $request, Order $order)
    {
        $request->validate([
            'payment_method' => 'required|in:DANA,GOPAY,OVO,ShopeePay,SeaBank,BANK,QRIS'
        ]);

        $order->update([
            'status' => 'processing',
            'payment_method' => $request->payment_method,
            'payment_status' => 'paid'
        ]);

        return redirect()->back()->with('success', 'Pesanan diterima dan sedang diproses');
    }

    // Reject order (Tolak Pesanan)
    public function reject(Order $order)
    {
        $order->update([
            'status' => 'cancelled'
        ]);

        // Return stock
        foreach ($order->items as $item) {
            $item->product->increment('stock', $item->quantity);
        }

        return back()->with('success', 'Pesanan ditolak');
    }

    // Complete order
    public function complete(Order $order)
    {
        $order->update([
            'status' => 'completed'
        ]);

        return back()->with('success', 'Pesanan selesai');
    }

    // Update order
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,completed,cancelled',
            'payment_status' => 'required|in:pending,paid,failed',
            'notes' => 'nullable|string'
        ]);

        $order->update([
            'status' => $request->status,
            'payment_status' => $request->payment_status,
            'notes' => $request->notes
        ]);

        return back()->with('success', 'Pesanan berhasil diupdate');
    }
}
