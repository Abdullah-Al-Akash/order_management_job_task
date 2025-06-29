import { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

export default function CreateUserModal({ isOpen, onClose, onCreate }) {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      return Swal.fire('Required', 'Name and email are required.', 'warning');
    }

    try {
      await onCreate.mutateAsync(form);
      Swal.fire('Success', 'User created successfully!', 'success');
      onClose();
      setForm({ name: '', email: '' });
    } catch (err) {
      Swal.fire('Error', err.response?.data?.error || 'Failed to create user.', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-base-200 p-6 rounded-2xl shadow-xl w-full max-w-md relative"
      >
        <button
          className="absolute top-3 right-3 text-xl text-error"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold mb-4 text-orange-600">Create New User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
}
