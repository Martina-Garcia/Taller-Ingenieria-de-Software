export const products = [
  {
    id: 1,
    name: 'MacBook Pro 16"',
    price: 2499000,
    image: '💻',
    rating: 5,
    reviews: 128,
    category: 'Laptops',
    stock: 15,
    description: 'Potencia profesional con el chip M3 Pro. Pantalla Liquid Retina XDR de 16 pulgadas, hasta 22 horas de batería.',
    specs: {
      processor: 'Apple M3 Pro',
      ram: '32GB',
      storage: '1TB SSD',
      display: '16.2" Liquid Retina XDR'
    },
    images: ['💻', '⌨️', '🖥️']
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max',
    price: 1299000,
    image: '📱',
    rating: 5,
    reviews: 256,
    category: 'Smartphones',
    stock: 32,
    description: 'El iPhone más avanzado. Chip A17 Pro, cámara de 48MP, titanio aeroespacial y USB-C.',
    specs: {
      processor: 'A17 Pro',
      camera: '48MP Principal',
      storage: '256GB',
      display: '6.7" Super Retina XDR'
    },
    images: ['📱', '📷', '🔋']
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 399000,
    image: '🎧',
    rating: 5,
    reviews: 189,
    category: 'Audio',
    stock: 48,
    description: 'Cancelación de ruido líder en la industria. Calidad de sonido premium con 30 horas de batería.',
    specs: {
      battery: '30 horas',
      connectivity: 'Bluetooth 5.2',
      noiseCancellation: 'Avanzada',
      weight: '250g'
    },
    images: ['🎧', '🎵', '🔊']
  },
  {
    id: 4,
    name: 'iPad Pro 12.9"',
    price: 1099000,
    image: '📱',
    rating: 5,
    reviews: 94,
    category: 'Tablets',
    stock: 22,
    description: 'Chip M2, pantalla Liquid Retina XDR. Compatible con Apple Pencil y Magic Keyboard.',
    specs: {
      processor: 'Apple M2',
      display: '12.9" Liquid Retina XDR',
      storage: '256GB',
      connectivity: '5G'
    },
    images: ['📱', '✏️', '⌨️']
  },
  {
    id: 5,
    name: 'Apple Watch Ultra',
    price: 899000,
    image: '⌚',
    rating: 5,
    reviews: 167,
    category: 'Wearables',
    stock: 18,
    description: 'Diseñado para aventuras extremas. GPS de doble frecuencia, resistencia al agua 100m.',
    specs: {
      display: '49mm',
      battery: '36 horas',
      water: '100m',
      gps: 'Dual frecuencia'
    },
    images: ['⌚', '🏃', '🏊']
  },
  {
    id: 6,
    name: 'Canon EOS R6',
    price: 2899000,
    image: '📷',
    rating: 5,
    reviews: 73,
    category: 'Cámaras',
    stock: 8,
    description: 'Cámara mirrorless full-frame. 20MP, estabilización de 8 stops, video 4K a 60fps.',
    specs: {
      sensor: '20MP Full-Frame',
      video: '4K 60fps',
      stabilization: '8 stops IBIS',
      autofocus: 'Dual Pixel CMOS AF II'
    },
    images: ['📷', '🎥', '🔍']
  },
  {
    id: 7,
    name: 'Dell XPS 15',
    price: 1899000,
    image: '💻',
    rating: 4,
    reviews: 145,
    category: 'Laptops',
    stock: 12,
    description: 'Laptop premium con Intel i9, NVIDIA RTX 4060, pantalla OLED 3.5K.',
    specs: {
      processor: 'Intel Core i9-13900H',
      gpu: 'NVIDIA RTX 4060',
      ram: '32GB DDR5',
      display: '15.6" OLED 3.5K'
    },
    images: ['💻', '🎮', '⚡']
  },
  {
    id: 8,
    name: 'Samsung Galaxy S24',
    price: 999000,
    image: '📱',
    rating: 5,
    reviews: 312,
    category: 'Smartphones',
    stock: 45,
    description: 'Galaxy AI integrada. Snapdragon 8 Gen 3, cámara de 200MP, pantalla Dynamic AMOLED 2X.',
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      camera: '200MP',
      storage: '256GB',
      display: '6.8" Dynamic AMOLED 2X'
    },
    images: ['📱', '🤖', '📸']
  },
  {
    id: 9,
    name: 'AirPods Pro 2',
    price: 249000,
    image: '🎧',
    rating: 5,
    reviews: 428,
    category: 'Audio',
    stock: 67,
    description: 'Cancelación activa de ruido mejorada. Audio espacial personalizado, hasta 6 horas de reproducción.',
    specs: {
      battery: '6 horas (30 con estuche)',
      noiseCancellation: 'Activa adaptativa',
      chip: 'H2',
      water: 'IPX4'
    },
    images: ['🎧', '🎵', '📦']
  }
];

export const categories = ['Todos', 'Laptops', 'Smartphones', 'Audio', 'Tablets', 'Wearables', 'Cámaras'];