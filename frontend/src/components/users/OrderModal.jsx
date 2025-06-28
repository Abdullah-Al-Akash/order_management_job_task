import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function OrderModal({ isOpen, onClose, user }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // closes modal on background click
        >
          <motion.div
            className="bg-white rounded-lg p-6 w-full max-w-md relative"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            onClick={e => e.stopPropagation()} // prevent closing modal when clicking inside
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Add Order for {user?.name}</h3>
            {/* Add your form elements here */}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
