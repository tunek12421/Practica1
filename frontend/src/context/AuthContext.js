import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null); // Maneja el token y los datos del usuario

    const login = (token, user) => {
        setAuth({ token, user });
    };

    const logout = () => {
        setAuth(null); // Elimina el token y los datos del usuario
    };

    const getToken = () => auth?.token; // Retorna el token actual

    return (
        <AuthContext.Provider value={{ auth, login, logout, getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
