import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
  createBrowserHistory,
} from "@tanstack/react-router";

import LoginPage from "@/pages/LoginPage";
import ForgotPassword from "@/pages/ForgotPassword";
import AdminRouter from "@/Area_administrativa/router/AdminRouter";
import InventarioPage from "@/Area_administrativa/pages/InvetarioPage";
import Welcome from "@/Area_administrativa/Components/Welcome";

const rootRoute = createRootRoute({
  component: () => <Outlet />, 
});

// Rutas principales
const loginRoute = createRoute({
  path: "/",
  getParentRoute: () => rootRoute,
  component: LoginPage,
});

const forgotRoute = createRoute({
  path: "/forgot-password",
  getParentRoute: () => rootRoute,
  component: ForgotPassword,
});

// Ruta admin (usa el AdminRouter como layout)
const adminRoute = createRoute({
  path: "/admin",
  getParentRoute: () => rootRoute,
  component: AdminRouter,
});

// Subruta de inventario dentro de admin
const inventarioRoute = createRoute({
  path: "/inventario",
  getParentRoute: () => adminRoute,
  component: InventarioPage,
});

const welcomeRoute = createRoute({
  path: "/welcome",
  getParentRoute: () => adminRoute,
  component: Welcome,
});

// Enlazar subrutas al admin
adminRoute.addChildren([inventarioRoute, welcomeRoute,]);

// Enlazar todas al root
const routeTree = rootRoute.addChildren([
  loginRoute,
  forgotRoute,
  adminRoute,
]);

// Crear el router
export const router = createRouter({
  routeTree,
  history: createBrowserHistory(),
  defaultErrorComponent: () => (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold text-red-600">404</h1>
      <p className="text-gray-600 mt-4">Página no encontrada</p>
    </div>
  ),
  defaultNotFoundComponent: () => (
    <div className="text-center p-10">
      <h1 className="text-4xl font-bold text-yellow-500">Ruta no encontrada</h1>
      <p className="text-gray-600 mt-4">La página que buscas no existe.</p>
    </div>
  ),
});
