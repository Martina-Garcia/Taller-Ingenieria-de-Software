import { createContext, useContext, useEffect, useState } from "react";
import {
  getCarrito,
  addToCarrito,
  updateCartItem,
  removeCartItem,
} from "../api/api";
import { useAuth } from "./Autenticacion";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { usuario } = useAuth();
  const usuarioId = usuario?.id; // null si no hay login

  const [cart, setCart] = useState({ carritoId: null, items: [], total: 0 });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (!usuarioId) {
      setCart({ carritoId: null, items: [], total: 0 });
      return;
    }
    getCarrito(usuarioId)
      .then((data) => setCart(data))
      .catch((err) => console.error("Error al cargar carrito:", err));
  }, [usuarioId]);

  const addToCart = async (product) => {
    if (!usuarioId) {
      alert("Debes iniciar sesión para agregar al carrito");
      return;
    }
    try {
      const carritoActualizado = await addToCarrito(usuarioId, product.id, 1);
      setCart(carritoActualizado);
      setIsCartOpen(true);
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    if (!usuarioId || newQuantity <= 0) return;
    try {
      const carritoActualizado = await updateCartItem(
        usuarioId,
        itemId,
        newQuantity
      );
      setCart(carritoActualizado);
    } catch (err) {
      console.error("Error al actualizar cantidad:", err);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!usuarioId) return;
    try {
      const carritoActualizado = await removeCartItem(usuarioId, itemId);
      setCart(carritoActualizado);
    } catch (err) {
      console.error("Error al eliminar del carrito:", err);
    }
  };

  const clearCart = () => {
    setCart({ carritoId: null, items: [], total: 0 });
  };

  const getCartTotal = () => {
    if (cart?.total != null) return Number(cart.total);
    return (cart.items || []).reduce(
      (acc, item) => acc + Number(item.subtotal ?? 0),
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: cart.items || [],
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
