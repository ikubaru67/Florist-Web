import { CheckCircle, Printer, Download, Home, Package, MapPin, Calendar, CreditCard, Truck, Gift } from 'lucide-react';
import { CartItem } from './CartDrawer';

interface OrderData {
  orderNumber: string;
  orderDate: string;
  customerInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryAddress: {
    address: string;
    city: string;
    province: string;
    postalCode: string;
    notes?: string;
  };
  deliveryDate: string;
  shippingMethod: string;
  shippingCost: number;
  paymentMethod: string;
  items: CartItem[];
  subtotal: number;
  total: number;
}

interface ReceiptProps {
  orderData: OrderData;
  onBackToHome: () => void;
}

export function Receipt({ orderData, onBackToHome }: ReceiptProps) {
  const formatPrice = (price: number) => {
    return `Rp${price.toLocaleString('id-ID')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppConfirm = () => {
    // Format WhatsApp message
    let message = `*ORDER CONFIRMATION - KALA FLORIST*\n\n`;
    message += `Order #: *${orderData.orderNumber}*\n`;
    message += `Order Date: ${orderData.orderDate}\n\n`;
    
    message += `*CUSTOMER INFORMATION*\n`;
    message += `Name: ${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}\n`;
    message += `Phone: ${orderData.customerInfo.phone}\n`;
    message += `Email: ${orderData.customerInfo.email}\n\n`;
    
    message += `*DELIVERY ADDRESS*\n`;
    message += `${orderData.deliveryAddress.address}\n`;
    message += `${orderData.deliveryAddress.city}, ${orderData.deliveryAddress.province} ${orderData.deliveryAddress.postalCode}\n`;
    if (orderData.deliveryAddress.notes) {
      message += `Note: ${orderData.deliveryAddress.notes}\n`;
    }
    message += `\n`;
    
    message += `*DELIVERY DATE*\n`;
    message += `${formatDate(orderData.deliveryDate)}\n\n`;
    
    message += `*ORDER ITEMS*\n`;
    orderData.items.forEach((item, index) => {
      const itemTotal = item.price;
      const addOnsTotal = item.addOns?.reduce((sum, addOn) => sum + addOn.price, 0) || 0;
      const lineTotal = (itemTotal + addOnsTotal) * item.quantity;
      
      message += `${index + 1}. ${item.name}\n`;
      message += `   ${formatPrice(itemTotal)} x ${item.quantity} = ${formatPrice(itemTotal * item.quantity)}\n`;
      
      if (item.addOns && item.addOns.length > 0) {
        message += `   Add-ons:\n`;
        item.addOns.forEach(addOn => {
          message += `   • ${addOn.name} - ${formatPrice(addOn.price)}\n`;
        });
      }
      
      if (item.customMessage) {
        message += `   💌 Message: "${item.customMessage}"\n`;
      }
      
      message += `   Subtotal: ${formatPrice(lineTotal)}\n\n`;
    });
    
    message += `*PAYMENT SUMMARY*\n`;
    message += `Subtotal: ${formatPrice(orderData.subtotal)}\n`;
    message += `Shipping (${shippingMethodNames[orderData.shippingMethod]}): ${orderData.shippingCost === 0 ? 'FREE' : formatPrice(orderData.shippingCost)}\n`;
    message += `*TOTAL: ${formatPrice(orderData.total)}*\n\n`;
    
    message += `Payment Method: ${paymentMethodNames[orderData.paymentMethod]}\n\n`;
    
    message += `Please confirm my order. Thank you! 🌸`;

    // WhatsApp business number (ganti dengan nomor toko)
    const phoneNumber = '6281234567890'; // Format: 62 (country code) + nomor tanpa 0
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const shippingMethodNames: { [key: string]: string } = {
    standard: 'Standard Delivery (3-5 business days)',
    express: 'Express Delivery (1-2 business days)',
    sameday: 'Same-Day Delivery'
  };

  const paymentMethodNames: { [key: string]: string } = {
    transfer: 'Bank Transfer',
    ewallet: 'E-Wallet',
    card: 'Credit/Debit Card',
    cod: 'Cash on Delivery'
  };

  return (
    <section className="py-12 px-6 md:px-12 bg-[#FFF5F2] min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl text-[#064232] mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
            Order Confirmed!
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-sm text-gray-500">
            Order #{orderData.orderNumber}
          </p>
        </div>

        {/* Important Notice - WhatsApp Required */}
        <div className="mb-8 print:hidden">
          <div className="bg-amber-50 border-2 border-amber-400 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">!</span>
                </div>
              </div>
              <div>
                <h3 className="text-amber-900 mb-1" style={{ fontFamily: 'Merriweather, serif' }}>
                  Important: Complete Your Order
                </h3>
                <p className="text-sm text-amber-800">
                  Your order is not complete yet. Please confirm your order by sending the details via WhatsApp to our florist.
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Confirmation CTA - Prominent */}
          <div className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 rounded-2xl p-8 text-white shadow-2xl border-4 border-green-400">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
                <svg viewBox="0 0 24 24" className="w-12 h-12 fill-green-600">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              
              <h2 className="text-3xl mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
                Complete Your Order
              </h2>
              <p className="text-lg text-green-50 mb-6">
                Send order confirmation to our florist
              </p>

              {/* Step Instructions */}
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 mb-6 text-left">
                <h3 className="text-lg mb-4 text-center" style={{ fontFamily: 'Merriweather, serif' }}>
                  📋 How to Complete Your Order:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                      1
                    </div>
                    <p className="text-sm text-green-50 pt-1">
                      Click the button below to open WhatsApp with your complete order details
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                      2
                    </div>
                    <p className="text-sm text-green-50 pt-1">
                      Review the pre-filled message containing all your order information
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0 text-green-600">
                      3
                    </div>
                    <p className="text-sm text-green-50 pt-1">
                      Press "Send" in WhatsApp to confirm your order with our florist
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0 text-green-900">
                      ✓
                    </div>
                    <p className="text-sm text-green-50 pt-1">
                      Our team will confirm your order and start preparing your flowers
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleWhatsAppConfirm}
              className="w-full bg-white text-green-600 py-5 rounded-xl hover:bg-green-50 transition-all transform hover:scale-105 flex items-center justify-center gap-3 shadow-xl text-xl"
            >
              <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span style={{ fontFamily: 'Merriweather, serif' }}>Send Order via WhatsApp</span>
            </button>
            
            <p className="text-center text-sm text-green-100 mt-4">
              🔒 Your order details will be sent securely to our business WhatsApp
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 print:hidden">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#FFF5F2] text-gray-500">Order Details</span>
            </div>
          </div>
        </div>

        {/* Action Buttons - Moved Below */}
        <div className="flex flex-wrap gap-3 justify-center mb-8 print:hidden">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#064232] text-[#064232] rounded-lg hover:bg-[#FFF5F2] transition-colors"
          >
            <Printer className="w-5 h-5" />
            Print Receipt
          </button>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-[#064232] text-[#064232] rounded-lg hover:bg-[#FFF5F2] transition-colors"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-2 px-6 py-3 bg-[#064232] text-white rounded-lg hover:bg-[#568F87] transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Receipt Container */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Company Header */}
          <div className="text-center mb-8 pb-8 border-b-2 border-gray-200">
            <h2 className="text-3xl text-[#064232] mb-2" style={{ fontFamily: 'Merriweather, serif' }}>
              Kala Florist
            </h2>
            <p className="text-gray-600">Premium Florist</p>
            <p className="text-sm text-gray-500 mt-2">
              Jl. Bunga Indah No. 123, Jakarta | (021) 12345678 | info@kalaflorist.com
            </p>
          </div>

          {/* Order Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Customer Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-[#568F87]" />
                <h3 className="text-lg text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                  Customer Information
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-[#064232]">
                  {orderData.customerInfo.firstName} {orderData.customerInfo.lastName}
                </p>
                <p className="text-gray-600">{orderData.customerInfo.email}</p>
                <p className="text-gray-600">{orderData.customerInfo.phone}</p>
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#568F87]" />
                <h3 className="text-lg text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                  Delivery Address
                </h3>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <p>{orderData.deliveryAddress.address}</p>
                <p>{orderData.deliveryAddress.city}, {orderData.deliveryAddress.province}</p>
                <p>{orderData.deliveryAddress.postalCode}</p>
                {orderData.deliveryAddress.notes && (
                  <p className="text-xs text-gray-500 mt-2 italic">
                    Note: {orderData.deliveryAddress.notes}
                  </p>
                )}
              </div>
            </div>

            {/* Delivery Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-[#568F87]" />
                <h3 className="text-lg text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                  Delivery Date
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                {formatDate(orderData.deliveryDate)}
              </p>
            </div>

            {/* Order Details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-[#568F87]" />
                <h3 className="text-lg text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                  Order Details
                </h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Date:</span>
                  <span className="text-[#064232]">{orderData.orderDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Order #:</span>
                  <span className="text-[#064232]">{orderData.orderNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="text-xl text-[#064232] mb-4 pb-3 border-b-2 border-gray-200" style={{ fontFamily: 'Merriweather, serif' }}>
              Order Items
            </h3>
            
            <div className="space-y-4">
              {orderData.items.map(item => {
                const itemTotal = item.price;
                const addOnsTotal = item.addOns?.reduce((sum, addOn) => sum + addOn.price, 0) || 0;
                const lineTotal = (itemTotal + addOnsTotal) * item.quantity;

                return (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h4 className="text-[#064232] mb-1">{item.name}</h4>
                      <div className="flex gap-2 mb-2">
                        <span className="text-xs bg-[#064232] text-white px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                          {item.occasion}
                        </span>
                      </div>

                      {/* Add-ons */}
                      {item.addOns && item.addOns.length > 0 && (
                        <div className="bg-[#FFF5F2] p-2 rounded-lg mb-2">
                          <p className="text-xs text-[#568F87] mb-1 flex items-center gap-1">
                            <Gift className="w-3 h-3" />
                            Add-ons:
                          </p>
                          <ul className="space-y-0.5">
                            {item.addOns.map(addOn => (
                              <li key={addOn.id} className="text-xs text-gray-600 flex justify-between">
                                <span>• {addOn.name}</span>
                                <span>{formatPrice(addOn.price)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Custom Message */}
                      {item.customMessage && (
                        <div className="bg-blue-50 p-2 rounded-lg mb-2 border border-blue-200">
                          <p className="text-xs text-blue-800 mb-0.5">💌 Custom Message:</p>
                          <p className="text-xs text-gray-700 italic">"{item.customMessage}"</p>
                        </div>
                      )}

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-500">
                          {formatPrice(itemTotal + addOnsTotal)} × {item.quantity}
                        </span>
                        <span className="text-[#568F87]">
                          {formatPrice(lineTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-[#FFF5F2] rounded-lg p-6">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({orderData.items.length} items)</span>
                <span className="text-[#064232]">{formatPrice(orderData.subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-gray-600">
                <span>Shipping ({shippingMethodNames[orderData.shippingMethod]})</span>
                <span className="text-[#064232]">
                  {orderData.shippingCost === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    formatPrice(orderData.shippingCost)
                  )}
                </span>
              </div>

              <div className="h-px bg-gray-300" />

              <div className="flex justify-between">
                <span className="text-xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                  Total
                </span>
                <span className="text-2xl text-[#064232]" style={{ fontFamily: 'Merriweather, serif' }}>
                  {formatPrice(orderData.total)}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#568F87]" />
                  <span className="text-sm text-gray-600">Payment Method:</span>
                </div>
                <span className="text-[#064232]">
                  {paymentMethodNames[orderData.paymentMethod]}
                </span>
              </div>
            </div>
          </div>

          {/* Status & Next Steps */}
          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <h3 className="text-lg text-green-800 mb-3" style={{ fontFamily: 'Merriweather, serif' }}>
                What's Next?
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>You will receive an order confirmation email at <strong>{orderData.customerInfo.email}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Our florists will prepare your beautiful arrangement with fresh flowers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Your order will be delivered on <strong>{formatDate(orderData.deliveryDate)}</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>We'll send you tracking updates via WhatsApp to <strong>{orderData.customerInfo.phone}</strong></span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p className="mb-2">
              For any questions or concerns, please contact us at (021) 12345678 or info@kalaflorist.com
            </p>
            <p>
              Thank you for choosing Kala Florist! 🌸
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-8 print:hidden">
          <button 
            onClick={onBackToHome}
            className="px-8 py-3 bg-[#064232] text-white rounded-lg hover:bg-[#568F87] transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </section>
  );
}