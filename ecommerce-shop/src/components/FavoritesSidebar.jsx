import { X, Heart, ShoppingCart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

const FavoritesSidebar = () => {
  const { favorites, isFavoritesOpen, setIsFavoritesOpen, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (!isFavoritesOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={() => setIsFavoritesOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-2">
            <Heart className="text-red-500 fill-current" size={24} />
            <h2 className="text-xl font-bold">Favoritos</h2>
          </div>
          <button
            onClick={() => setIsFavoritesOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Lista de favoritos */}
        <div className="flex-1 overflow-y-auto p-6">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Heart size={64} className="mb-4" />
              <p className="text-lg">No tienes favoritos</p>
              <p className="text-sm mt-2">Agrega productos que te gusten</p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  {/* Imagen */}
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">{item.image}</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {item.name}
                    </h3>
                    <p className="text-blue-600 font-bold mt-1">
                      {formatPrice(item.price)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Stock: {item.stock}
                    </p>

                    {/* Botones */}
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => {
                          addToCart(item);
                        }}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition flex items-center justify-center gap-1"
                      >
                        <ShoppingCart size={14} />
                        Agregar
                      </button>
                      
                      <button
                        onClick={() => removeFromFavorites(item.id)}
                        className="px-3 py-2 border-2 border-red-500 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavoritesSidebar;