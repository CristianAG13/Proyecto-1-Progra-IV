import axios from "axios";

export const client = axios.create({
    baseURL: 'https://localhost:7021',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (email, password) => {
  try {
    const response = await client.post('/login', {
      email,
      password
    });

    console.log('Respuesta del backend (completa):', response);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

