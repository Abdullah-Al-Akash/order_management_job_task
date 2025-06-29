import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, UserPlus } from 'lucide-react';

import AddOrderModal from './AddOrderModal';
import CreateUserModal from './CreateUserModal';
import { useCustomers } from '../../hooks/useCustomers';

export default function UsersTable() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [createOpen, setCreateOpen] = useState(false);

  const {
    customers,
    isLoading,
    isError,
    createCustomer
  } = useCustomers();

  const handleOrderClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-x-auto"
    >
      {/* ✅ Top Bar */}
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-outline text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
          onClick={() => setCreateOpen(true)}
        >
          <UserPlus size={16} /> Create User
        </button>
      </div>

      {/* ✅ Users Table */}
      {isLoading ? (
        <div className="text-center text-gray-500 py-6">Loading users...</div>
      ) : isError ? (
        <div className="text-center text-error py-6">Failed to load users.</div>
      ) : (
        <table className="table table-zebra w-full shadow rounded-lg">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(user => (
              <tr key={user.id}>
                <td className="font-medium">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
                    onClick={() => handleOrderClick(user)}
                  >
                    <ShoppingCart size={16} /> Add Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🛒 Add Order Modal */}
      <AddOrderModal
        isOpen={!!selectedUser}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />

      {/* ➕ Create User Modal */}
      <CreateUserModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createCustomer}
      />
    </motion.div>
  );
}
