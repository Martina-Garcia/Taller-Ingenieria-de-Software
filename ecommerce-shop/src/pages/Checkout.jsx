import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Building2, Smartphone, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId] = useState(`ORD-${Date.now()}`);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const subtotal = getCartTotal();
  const shipping = 15000;
  const tax = subtotal * 0.19;
  const total = subtotal + shipping + tax;

  const handlePayment = () => {
    setIsProcessing(true);

    // Simular procesamiento (2 segundos)
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      
      // Limpiar carrito
      setTimeout(() => {
        clearCart();
      }, 1000);
    }, 2000);
  };

  // Redirigir si el carrito está vacío
  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h2>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Ir a la tienda
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de éxito
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <Check className="text-green-600" size={48} />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            ¡Pedido realizado con éxito! 🎉
          </h2>
          
          <div className="bg-white rounded-lg p-6 shadow-lg mb-6">
            <p className="text-gray-600 mb-2 text-sm">
              Número de orden:
            </p>
            <p className="text-2xl font-bold text-blue-600 mb-4">
              {orderId}
            </p>
            
            <div className="space-y-2 text-sm text-left border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total pagado:</span>
                <span className="font-bold text-gray-900">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Método de pago:</span>
                <span className="font-semibold text-gray-900 capitalize">
                  {paymentMethod === 'card' ? 'Tarjeta' : 
                   paymentMethod === 'pse' ? 'PSE' : 'Nequi'}
                </span>
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-8 text-sm">
            Tu pedido será procesado y enviado en las próximas 24-48 horas
          </p>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/')}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition"
            >
              Volver a la tienda
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Pantalla principal de checkout
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft size={20} />
          Volver a la tienda
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Finalizar compra
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Productos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Tu pedido ({cart.length} productos)
              </h2>

              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-3xl">{item.image}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      
                      <div className="flex items-center gap-3 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 transition flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-600 hover:text-red-700 p-2"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">{formatPrice(item.price)}</p>
                      <p className="text-sm text-gray-600">
                        Total: {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Método de pago */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Método de pago
              </h2>

              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  disabled={isProcessing}
                  className={`p-6 border-2 rounded-lg transition ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  } disabled:opacity-50`}
                >
                  <CreditCard className="mx-auto mb-2 text-blue-600" size={32} />
                  <p className="text-sm font-semibold">Tarjeta</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('pse')}
                  disabled={isProcessing}
                  className={`p-6 border-2 rounded-lg transition ${
                    paymentMethod === 'pse'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  } disabled:opacity-50`}
                >
                  <Building2 className="mx-auto mb-2 text-blue-600" size={32} />
                  <p className="text-sm font-semibold">PSE</p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('nequi')}
                  disabled={isProcessing}
                  className={`p-6 border-2 rounded-lg transition ${
                    paymentMethod === 'nequi'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  } disabled:opacity-50`}
                >
                  <Smartphone className="mx-auto mb-2 text-blue-600" size={32} />
                  <p className="text-sm font-semibold">Nequi</p>
                </button>
              </div>
            </div>
          </div>

          {/* Columna derecha - Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resumen
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Envío:</span>
                  <span className="font-semibold">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>IVA (19%):</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="border-t-2 pt-3 flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin text-xl">⏳</span>
                    Procesando...
                  </span>
                ) : (
                  <span>💳 Pagar {formatPrice(total)}</span>
                )}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                🔒 Pago seguro • Modo demostración
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;