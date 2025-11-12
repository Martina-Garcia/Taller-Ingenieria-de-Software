import { X, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "../context/Carrito";
import { useNavigate } from "react-router-dom";

const CartSidebar = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    getCartTotal,
  } = useCart();

  if (!isCartOpen) return null;

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(Number(price || 0));

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-blue-600" size={22} />
            <h2 className="text-lg font-bold">
              Carrito ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingCart size={56} className="mb-3" />
              <p>Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                const image = item.imagen || item.image;
                const name = item.nombre || item.name;
                const price = item.precio_unitario || item.price || item.precio;
                const quantity = item.cantidad || item.quantity || 1;

                return (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">{image || "💻"}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">
                        {name}
                      </h3>
                      <p className="text-blue-600 font-bold text-sm">
                        {formatPrice(price)}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          className="w-7 h-7 bg-gray-200 rounded flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm font-semibold">
                          {quantity}
                        </span>
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
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-blue-600">
                {formatPrice(getCartTotal())}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
            >
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
