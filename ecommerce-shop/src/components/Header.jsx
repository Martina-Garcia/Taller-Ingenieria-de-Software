import { ShoppingCart, Heart, User, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import SearchBar from './SearchBar';

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount, setIsCartOpen } = useCart();
  const { getFavoritesCount, setIsFavoritesOpen } = useFavorites();

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition"
            >
              PileStore
            </button>
          </div>

          {/* Barra de búsqueda */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Iconos de acción */}
          <div className="flex items-center gap-4">
            {/* Botón Admin */}
            <button
              onClick={() => navigate('/admin/login')}
              className="p-2 hover:bg-blue-50 rounded-full transition group"
              title="Panel de administración"
            >
              <ShieldCheck size={24} className="text-gray-700 group-hover:text-blue-600 transition" />
            </button>

            {/* Favoritos */}
            <button 
              onClick={() => setIsFavoritesOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition relative"
              title="Favoritos"
            >
              <Heart size={24} className="text-gray-700" />
              {getFavoritesCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getFavoritesCount()}
                </span>
              )}
            </button>
            
            {/* Usuario */}
            <button 
              className="p-2 hover:bg-gray-100 rounded-full transition"
              title="Cuenta"
            >
              <User size={24} className="text-gray-700" />
            </button>

            {/* Carrito */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-full transition relative"
              title="Carrito de compras"
            >
              <ShoppingCart size={24} className="text-gray-700" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Búsqueda móvil */}
        <div className="md:hidden pb-3">
          <SearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;