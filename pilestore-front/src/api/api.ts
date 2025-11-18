const API_URL = "http://localhost:3000";

export interface Producto {
  id: number;
  nombre: string;
  emoji: string;
  precio: number;
  descripcion?: string | null;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  rol: string;
}

export interface ItemPedidoInput {
  productId: number;
  cantidad: number;
}

export interface InvitadoInfo {
  nombre: string;
  apellido: string;
  direccion: string;
}

export interface PagoInfo {
  cardNumber: string;
  cardName: string;
  exp: string;
  cvv: string;
}

export interface PedidoAdmin {
  id: number;
  total: number;
  estado: string;
  fecha_creacion: string;
  invitado_nombre?: string | null;
  invitado_apellido?: string | null;
  user?: {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
  } | null;
  items: {
    id: number;
    cantidad: number;
    precio_unitario: number;
    product: Producto;
  }[];
}

async function manejarRespuesta<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const texto = await res.text().catch(() => "");
    throw new Error(texto || `Error HTTP ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function obtenerProductos(busqueda?: string): Promise<Producto[]> {
  const url = busqueda
    ? `${API_URL}/products?search=${encodeURIComponent(busqueda)}`
    : `${API_URL}/products`;
  const res = await fetch(url);
  const data = await manejarRespuesta<Producto[]>(res);
  return data.map((p) => ({
    ...p,
    precio: Number(p.precio),
  }));
}

export async function iniciarSesionApi(
  email: string,
  password: string
): Promise<Usuario> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await manejarRespuesta<{ user: Usuario }>(res);
  return data.user;
}

export async function crearPedidoInvitado(
  items: ItemPedidoInput[],
  pago: PagoInfo,
  invitado: InvitadoInfo
): Promise<void> {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items,
      payment: pago,
      guest: invitado,
    }),
  });
  await manejarRespuesta<any>(res);
}

export async function crearPedidoUsuario(
  userId: number,
  items: ItemPedidoInput[],
  pago: PagoInfo
): Promise<void> {
  const res = await fetch(`${API_URL}/orders?userId=${userId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      items,
      payment: pago,
    }),
  });
  await manejarRespuesta<any>(res);
}

export async function obtenerPedidosAdmin(): Promise<PedidoAdmin[]> {
  const res = await fetch(`${API_URL}/admin/orders`);
  return manejarRespuesta<PedidoAdmin[]>(res);
}
