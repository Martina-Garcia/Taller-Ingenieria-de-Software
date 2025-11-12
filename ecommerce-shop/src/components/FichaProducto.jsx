import { Star, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../context/Carrito";
import { useFavorites } from "../context/Favoritos";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const FichaProducto = ({ product, onProductClick }) => {
  if (!product) return null; // evita crashear si llega null

  // Normaliza campos para que la UI siempre tenga lo mismo
  const id        = product.id;
  const name      = product.name ?? product.nombre ?? "";
  const price     = Number(product.price ?? product.precio ?? 0);
  const image     = product.image ?? product.imagen ?? "💻";
  const category  = product.category ?? product.categoria ?? "Otros";
  const rating    = clamp(Math.round(Number(product.rating ?? product.calificacion ?? 0)), 0, 5);
  const reviews   = Number(product.reviews ?? product.total_reviews ?? 0);
  const stock     = Number(product.stock ?? 0);

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const formatPrice = (n) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 })
      .format(Number(n || 0));

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite({ id, name, price, image, category });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ id, name, price, image, category });
  };

  return (
    <div
      onClick={() => onProductClick({ id, name, price, image, category, rating, reviews, stock })}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
    >
      {/* Imagen */}
      <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center">
        <span className="text-8xl">{image}</span>

        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          aria-label="Favorito"
        >
          <Heart
            size={20}
            className={isFavorite(id) ? "fill-red-500 text-red-500" : "text-gray-400"}
          />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-5">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
          {category}
        </span>

        <h3 className="mt-2 text-lg font-bold text-gray-800 line-clamp-1">{name}</h3>

        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">({reviews})</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">{formatPrice(price)}</span>
        </div>

        <p className="text-sm text-gray-500 mt-2">Stock: {stock} unidades</p>

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

export default FichaProducto;
