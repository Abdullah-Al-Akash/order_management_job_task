import { useEffect, useState } from 'react';
import axiosPublic from '@/api/axiosPublic';
import { motion } from 'framer-motion';
import OrderModal from './OrderModal';
import { ShoppingCart } from 'lucide-react';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axiosPublic.get('/customers').then(res => setUsers(res.data));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-x-auto"
    >
      <table className="table table-zebra w-full shadow rounded-lg">
        <thead className="bg-base-200 text-base-content">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Orders</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="font-medium">{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
                  onClick={() => setSelectedUser(user)}
                >
                  <ShoppingCart size={16} /> Add Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <OrderModal
        isOpen={!!selectedUser}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </motion.div>
  );
}
