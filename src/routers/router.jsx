// src/router.jsx
import {
    createRouter,
    createRootRoute,
    createRoute,
    Outlet,
    createBrowserHistory,
  } from "@tanstack/react-router";
  
  import LoginPage from "@/pages/LoginPage";
  import ForgotPassword from "@/pages/ForgotPassword";
  
  // Root route que contiene el <Outlet />
  const rootRoute = createRootRoute({
    component: () => <Outlet />,
  });
  
  // Definimos las rutas hijas
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
  

  const routeTree = rootRoute.addChildren([loginRoute, forgotRoute]);
  

  export const router = createRouter({
    routeTree,
    history: createBrowserHistory(),
    defaultErrorComponent: () => (
      <div className="text-center p-10">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-gray-600 mt-4">Página no encontrada</p>
      </div>
    ),
  });
  