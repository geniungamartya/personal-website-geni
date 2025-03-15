import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Navbar } from "../components/nav";
import Footer from "../components/footer";
import NotFound from "../components/not-found";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="antialiased max-w-xl mx-4 mt-8 lg:mx-auto">
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

      <TanStackRouterDevtools />
    </>
  ),
  notFoundComponent: NotFound,
});
