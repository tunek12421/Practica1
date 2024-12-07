import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { auth } = useAuth();

    if (!auth) {
        return <Navigate to="/" replace />;
    }

    if (!allowedRoles.includes(auth.user.rol)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;
