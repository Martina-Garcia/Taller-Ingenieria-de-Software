import { Routes, Route } from "react-router-dom";
import Inicio from "./paginas/Inicio";
import Checkout from "./paginas/Checkout";
import AdminPedidos from "./paginas/AdminPedidos";
import { ProveedorCarrito } from "./contexto/Carrito";
import { ProveedorAuth } from "./contexto/Auth";

export default function App() {
  return (
    <ProveedorAuth>
      <ProveedorCarrito>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/pedidos" element={<AdminPedidos />} />
        </Routes>
      </ProveedorCarrito>
    </ProveedorAuth>
  );
}
