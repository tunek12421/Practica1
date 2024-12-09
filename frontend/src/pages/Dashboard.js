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
            <header className="bg-[#17202A] text-white shadow-md p-4">
                <h1 className="text-center text-2xl font-bold">Panel de Control</h1>
            </header>
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Bienvenido, {rol}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Gestión de Clientes */}
                    <Link
                        to="/clientes"
                        className="block p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-all transform"
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
                        className="block p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-all transform"
                    >
                        <h3 className="text-xl font-bold text-green-600">Gestión de Productos</h3>
                        <p className="text-gray-600">
                            {['Administrador', 'Gerente'].includes(rol)
                                ? 'Consulta, edita y añade nuevos productos.'
                                : 'Consulta los productos disponibles.'}
                        </p>
                    </Link>

                    {/* Gestión de Categorías */}
                    {['Administrador', 'Gerente'].includes(rol) && (
                        <Link
                            to="/categorias"
                            className="block p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-all transform"
                        >
                            <h3 className="text-xl font-bold text-orange-600">Gestión de Categorías</h3>
                            <p className="text-gray-600">Gestiona categorías: consulta, edita y añade nuevas.</p>
                        </Link>
                    )}

                    {/* Gestión de Ventas */}
                    <Link
                        to="/ventas"
                        className="block p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-all transform"
                    >
                        <h3 className="text-xl font-bold text-yellow-600">Gestión de Ventas</h3>
                        <p className="text-gray-600">
                            {['Empleado', 'Administrador', 'Gerente'].includes(rol)
                                ? 'Registra ventas y genera facturas para clientes.'
                                : 'Acceso restringido.'}
                        </p>
                    </Link>

                    {/* Gestión de Facturas (sin acceso para empleados) */}
                    {['Administrador', 'Gerente'].includes(rol) && (
                        <Link
                            to="/facturas"
                            className="block p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-all transform"
                        >
                            <h3 className="text-xl font-bold text-purple-600">Gestión de Facturas</h3>
                            <p className="text-gray-600">
                                Consulta y gestiona las facturas generadas para los clientes.
                            </p>
                        </Link>
                    )}

                    {/* Gestión de Detalles */}
                    {['Administrador', 'Gerente'].includes(rol) && (
                        <Link
                            to="/detalles"
                            className="block p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-all transform"
                        >
                            <h3 className="text-xl font-bold text-teal-600">Gestión de Detalles</h3>
                            <p className="text-gray-600">
                                Consulta, edita y añade detalles a facturas.
                            </p>
                        </Link>
                    )}

                    {/* Gestión de Usuarios */}
                    {['Administrador', 'Gerente'].includes(rol) && (
                        <Link
                            to="/usuarios"
                            className="block p-6 bg-gradient-to-r from-gray-50 via-gray-100 to-gray-200 shadow-lg rounded-lg hover:shadow-xl hover:scale-105 transition-all transform"
                        >
                            <h3 className="text-xl font-bold text-red-600">Gestión de Usuarios</h3>
                            <p className="text-gray-600">
                                Administra usuarios del sistema: edita, añade o elimina cuentas.
                            </p>
                        </Link>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
