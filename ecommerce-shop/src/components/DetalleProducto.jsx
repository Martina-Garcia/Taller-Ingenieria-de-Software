// src/components/DetalleProducto.jsx
import { X, Star } from "lucide-react";

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const DetalleProducto = ({ product, isOpen, onClose }) => {
  // No renderices si no hay producto o no está abierto
  if (!isOpen || !product) return null;

  // Lee todo con nullish coalescing y defaults
  const name     = product?.name     ?? product?.nombre     ?? "";
  const priceRaw = product?.price    ?? product?.precio     ?? 0;
  const image    = product?.image    ?? product?.imagen     ?? "💻";
  const category = product?.category ?? product?.categoria  ?? "Otros";
  const desc     = product?.description ?? product?.descripcion ?? "";
  const rating   = clamp(Math.round(Number(product?.rating ?? product?.calificacion ?? 0)), 0, 5);
  const reviews  = Number(product?.reviews ?? product?.total_reviews ?? 0);

  const formatPrice = (p) =>
    new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 })
      .format(Number(p || 0));

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>

          <div className="flex gap-4">
            <div className="flex-1 flex items-center justify-center text-6xl">
              {image}
            </div>

            <div className="flex-1">
              <p className="text-xs text-blue-600 font-semibold uppercase">{category}</p>
              <h2 className="text-xl font-bold text-gray-900 mt-1">{name}</h2>

              {/* Rating protegido */}
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16}
                    className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">({reviews})</span>
              </div>

              <p className="mt-2 text-gray-600 text-sm">{desc}</p>

              <p className="mt-4 text-2xl font-bold text-blue-600">
                {formatPrice(priceRaw)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalleProducto;
