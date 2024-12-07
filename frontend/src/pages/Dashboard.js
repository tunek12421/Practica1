import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { auth } = useAuth();

    if (!auth || !auth.user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <h2 className="text-xl font-bold text-red-500">Acceso no autorizado. Inicia sesión nuevamente.</h2>
            </div>
        );
    }

    const { rol } = auth.user;

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white shadow-md p-4">
                <h1 className="text-center text-2xl font-bold">Panel de Control</h1>
            </header>
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Bienvenido, {rol}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Gestión de Clientes */}
                    <Link
                        to="/clientes"
                        className="block p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-bold text-blue-600">Gestión de Clientes</h3>
                        <p className="text-gray-600">
                            {['Administrador', 'Gerente'].includes(rol)
                                ? 'Accede para gestionar clientes (CRUD completo).'
                                : 'Añade nuevos clientes al sistema.'}
                        </p>
                    </Link>

                    {/* Gestión de Productos */}
                    <Link
                        to="/productos"
                        className="block p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-bold text-green-600">Gestión de Productos</h3>
                        <p className="text-gray-600">
                            {['Administrador', 'Gerente'].includes(rol)
                                ? 'Consulta, edita y añade nuevos productos.'
                                : 'Consulta los productos disponibles.'}
                        </p>
                    </Link>

                    {/* Gestión de Categorías */}
                    <Link
                        to="/categorias"
                        className="block p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-bold text-orange-600">Gestión de Categorías</h3>
                        <p className="text-gray-600">
                            {['Administrador', 'Gerente'].includes(rol)
                                ? 'Gestiona categorías: consulta, edita y añade nuevas.'
                                : 'Consulta las categorías disponibles.'}
                        </p>
                    </Link>

                    {/* Gestión de Ventas */}
                    <Link
                        to="/ventas"
                        className="block p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-bold text-yellow-600">Gestión de Ventas</h3>
                        <p className="text-gray-600">
                            {['Empleado', 'Administrador', 'Gerente'].includes(rol)
                                ? 'Registra ventas y genera facturas para clientes.'
                                : 'Acceso restringido.'}
                        </p>
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
