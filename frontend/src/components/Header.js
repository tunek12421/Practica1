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
        <header className="bg-black text-white shadow-lg">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
            <h1 className="text-2xl font-extrabold tracking-wider">
            <Link to="/dashboard" className="hover:text-yellow-400 transition-all">
                Gestión Empresarial
            </Link>
            </h1>
            <nav className="space-x-6 text-lg">
            <Link to="/productos" className="hover:underline hover:text-yellow-400 transition-all">
                Productos
            </Link>
            <Link to="/clientes" className="hover:underline hover:text-yellow-400 transition-all">
                Clientes
            </Link>
            <Link to="/ventas" className="hover:underline hover:text-yellow-400 transition-all">
                Ventas
            </Link>
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
