import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useState } from 'react';

const ProductCard = ({ product, onProductClick }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      onClick={() => onProductClick(product)}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
    >
      {/* Imagen */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center">
        <span className="text-8xl">{product.image}</span>
        
        {/* Botón de favorito */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            size={20}
            className={isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Categoría */}
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
          {product.category}
        </span>

        {/* Nombre */}
        <h3 className="mt-2 text-lg font-bold text-gray-800 line-clamp-1">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Precio */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Stock */}
        <p className="text-sm text-gray-500 mt-2">
          Stock: {product.stock} unidades
        </p>

        {/* Botón agregar */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <ShoppingCart size={20} />
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;