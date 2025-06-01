import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
  createBrowserHistory,
  redirect
} from "@tanstack/react-router";
import LoginPage from "@/pages/LoginPage";
import ForgotPassword from "@/pages/ForgotPassword";
import AdminRouter from "@/Area_administrativa/router/AdminRouter";
import UsuarioPage from "@/Area_administrativa/pages/UsuarioPage";
import Welcome from "@/Area_administrativa/Components/Welcome";

const rootRoute = createRootRoute({
  component: () => <Outlet />, 
});

// Función para obtener el token de las cookies
const getAuthTokenFromCookies = () => {
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(c => c.trim().startsWith('auth_token='));
  return authCookie ? authCookie.split('=')[1] : null;
};

// Función de autenticación que se puede usar para verificar el token
const REQUIRE_AUTH = () => {
  // Verificamos tanto en localStorage (compatibilidad) como en cookies
  const tokenFromStorage = localStorage.getItem('token');
  const tokenFromCookies = getAuthTokenFromCookies();
  
  if (!tokenFromStorage && !tokenFromCookies) {
    throw redirect({
      to: '/',
    });
  }
};

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
  component: AdminRouter,  beforeLoad: async () => {
    // Verificamos tanto en localStorage (compatibilidad) como en cookies
    const tokenFromStorage = localStorage.getItem('token');
    const tokenFromCookies = getAuthTokenFromCookies();
    
    if (!tokenFromStorage && !tokenFromCookies) {
      throw redirect({
        to: '/',
      });
    }
  },
});



// Subruta de usuarios dentro de admin
const usuariosRoute = createRoute({
  path: "usuarios", // Sin / inicial porque es una subruta
  getParentRoute: () => adminRoute,
  component: UsuarioPage,
});

const welcomeRoute = createRoute({
  path: "welcome", // Sin / inicial porque es una subruta
  getParentRoute: () => adminRoute,
  component: Welcome,
});

// Enlazar subrutas al admin
adminRoute.addChildren([ usuariosRoute, welcomeRoute,]);

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
