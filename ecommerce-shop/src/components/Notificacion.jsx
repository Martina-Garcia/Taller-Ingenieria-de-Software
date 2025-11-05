import { useCart } from '../context/Carrito';

const SimpleToast = () => {
  const { notification } = useCart();

  if (!notification) return null;

  const bgColor = notification.type === 'success' 
    ? 'bg-green-500' 
    : 'bg-blue-500';

  return (
    <div className="fixed top-4 right-4 z-50 animate-slideIn">
      <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

export default SimpleToast;