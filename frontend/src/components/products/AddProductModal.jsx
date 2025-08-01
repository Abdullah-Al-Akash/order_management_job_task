import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import { useProducts } from '@/hooks/useProducts';

export default function AddProductModal({ isOpen, onClose }) {
  const { addProduct } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addProduct.mutateAsync({
        name: formData.name,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });

      Swal.fire('Added!', 'Product added successfully', 'success');
      onClose();
      setFormData({ name: '', price: '', stock: '' }); // reset form
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to add product', 'error');
    }
  };

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
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            aria-label="Close"
          >
            <X />
          </button>

          <h3 className="text-xl font-bold mb-4 text-orange-600">Add Product</h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="input input-bordered w-full"
              required
            />
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered w-full"
              required
            />
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="input input-bordered w-full"
              required
            />
            <button className="btn btn-primary w-full" type="submit">
              Add
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
