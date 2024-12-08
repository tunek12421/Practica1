import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { username, password });
            login(response.data.token); // Solo pasamos el token al contexto
            navigate('/dashboard'); // Redirige al dashboard
        } catch (err) {
            setError(err.response?.data?.error || 'Error de conexión con el backend');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bglog bg-cover bg-center "  >
            <form onSubmit={handleSubmit} className="bg-transparent backdrop-blur-lg p-10 rounded shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] shadow-blue-400 ">
                <h1 className="text-2xl font-bold  mb-8 text-white text-center ">Bienvenido de nuevo</h1>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-3   bg-transparent text-white border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-200 focus:border-b-2"
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-8   bg-transparent text-white border-0 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition duration-200 focus:border-b-2"
                />
                <button type="submit" className="w-full bg-trnasparent border mt-3 text-white py-2 rounded hover:bg-blue-700 hover:border-transparent transition duration-300 ease-in-out">
                    Ingresar
                </button>
            </form>
        </div>
    );
};

export default Login;
