import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Plus, Trash2 } from "lucide-react"; // Import Trash2 for delete icon
import { useProducts } from "@/hooks/useProducts";
import Swal from "sweetalert2";

import UpdateProductModal from "./UpdateProductModal";
import AddProductModal from "./AddProductModal";

export default function ProductsTable() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  // Get data and mutations from hook
  const {
    products,
    isLoading,
    isError,
    deleteProduct, // added deleteProduct mutation
  } = useProducts();

  // Delete handler with confirmation popup
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the product.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct.mutate(id, {
          onSuccess: () => {
            Swal.fire("Deleted!", "Product has been deleted.", "success");
          },
          onError: (error) => {
            Swal.fire(
              "Error",
              error.response?.data?.error || "Failed to delete",
              "error"
            );
          },
        });
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-x-auto"
    >
      {/* Add Product Button */}
      <div className="flex justify-end mb-4">
        <button
          className="btn btn-outline text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
          onClick={() => setAddOpen(true)}
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="text-center text-gray-500 py-6">
          Loading products...
        </div>
      ) : isError ? (
        <div className="text-center text-error py-6">
          Failed to load products.
        </div>
      ) : (
        <table className="table table-zebra w-full shadow rounded-lg">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Name</th>
              <th>Price ($)</th>
              <th>Stock</th>
              <th>Update</th>
              <th>Delete</th>
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
                <td>
                  <button
                    className="btn btn-sm btn-outline btn-error flex items-center gap-2"
                    onClick={() => handleDelete(prod.id)}
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update Modal */}
      <UpdateProductModal
        isOpen={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Add Modal */}
      <AddProductModal isOpen={addOpen} onClose={() => setAddOpen(false)} />
    </motion.div>
  );
}
