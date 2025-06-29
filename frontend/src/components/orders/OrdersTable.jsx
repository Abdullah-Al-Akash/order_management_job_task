import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import OrderDetailsModal from './OrderDetailsModal'; // We will create this next
import { Eye } from 'lucide-react';
import axiosPublic from '@/api/axiosPublic';

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axiosPublic.get('/orders'); // Make sure backend has this route for all orders
        setOrders(res.data);
      } catch (err) {
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div className="text-error">{error}</div>;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-x-auto"
      >
        <table className="table table-zebra w-full shadow rounded-lg">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer?.name || 'N/A'}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="btn btn-sm btn-outline btn-primary flex items-center gap-2"
                  >
                    <Eye size={16} />
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <OrderDetailsModal
        isOpen={!!selectedOrder}
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
