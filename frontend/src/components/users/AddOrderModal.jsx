import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import axiosPublic from '@/api/axiosPublic';
import Swal from 'sweetalert2';

export default function AddOrderModal({ isOpen, onClose, user }) {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    if (isOpen) {
      axiosPublic.get('/products').then(res => {
        setProducts(res.data);
        setSelectedItems({}); // reset
      });
    }
  }, [isOpen]);

  const toggleProduct = (productId) => {
    setSelectedItems(prev => {
      const updated = { ...prev };
      if (updated[productId]) {
        delete updated[productId];
      } else {
        updated[productId] = 1;
      }
      return updated;
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedItems(prev => ({
      ...prev,
      [productId]: parseInt(quantity),
    }));
  };

  const handleSubmit = async () => {
    const items = Object.entries(selectedItems).map(([productId, quantity]) => ({
      productId: parseInt(productId),
      quantity,
    }));

    if (!items.length) {
      return Swal.fire({
        icon: 'warning',
        title: 'No items selected',
        text: 'Please select at least one product.',
      });
    }

    try {
      const res = await axiosPublic.post('/orders', {
        customerId: user.id,
        items,
      });

      Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: `Order ID: ${res.data.id}`,
      });

      onClose();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Order Failed',
        text: err.response?.data?.error || 'Something went wrong',
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-xl max-h-[90vh] overflow-y-auto relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">
              Select Products for {user?.name}
            </h3>

            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between bg-base-200 p-3 rounded"
                >
                  <label className="flex items-center gap-3 w-full">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary"
                      checked={product.id in selectedItems}
                      onChange={() => toggleProduct(product.id)}
                    />
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
                    </div>
                  </label>

                  {product.id in selectedItems && (
                    <input
                      type="number"
                      className="input input-sm input-bordered w-24"
                      min="1"
                      max={product.stock}
                      value={selectedItems[product.id]}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              className="btn btn-primary w-full mt-6"
              onClick={handleSubmit}
              disabled={Object.keys(selectedItems).length === 0}
            >
              Submit Order
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
