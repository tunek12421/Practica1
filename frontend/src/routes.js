import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';
import Categorias from './pages/Categorias';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => (
    <BrowserRouter>
        <Routes>
            {/* Ruta para Login, sin Header ni Footer */}
            <Route path="/" element={<Login />} />

            {/* Rutas protegidas dentro del Layout */}
            <Route element={<Layout />}>
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
                <Route
                    path="/categorias"
                    element={
                        <ProtectedRoute allowedRoles={['Administrador', 'Gerente']}>
                            <Categorias />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    </BrowserRouter>
);

export default AppRoutes;
