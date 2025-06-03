import { client } from "../api/client";

export const checkAuth = async () => {
  try {
    const response = await client.get("/auth/check");
    return response.data?.isAuthenticated === true;
  } catch (error) {
    console.error("Error al verificar la autenticación:", error);
    return false;
  }
  
};

export const logout = async () => {
  try {
    await client.post("/logout"); // ✅ envía la cookie automáticamente
    return true;
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return false;
  }
};
