import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axiosPublic from "../api/axiosPublic"; // Adjust path as needed
import Swal from "sweetalert2";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire("Error", "Please fill in both email and password", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosPublic.post("/auth/login", { email, password });
      const { token, user } = res.data;

      // Save token and user role to localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", user.role);

      Swal.fire("Success", "Logged in successfully", "success");
      onLoginSuccess(user);
      onClose();
    } catch (error) {
      Swal.fire(
        "Login Failed",
        error.response?.data?.message || "Invalid credentials",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close modal if clicked outside
        >
          <motion.div
            className="bg-white rounded-lg p-6 max-w-sm w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              aria-label="Close login modal"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-center">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                disabled={loading}
                autoFocus
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                disabled={loading}
              />
              <button
                type="submit"
                className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
