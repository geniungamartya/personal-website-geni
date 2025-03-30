import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { UsersService } from "../client";
import { Plus, Trash, Edit2 } from "lucide-react"; // Lucide Icons
import { AnimatePresence, motion } from "framer-motion";
import * as Toast from "@radix-ui/react-toast";

export const Route = createFileRoute("/admin/users")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    isSuperUser: false,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "isSuperUser" ? value === "true" : value,
    }));
  };

  const [loginPanelVisible, setLoginPanelVisible] = useState(false);

  const resetLoginPanel = () => {
    setFormData({
      fullname: "",
      username: "",
      password: "",
      isSuperUser: false,
    });
    setLoginPanelVisible(false);
  };

  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToastMessage(message);
    setToastType(type);
    setToastOpen(true);
  };

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => UsersService.getUsersUsersGet(),
  });

  const { mutate: deleteUser } = useMutation({
    mutationFn: (userId: string) =>
      UsersService.deleteUserUsersUserIdDelete({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showToast("User deleted successfully");
    },
    onError: () => showToast("Failed to delete user."),
  });

  const { mutate: registerUser } = useMutation({
    mutationFn: () =>
      UsersService.registerUserUsersRegisterPost({
        requestBody: {
          email: formData.username,
          is_superuser: formData.isSuperUser,
          full_name: formData.fullname,
          password: formData.password,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showToast("User created successfully");
      setFormData({
        fullname: "",
        username: "",
        password: "",
        isSuperUser: false,
      });
    },
    onError: () => showToast("Failed to create user."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="w-2xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white text-center">
        User Dashboard
      </h1>
      <button
        onClick={() => {
          resetLoginPanel();
          setLoginPanelVisible(true);
        }}
        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all"
      >
        <Plus size={16} className="mr-2" />
        Add New User
      </button>

      <AnimatePresence>
        {loginPanelVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full bg-white p-8 rounded-lg shadow-lg"
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="name"
                name="fullname"
                placeholder="Name"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
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

              <select
                name="isSuperUser"
                value={String(formData.isSuperUser)}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="false">Regular User</option>
                <option value="true">Super User</option>
              </select>

              <div className="flex justify-between space-x-2 mt-4">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-all"
                >
                  Create
                </motion.button>
                <button
                  onClick={resetLoginPanel}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <p className="text-gray-600 text-sm text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-sm text-center">Error fetching Uers.</p>
      ) : (
        <ul className="space-y-4">
          {users?.map((user) => (
            <motion.li
              key={user.id}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white dark:bg-gray-900"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
            >
              <div>
                <h2 className="font-medium text-gray-900 dark:text-white">
                  {user.email}
                </h2>
                {user.full_name && (
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {String(user.full_name)}
                  </p>
                )}
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Is superuser: {String(user.is_superuser)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {user.id}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => deleteUser(user.id)}
                  className="p-2 rounded-md text-red-500 hover:text-red-600 transition-all"
                >
                  <Trash size={16} />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      )}

      {/* Radix UI Toast */}
      <Toast.Provider>
        <Toast.Root
          className={`fixed bottom-5 right-5 p-3 rounded-md shadow-md ${
            toastType === "success" ? "bg-green-500" : "bg-red-500"
          } text-white`}
          open={toastOpen}
          onOpenChange={setToastOpen}
          duration={2000}
        >
          <Toast.Title>{toastMessage}</Toast.Title>
        </Toast.Root>
        <Toast.Viewport />
      </Toast.Provider>
    </div>
  );
}
