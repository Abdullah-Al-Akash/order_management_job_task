import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import { useProducts } from '@/hooks/useProducts';

export default function UpdateProductModal({ isOpen, product, onClose }) {
  const { updateProduct } = useProducts();

  // Form state for product fields
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
  });

  // When product changes (modal opens), populate form fields
  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price !== undefined ? product.price : '',
        stock: product.stock !== undefined ? product.stock : '',
      });
    }
  }, [product]);

  // Handle input changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler - send only valid fields to backend
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Prepare update data - only send fields that are valid and not empty
  const updates = {};
  if (formData.name.trim() !== '') updates.name = formData.name.trim();
  if (formData.price !== '' && !isNaN(formData.price)) updates.price = parseFloat(formData.price);
  if (formData.stock !== '' && !isNaN(formData.stock)) updates.stock = parseInt(formData.stock);

  // If nothing valid to update, show error
  if (Object.keys(updates).length === 0) {
    Swal.fire('Error', 'Please provide at least one valid field to update.', 'error');
    return;
  }

  try {
    // Call mutation to update product by id and updates object
    await updateProduct.mutateAsync({ id: product.id, ...updates });
    Swal.fire('Updated!', 'Product updated successfully', 'success');
    onClose(); // Close modal after success
  } catch (err) {
    Swal.fire('Error', err.response?.data?.error || 'Failed to update', 'error');
  }
};

  // If modal is not open, render nothing
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md relative"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            <X />
          </button>

          <h3 className="text-xl font-bold mb-4 text-orange-600">Update Product</h3>

          {/* Update form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="input input-bordered w-full"
            />
            <button className="btn btn-primary w-full" type="submit">
              Update
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
