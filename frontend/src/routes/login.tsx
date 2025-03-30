import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import useAuth, { isLoggedIn } from "../hooks/useAuth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({ to: "/admin" });
    }
  },
});

function LoginPage() {
  const { loginMutation, resetError, loginError } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    resetError();
    loginMutation.mutate(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Login
        </h2>

        {loginError && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm text-center mb-4"
          >
            {loginError}
          </motion.p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="username"
            placeholder="Email"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
