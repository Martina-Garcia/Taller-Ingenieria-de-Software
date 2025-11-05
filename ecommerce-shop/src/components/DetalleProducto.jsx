import { X, Star, ShoppingCart, Heart, Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/Carrito';
import { useFavorites } from '../context/Favoritos';

const ProductModal = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  if (!isOpen || !product) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    onClose();
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
        onClick={handleOverlayClick}
      >
        {/* Modal */}
        <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition"
          >
            <X size={24} />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Columna izquierda - Imágenes */}
            <div>
              {/* Imagen principal */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl h-96 flex items-center justify-center mb-4">
                <span className="text-9xl">{product.images[currentImage]}</span>
              </div>

              {/* Miniaturas */}
              <div className="flex gap-3 justify-center">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-3xl transition ${
                      currentImage === idx ? 'ring-4 ring-blue-600' : 'hover:ring-2 ring-gray-300'
                    }`}
                  >
                    {img}
                  </button>
                ))}
              </div>
            </div>

            {/* Columna derecha - Información */}
            <div className="flex flex-col">
              {/* Categoría */}
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                {product.category}
              </span>

              {/* Nombre */}
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                {product.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>

              {/* Precio */}
              <div className="mt-6">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Descripción */}
              <p className="text-gray-700 mt-6 leading-relaxed">
                {product.description}
              </p>

              {/* Especificaciones */}
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">Especificaciones:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-sm text-gray-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <p className="font-semibold text-gray-900">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <p className="mt-4 text-sm text-gray-600">
                <span className="font-semibold">Stock disponible:</span> {product.stock} unidades
              </p>

              {/* Selector de cantidad */}
              <div className="flex items-center gap-4 mt-6">
                <span className="font-semibold text-gray-700">Cantidad:</span>
                <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-4 py-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-gray-200 rounded transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-1 hover:bg-gray-200 rounded transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex gap-3 mt-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={20} />
                  Agregar al carrito
                </button>

                <button
                  onClick={handleToggleFavorite}
                  className={`p-4 rounded-lg border-2 transition ${
                    isFavorite(product.id)
                      ? 'bg-red-50 border-red-500 text-red-500'
                      : 'border-gray-300 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart
                    size={24}
                    className={isFavorite(product.id) ? 'fill-current' : ''}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;