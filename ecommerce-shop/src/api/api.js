const API_URL = "http://localhost:3000"; // ajusta si tu backend usa otro puerto

// -------- PRODUCTOS --------
export async function fetchProductos() {
  const res = await fetch(`${API_URL}/productos`);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}

// -------- LOGIN --------
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Credenciales incorrectas");
  return res.json(); // se asume { user: {...} } o directamente el usuario
}

// -------- CARRITO --------
export async function getCarrito(usuarioId) {
  const res = await fetch(`${API_URL}/carrito/${usuarioId}`);
  if (!res.ok) throw new Error("Error al obtener carrito");
  return res.json();
}

export async function addToCarrito(usuarioId, productoId, cantidad = 1) {
  const res = await fetch(`${API_URL}/carrito/${usuarioId}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productoId, cantidad }),
  });
  if (!res.ok) throw new Error("Error al agregar al carrito");
  return res.json();
}

export async function updateCartItem(usuarioId, itemId, cantidad) {
  const res = await fetch(`${API_URL}/carrito/${usuarioId}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cantidad }),
  });
  if (!res.ok) throw new Error("Error al actualizar carrito");
  return res.json();
}

export async function removeCartItem(usuarioId, itemId) {
  const res = await fetch(`${API_URL}/carrito/${usuarioId}/items/${itemId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar del carrito");
  return res.json();
}

// -------- PEDIDOS (para checkout) --------
export async function crearPedido(usuarioId) {
  const res = await fetch(`${API_URL}/pedidos/${usuarioId}`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("Error al crear pedido");
  return res.json();
}

