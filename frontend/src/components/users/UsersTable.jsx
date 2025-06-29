import { useEffect, useState } from 'react';
import axiosPublic from '../../api/axiosPublic';
import { motion } from 'framer-motion';
import AddOrderModal from './AddOrderModal';
import LoginModal from '../LoginModal';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // ✅ Use auth context

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false); // ✅ Login modal
  const { isAdminLoggedIn } = useAuth(); // ✅ Get login status

  useEffect(() => {
    axiosPublic.get('/customers').then(res => setUsers(res.data));
  }, []);

  // ✅ When user clicks "Add Order"
  const handleOrderClick = (user) => {
    if (!isAdminLoggedIn) {
      setLoginOpen(true); // show login first
    } else {
      setSelectedUser(user); // show order modal
    }
  };

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
                  onClick={() => handleOrderClick(user)}
                >
                  <ShoppingCart size={16} /> Add Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🔐 Login Modal */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onLogin={() => {
          setLoginOpen(false);
        }}
      />

      {/* 🛒 Add Order Modal */}
      <AddOrderModal
        isOpen={!!selectedUser}
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </motion.div>
  );
}
