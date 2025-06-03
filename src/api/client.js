import axios from "axios";

export const client = axios.create({
  baseURL: 'https://localhost:7021',
  withCredentials: true, // ✅ Para que se envíen las cookies como `auth_token`
  headers: {
    'Content-Type': 'application/json',
  },
});
