import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { Typewriter } from 'react-simple-typewriter';
import Snowfall from 'react-snowfall';

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-gray-900">
            <Snowfall />
            <form onSubmit={handleSubmit} className="frozen-form bg-white bg-opacity-10 backdrop-blur-lg p-10 rounded-lg shadow-lg relative z-10 w-1/4">
                <h1 className="text-3xl font-bold mb-8 text-white text-center">
                    <Typewriter
                        words={['Bienvenido', 'Inicia Sesión']}
                        loop={false}
                        cursor
                        cursorStyle='|'
                        typeSpeed={120}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </h1>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="username">Usuario</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 rounded bg-gray-800 text-white"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-white mb-2" htmlFor="password">Contraseña</label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded bg-gray-800 text-white"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 px-3 text-white"
                        >
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </button>
                    </div>
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <button type="submit" className="snow-button w-full bg-blue-500 text-white p-2 rounded">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
