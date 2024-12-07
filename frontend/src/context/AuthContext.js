import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Importación correcta como export nombrado
import CryptoJS from 'crypto-js'; // Para cifrar y descifrar el token
import { setToken } from '../services/api';

const AuthContext = createContext();

const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por una clave segura

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: null });
    const [isInitialized, setIsInitialized] = useState(false); // Controla si el contexto está listo

    useEffect(() => {
        const initializeAuth = async () => {
            const encryptedToken = sessionStorage.getItem('token');
            if (encryptedToken) {
                try {
                    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
                    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

                    const decoded = jwtDecode(decryptedToken); // Decodifica el token descifrado
                    setAuth({ token: decryptedToken, user: decoded });
                    setToken(decryptedToken); // Configura el token en Axios
                } catch (error) {
                    console.error('Error al descifrar el token:', error);
                    logout(); // Limpia datos corruptos
                }
            }
            setIsInitialized(true); // Marca que el contexto está listo
        };

        initializeAuth();
    }, []);

    const login = (token) => {
        try {
            const decoded = jwtDecode(token); // Decodifica el token
            setAuth({ token, user: decoded });
            setToken(token); // Configura el token en Axios

            const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
            sessionStorage.setItem('token', encryptedToken); // Almacena el token cifrado
            console.log('Usuario autenticado:', decoded);
        } catch (error) {
            console.error('Error al decodificar el token:', error);
        }
    };

    const logout = () => {
        setAuth({ user: null, token: null });
        setToken(null);
        sessionStorage.removeItem('token');
    };

    if (!isInitialized) {
        // Muestra un indicador de carga mientras el contexto se inicializa
        return <div>Cargando...</div>;
    }

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
