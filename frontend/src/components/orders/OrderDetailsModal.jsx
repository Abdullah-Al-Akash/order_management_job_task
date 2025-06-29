import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function OrderDetailsModal({ isOpen, order, onClose }) {
  if (!order) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            role="dialog"
            aria-modal="true"
          >
            <div className="bg-white rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              <h3 className="text-xl font-semibold mb-4">Order Details (ID: {order.id})</h3>

              <div className="mb-4">
                <h4 className="font-semibold">Customer Info:</h4>
                <p><strong>Name:</strong> {order.customer?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {order.customer?.email || 'N/A'}</p>
                <p><strong>Created At:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Ordered Products:</h4>
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price (each)</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map(({ id, product, quantity }) => (
                      <tr key={id}>
                        <td>{product?.name || 'N/A'}</td>
                        <td>{quantity}</td>
                        <td>${product?.price.toFixed(2) || '0.00'}</td>
                        <td>${(product?.price * quantity).toFixed(2) || '0.00'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
