import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "../components/nav";
import Footer from "../components/footer";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="antialiased max-w-2xl mx-4 mt-8 lg:mx-auto">
      <div className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
        <header>
          <Navbar />
        </header>

        <main>
          <Outlet />
        </main>

        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}
