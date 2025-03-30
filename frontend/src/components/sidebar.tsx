import { useState } from "react";
import { User } from "../client";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface SidebarItem {
  name: string;
  link: string;
}

interface SidebarProps {
  user: User;
  logoutCallback: () => void;
  sidebarItems: SidebarItem[];
}

export function Sidebar({ user, logoutCallback, sidebarItems }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 transition-all"
      >
        {!isOpen && <Menu size={20} />}
      </button>

      {/* Collapsible Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-64 bg-gray-50 h-screen p-6 flex flex-col border-r border-gray-200 shadow-sm"
          >
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition-all"
            >
              {isOpen && <X size={20} />}
            </button>
            <h2 className="text-xl font-semibold text-gray-900 tracking-wide">
              Admin Panel
            </h2>
            <p className="mt-2 text-sm text-gray-600 tracking-tight">
              {user?.email}
            </p>

            <nav className="mt-6 flex-1 space-y-2">
              {sidebarItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Link
                    to={item.link}
                    className="block text-gray-700 text-sm font-medium tracking-tight py-2 hover:text-gray-900 transition-all"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={logoutCallback}
              className="mt-4 py-2 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-all"
            >
              Logout
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
