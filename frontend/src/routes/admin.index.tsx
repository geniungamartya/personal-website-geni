import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: AdminPage,
});

function AdminPage() {
  return (
    <div className="flex-1 p-6">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p className="text-gray-700">Manage your system here.</p>
    </div>
  );
}
