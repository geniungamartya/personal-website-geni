import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import useAuth, { isLoggedIn } from "../hooks/useAuth";
import { Sidebar } from "../components/sidebar";

export const Route = createFileRoute("/admin")({
  component: AdminLayoutPage,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function AdminLayoutPage() {
  const { user, logout } = useAuth();

  const sidebarItems = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/admin/blog" },
    { name: "Users", link: "/admin/users" },
  ];

  return (
    <div className="flex">
      <Sidebar
        user={user!}
        logoutCallback={logout}
        sidebarItems={sidebarItems}
      />
      <Outlet />
    </div>
  );
}
