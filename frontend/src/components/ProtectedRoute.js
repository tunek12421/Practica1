import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { auth } = useAuth();

    // Validar si el usuario está autenticado
    if (!auth || !auth.user) {
        console.error('No hay usuario autenticado. Redirigiendo al login.'); // Log para depuración
        return <Navigate to="/" replace />;
    }

    // Validar si el rol del usuario tiene acceso a la ruta
    if (!allowedRoles.includes(auth.user.rol)) {
        console.error(`Rol no permitido: ${auth.user.rol}. Redirigiendo al dashboard.`); // Log para depuración
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
