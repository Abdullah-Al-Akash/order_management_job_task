import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UsersTable from "./users/UsersTable";
import ProductsTable from "./products/ProductsTable";
import OrdersTable from "./orders/OrdersTable";  // <-- Import OrdersTable
import { User, Package, ClipboardList } from "lucide-react";

const tabs = [
  { id: "Users", icon: <User size={18} /> },
  { id: "Products", icon: <Package size={18} /> },
  { id: "Orders", icon: <ClipboardList size={18} /> },
];

export default function Layout() {
  const [activeTab, setActiveTab] = useState("Users");

  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Header */}
      <header className="flex justify-center items-center px-6 py-12 shadow bg-white">
        <h1 className="text-2xl md:text-3xl font-semibold underline">
          Order Management System
        </h1>
      </header>

      {/* Tabs */}
      <nav className="bg-white shadow">
        <ul className="flex justify-center space-x-6 py-3">
          {tabs.map(({ id, icon }) => (
            <li key={id}>
              <button
                className={`btn btn-ghost btn-sm md:btn-md rounded-none flex items-center gap-2 ${
                  activeTab === id
                    ? "border-b-4 border-primary font-semibold text-primary"
                    : ""
                }`}
                onClick={() => setActiveTab(id)}
              >
                {icon}
                {id}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {activeTab === "Users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Users</h2>
              <UsersTable />
            </motion.div>
          )}

          {activeTab === "Products" && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Products List</h2>
              <ProductsTable />
            </motion.div>
          )}

          {activeTab === "Orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-xl md:text-2xl font-semibold mb-4">Orders</h2>
              <OrdersTable />  {/* <-- Use OrdersTable here */}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
