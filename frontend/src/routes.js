import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
                path="/clientes"
                element={
                    <ProtectedRoute allowedRoles={['Empleado', 'Administrador', 'Gerente']}>
                        <Clientes />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/productos"
                element={
                    <ProtectedRoute allowedRoles={['Empleado', 'Administrador', 'Gerente']}>
                        <Productos />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/ventas"
                element={
                    <ProtectedRoute allowedRoles={['Empleado', 'Administrador', 'Gerente']}>
                        <Ventas />
                    </ProtectedRoute>
                }
            />
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
