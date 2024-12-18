import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { auth, logout } = useAuth();
    const navigate = useNavigate();

    if (!auth || !auth.user) {
        return null; // No renderiza el header si el usuario no está autenticado
    }

    const { rol } = auth.user;

    const handleLogout = () => {
        logout(); // Elimina el token y limpia el contexto
        navigate('/'); // Redirige a la página de inicio de sesión
    };

    return (
        <header className="bg-black text-white shadow-lg">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <h1 className="text-2xl font-extrabold tracking-wider">
                    <Link to="/dashboard" className="hover:text-yellow-400 transition-all">
                        Gestión Empresarial
                    </Link>
                </h1>
                <nav className="space-x-6 text-lg">
                    {/* Gestión de Productos */}
                    {['Administrador', 'Gerente', 'Empleado'].includes(rol) && (
                        <Link to="/productos" className="hover:underline hover:text-yellow-400 transition-all">
                            Productos
                        </Link>
                    )}

                    {/* Gestión de Clientes */}
                    {['Administrador', 'Gerente', 'Empleado'].includes(rol) && (
                        <Link to="/clientes" className="hover:underline hover:text-yellow-400 transition-all">
                            Clientes
                        </Link>
                    )}

                    {/* Gestión de Ventas */}
                    {['Administrador', 'Gerente', 'Empleado'].includes(rol) && (
                        <Link to="/ventas" className="hover:underline hover:text-yellow-400 transition-all">
                            Ventas
                        </Link>
                    )}

                    {/* Gestión de Categorías */}
                    {['Administrador', 'Gerente'].includes(rol) && (
                        <Link to="/categorias" className="hover:underline hover:text-yellow-400 transition-all">
                            Categorías
                        </Link>
                    )}

                    {/* Gestión de Modo de Pago */}
                    {['Administrador', 'Gerente'].includes(rol) && (
                        <Link to="/modopago" className="hover:underline hover:text-yellow-400 transition-all">
                            Modo de Pago
                        </Link>
                    )}

                    {/* Gestión de Facturas */}
                    {['Administrador', 'Gerente'].includes(rol) && (
                        <Link to="/facturas" className="hover:underline hover:text-yellow-400 transition-all">
                            Facturas
                        </Link>
                    )}

                    {/* Gestión de Detalles */}
                    {['Administrador', 'Gerente'].includes(rol) && (
                        <Link to="/detalles" className="hover:underline hover:text-yellow-400 transition-all">
                            Detalles
                        </Link>
                    )}

                    {/* Gestión de Usuarios */}
                    {['Administrador', 'Gerente'].includes(rol) && (
                        <Link to="/usuarios" className="hover:underline hover:text-yellow-400 transition-all">
                            Usuarios
                        </Link>
                    )}

                    {/* Botón de Cerrar Sesión */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded transition-all shadow-lg hover:shadow-xl"
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
