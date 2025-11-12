// src/pages/Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, CreditCard, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../context/Carrito";
import { useAuth } from "../context/Autenticacion";
import { crearPedido } from "../api/api";

const Checkout = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const {
    cartItems,
    getCartTotal,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // Solo tarjeta
  const [paymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(Number(price || 0));

  const subtotal = Number(getCartTotal() || 0);
  const shipping = 15000;
  const tax = subtotal * 0.19;
  const total = subtotal + shipping + tax;

  if (!usuario && cartItems.length > 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="mb-3 text-gray-700">Debes iniciar sesión para finalizar la compra.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
          >
            Ir a iniciar sesión
          </button>
        </div>
      </div>
    );
  }

  const handlePayment = async () => {
    if (!usuario || cartItems.length === 0) return;
    setIsProcessing(true);
    try {
      const pedido = await crearPedido(usuario.id); // POST /pedidos/:usuarioId
      setOrderId(pedido.numeroPedido || `ORD-${Date.now()}`);
      setOrderComplete(true);
      clearCart();
    } catch (err) {
      console.error(err);
      alert("Error al crear el pedido");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Ir a la tienda
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-green-600" size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Pedido realizado con éxito! 🎉</h2>
          <div className="bg-white rounded-lg p-6 shadow mb-6">
            <p className="text-gray-600 text-sm mb-1">Número de orden:</p>
            <p className="text-2xl font-bold text-blue-600 mb-4">{orderId}</p>
            <div className="space-y-2 text-sm text-left border-t pt-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total pagado:</span>
                <span className="font-bold text-gray-900">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Método de pago:</span>
                <span className="font-semibold text-gray-900">Tarjeta</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          Volver a la tienda
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Finalizar compra</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Productos */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Tu pedido ({cartItems.length} productos)
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => {
                  const image = item.imagen || item.image;
                  const name = item.nombre || item.name;
                  const category = item.categoria || item.category;
                  const price = item.precio_unitario || item.price || item.precio;
                  const quantity = item.cantidad || item.quantity || 1;

                  return (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                        <span className="text-3xl">{image || "💻"}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 truncate">{name}</h3>
                        <p className="text-sm text-gray-600">{category}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            className="w-7 h-7 bg-gray-200 rounded flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            className="w-7 h-7 bg-gray-200 rounded flex items-center justify-center"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatPrice(price)}</p>
                        <p className="text-sm text-gray-600">
                          Total: {formatPrice(Number(price) * Number(quantity))}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Método de pago: solo Tarjeta */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Método de pago</h2>
              <div className="grid grid-cols-1">
                <div className="p-4 border-2 rounded-lg border-blue-600 bg-blue-50 text-sm">
                  <div className="flex items-center gap-3">
                    <CreditCard className="text-blue-600" />
                    <div>
                      <p className="font-semibold">Tarjeta</p>
                      <p className="text-gray-600 text-xs">
                        Visa, Mastercard, Amex (modo demostración)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Resumen</h2>
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Envío:</span>
                  <span className="font-semibold">{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>IVA (19%):</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatPrice(total)}</span>
                </div>
              </div>
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg disabled:opacity-50"
              >
                {isProcessing ? "Procesando..." : `Pagar ${formatPrice(total)}`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
