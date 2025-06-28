import { useEffect, useState } from "react";
import axiosPublic from "@/api/axiosPublic";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import UpdateProductModal from "./UpdateProductModal";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  useEffect(() => {
    axiosPublic.get("/products").then((res) => setProducts(res.data));
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
            <th>Price ($)</th>
            <th>Stock</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td className="font-medium">{prod.name}</td>
              <td>{prod.price}</td>
              <td>{prod.stock}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline btn-warning flex items-center gap-2"
                  onClick={() => setSelectedProduct(prod)}
                >
                  <Pencil size={16} /> Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateProductModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onUpdated={() => {
          axiosPublic.get("/products").then((res) => setProducts(res.data));
        }}
      />
    </motion.div>
  );
}
