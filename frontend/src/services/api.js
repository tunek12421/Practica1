import axios from 'axios';
import { AuthProvider } from '../context/AuthContext';

const api = axios.create({
    baseURL: 'http://localhost:3001/api', // Cambia según la URL del backend
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token dinámicamente
api.interceptors.request.use(
    (config) => {
        const token = AuthProvider?.current?.getToken(); // Accede al token a través del proveedor
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
