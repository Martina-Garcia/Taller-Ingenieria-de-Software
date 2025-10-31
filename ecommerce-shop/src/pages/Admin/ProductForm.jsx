import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Package } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { products as initialProducts } from '../../data/products';
import { categories } from '../../data/products';

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addProduct, updateProduct, adminProducts } = useAdmin();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Electrónica',
    price: '',
    rating: '4.5',
    image: '📦',
    description: ''
  });

  const [errors, setErrors] = useState({});

  // Cargar datos si es edición
  useEffect(() => {
    if (isEditing) {
      const allProducts = [...initialProducts, ...adminProducts];
      const product = allProducts.find(p => p.id === parseInt(id));
      
      if (product) {
        setFormData({
          name: product.name,
          category: product.category,
          price: product.price.toString(),
          rating: product.rating.toString(),
          image: product.image,
          description: product.description || ''
        });
      }
    }
  }, [id, isEditing, adminProducts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser mayor a 0';
    }

    const rating = parseFloat(formData.rating);
    if (!rating || rating < 0 || rating > 5) {
      newErrors.rating = 'El rating debe estar entre 0 y 5';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'El emoji es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    const productData = {
      name: formData.name.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      image: formData.image.trim(),
      description: formData.description.trim()
    };

    if (isEditing) {
      updateProduct(parseInt(id), productData);
    } else {
      addProduct(productData);
    }

    navigate('/admin/dashboard');
  };

  const emojis = ['📦', '💻', '📱', '🎧', '⌚', '📷', '🎮', '🖥️', '⌨️', '🖱️', '👕', '👔', '👗', '👠', '👜', '🎒'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
              </h1>
              <p className="text-sm text-gray-600">
                {isEditing ? 'Modifica la información del producto' : 'Completa los datos del nuevo producto'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
          <div className="space-y-6">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nombre del producto *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Ej: iPhone 15 Pro"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Categoría y Precio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.filter(cat => cat !== 'Todos').map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Precio (COP) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="1500000"
                  min="0"
                  step="1000"
                />
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                )}
              </div>
            </div>

            {/* Rating e Imagen */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating (0-5) *
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.rating ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="4.5"
                  min="0"
                  max="5"
                  step="0.1"
                />
                {errors.rating && (
                  <p className="text-red-600 text-sm mt-1">{errors.rating}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Emoji del producto *
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="📦"
                  maxLength="2"
                />
                {errors.image && (
                  <p className="text-red-600 text-sm mt-1">{errors.image}</p>
                )}
              </div>
            </div>

            {/* Selector de emojis */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Selecciona un emoji
              </label>
              <div className="grid grid-cols-8 md:grid-cols-16 gap-2">
                {emojis.map(emoji => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, image: emoji }))}
                    className={`p-3 text-2xl rounded-lg transition hover:scale-110 ${
                      formData.image === emoji
                        ? 'bg-blue-100 ring-2 ring-blue-600'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Descripción (opcional)
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe las características del producto..."
              />
            </div>

            {/* Vista previa */}
            <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
              <p className="text-sm font-semibold text-gray-700 mb-4">Vista previa:</p>
              <div className="bg-white rounded-lg shadow-sm p-4 max-w-sm">
                <div className="w-full h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-6xl">{formData.image || '📦'}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-gray-900 truncate">
                    {formData.name || 'Nombre del producto'}
                  </h3>
                  <p className="text-sm text-gray-600">{formData.category}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-blue-600">
                      ${formData.price ? parseInt(formData.price).toLocaleString() : '0'}
                    </p>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-semibold">{formData.rating || '0.0'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              className="flex-1 border-2 border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
            >
              <Save size={20} />
              {isEditing ? 'Actualizar Producto' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;