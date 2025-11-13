import { Star, ShoppingCart } from "lucide-react";
import { useCart } from "../context/Carrito";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const FichaProducto = ({ product, onProductClick }) => {
  if (!product) return null;

  const id        = product.id;
  const name      = product.name ?? product.nombre ?? "";
  const price     = Number(product.price ?? product.precio ?? 0);
  const image     = product.image ?? product.imagen ?? "💻";
  const category  = product.category ?? product.categoria ?? "Otros"; // ya NO se muestra
  const rating    = clamp(Math.round(Number(product.rating ?? product.calificacion ?? 0)), 0, 5);
  const reviews   = Number(product.reviews ?? product.total_reviews ?? 0);
  const stock     = Number(product.stock ?? 0);

  const { addToCart } = useCart();

  const formatPrice = (n) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 })
      .format(Number(n || 0));

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
      </div>

      {/* Contenido */}
      <div className="p-5">

        {/* CATEGORÍA OCULTA
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
          {category}
        </span>
        */}

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
