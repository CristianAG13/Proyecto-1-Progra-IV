import {useQuery} from '@tanstack/react-query'
import axios from 'axios'

const BASE_URL = 'https://localhost:7021/api/UsuariosAF';
axios.defaults.httpsAgent = {
  rejectUnauthorized: false
};

const FetchUsuarios = async () => {
    try {
        console.log("Obteniendo usuarios...");
        const response = await axios.get(BASE_URL, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          credentials: 'include',
          crossdomain: true,
          xhrFields: {
            withCredentials: true
          }
        });
        console.log("API Response:", response);
        
        if (response.status !== 200) {
            throw new Error('Error al obtener usuarios');
        }
        
        // La API devuelve directamente el array de usuarios
        if (!response.data) {
            console.log("No hay datos de usuarios", response.data);
            return { usuarios: [] }; // Estructura vacía inicial si no hay datos
        }
        
        // Adaptamos la respuesta al formato esperado por el frontend
        const usuarios = Array.isArray(response.data) ? response.data : [];
        const formattedResponse = { usuarios };
        
        console.log("Formatted response:", formattedResponse);
        return formattedResponse;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        throw error;
    }
};

export const CreateUsuario = async (usuario) => {
    try {
        // Asegurarnos de que enviamos un solo objeto de usuario
        const usuarioParaEnviar = usuario.usuarios && Array.isArray(usuario.usuarios) 
            ? usuario.usuarios[0] 
            : usuario;
        
        console.log("Creando usuario:", usuarioParaEnviar);
        // Para crear se usa POST al endpoint /api/Usuarios
        const response = await axios.post(BASE_URL, usuarioParaEnviar, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });
        console.log("API Response:", response);
        
        if (response.status !== 201 && response.status !== 200) {
            throw new Error('Error al crear usuario');
        }
        return await FetchUsuarios(); // Obtenemos la lista actualizada
    } catch (error) {
        console.error("Error al crear usuario:", error);
        throw error;
    }
}

export const UpdateUsuario = async (params) => {
    try {
        // Extraer el ID y los datos del usuario del parámetro
        const { id, data } = params;
        
        if (!id) {
            throw new Error('No se proporcionó el ID del usuario a actualizar');
        }
        
        if (!data || !data.email || !data.password || !data.role) {
            throw new Error('Datos de usuario incompletos para la actualización');
        }
        
        // Asegurarse de que el ID sea un número antes de enviarlo
        const numericId = parseInt(id);
        
        // Incluir el mismo ID tanto en la URL como en el cuerpo del objeto
        // Esto es importante porque el backend verifica que estos ID coincidan
        const datosCompletos = {
            id: numericId,
            email: data.email,
            password: data.password,
            role: data.role
        };
          
        console.log("Actualizando usuario con ID:", numericId);
        console.log("Datos a enviar:", datosCompletos);
        
        // Enviamos el objeto con ID a la URL que incluye el mismo ID
        const response = await axios.put(`${BASE_URL}/${numericId}`, datosCompletos, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        });        console.log("API Response:", response);
        
        if (response.status !== 200 && response.status !== 204) {
            throw new Error(`Error al actualizar usuario: Código ${response.status}`);
        }
        return await FetchUsuarios(); // Obtenemos la lista actualizada
    } catch (error) {
        // Manejo mejorado de errores para proporcionar más información
        if (error.response) {
            // Error con respuesta del servidor
            console.error("Error de respuesta del servidor al actualizar usuario:");
            console.error("Status:", error.response.status);
            console.error("Headers:", error.response.headers);
            console.error("Data:", error.response.data);
            throw new Error(`Error al actualizar usuario: ${error.response.status} ${error.response.statusText} - ${JSON.stringify(error.response.data)}`);
        } else if (error.request) {
            // Error sin respuesta del servidor (no se pudo conectar)
            console.error("Error de solicitud al actualizar usuario (no hubo respuesta):", error.request);
            throw new Error('Error al actualizar usuario: No se recibió respuesta del servidor');
        } else {
            // Error en la configuración de la solicitud
            console.error("Error al configurar la solicitud para actualizar usuario:", error.message);
            throw error;
        }
    }
}

export const DeleteUsuario = async (id) => {
    try {
        console.log("Eliminando usuario con ID:", id);
        
        // Para eliminar se usa DELETE al endpoint /api/Usuarios/{id}
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
            , withCredentials: true,
        });
        
        console.log("API Response:", response);
        
        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Error al eliminar usuario');
        }
        
        return await FetchUsuarios(); // Obtenemos la lista actualizada
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        throw error;
    }
}

export const useUsuarios = () => {
    return useQuery({
        queryKey: ['usuarios'],
        queryFn: FetchUsuarios,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
    });
};
