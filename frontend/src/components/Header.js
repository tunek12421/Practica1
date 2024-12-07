import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Elimina el token y limpia el contexto
        navigate('/'); // Redirige a la página de inicio de sesión
    };

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <h1 className="text-2xl font-bold">
                    <Link to="/dashboard" className="hover:text-blue-300">
                        Gestión Empresarial
                    </Link>
                </h1>
                <nav className="space-x-4">
                    <Link to="/productos" className="hover:underline">
                        Productos
                    </Link>
                    <Link to="/clientes" className="hover:underline">
                        Clientes
                    </Link>
                    <Link to="/ventas" className="hover:underline">
                        Ventas
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded"
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
