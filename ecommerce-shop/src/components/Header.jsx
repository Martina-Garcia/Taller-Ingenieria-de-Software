import { ShoppingBag, Heart, ShoppingCart, LogIn } from "lucide-react";
import { useSearch } from "../context/Buscador";
import { useCart } from "../context/Carrito";
import { useAuth } from "../context/Autenticacion";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { setIsCartOpen } = useCart();
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <ShoppingBag className="text-blue-600" />
          <span className="font-bold text-xl">PileStore</span>
        </div>

        <div className="flex-1 max-w-xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar productos..."
            className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600"
          >
            <LogIn size={18} />
            {usuario ? usuario.email : "Ingresar"}
          </button>


          <button
            className="relative p-2 rounded-full hover:bg-gray-100"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart size={20} className="text-gray-600" />
          </button>

          {usuario && (
            <button
              onClick={logout}
              className="text-xs text-gray-500 hover:text-red-500"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
