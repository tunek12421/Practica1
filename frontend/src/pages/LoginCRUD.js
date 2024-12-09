import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const LoginCRUD = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        rol: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const { auth } = useAuth();
    const { rol } = auth.user;

    // Cargar lista de usuarios
    const fetchUsuarios = async () => {
        try {
            const response = await api.get('/login');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Crear o editar usuario
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/login/${formData.id_usuario}`, formData);
                setModalMessage('Usuario actualizado correctamente.');
            } else {
                await api.post('/login', formData);
                setModalMessage('Usuario creado correctamente.');
            }
            setShowForm(false);
            setIsEditing(false);
            setFormData({ username: '', password: '', rol: '' });
            fetchUsuarios();
        } catch (error) {
            setModalMessage('Error al guardar el usuario.');
            console.error('Error:', error);
        } finally {
            setShowModal(true);
        }
    };

    // Eliminar usuario
    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await api.delete(`/login/${confirmDelete}`);
                setModalMessage('Usuario eliminado correctamente.');
                fetchUsuarios();
            } catch (error) {
                setModalMessage('Error al eliminar el usuario.');
                console.error('Error:', error);
            } finally {
                setShowModal(true);
                setConfirmDelete(null);
            }
        }
    };

    // Mostrar formulario para editar usuario
    const handleEdit = (usuario) => {
        setFormData(usuario);
        setIsEditing(true);
        setShowForm(true);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h2>

            {/* Botón para crear usuario (solo Administrador/Gerente) */}
            {['Administrador', 'Gerente'].includes(rol) && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => {
                        setShowForm(true);
                        setIsEditing(false);
                        setFormData({ username: '', password: '', rol: '' });
                    }}
                >
                    Crear Usuario
                </button>
            )}

            {/* Lista de usuarios */}
            {loading ? (
                <p>Cargando usuarios...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {usuarios.map((usuario) => (
                        <div key={usuario.id_usuario} className="p-6 bg-white shadow-md rounded-lg hover:shadow-[0px_0px_20px_7px_#00000024]">
                            <h3 className="text-xl font-bold text-green-600">{usuario.username}</h3>
                            <p className="text-gray-700">Rol: {usuario.rol}</p>
                            {['Administrador', 'Gerente'].includes(rol) && (
                                <div className="mt-4 space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleEdit(usuario)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => setConfirmDelete(usuario.id_usuario)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Modal para el formulario */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold mb-4">{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</h3>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Username:</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Rol:</label>
                                <select
                                    name="rol"
                                    value={formData.rol}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                >
                                    <option value="">Seleccionar rol</option>
                                    <option value="Empleado">Empleado</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Gerente">Gerente</option>
                                </select>
                            </div>
                            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all">
                                {isEditing ? 'Actualizar Usuario' : 'Guardar Usuario'}
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded ml-2 shadow-md hover:bg-red-600 transition-all"
                                onClick={() => {
                                    setShowForm(false);
                                    setIsEditing(false);
                                    setFormData({ username: '', password: '', rol: '' });
                                }}
                            >
                                Cancelar
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para notificaciones */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md text-center">
                        <p className="text-gray-700">{modalMessage}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                            onClick={() => setShowModal(false)}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para confirmación de eliminación */}
            {confirmDelete && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md text-center">
                        <p className="text-gray-700">¿Estás seguro de que deseas eliminar este usuario?</p>
                        <div className="mt-4 space-x-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={handleDelete}
                            >
                                Eliminar
                            </button>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                                onClick={() => setConfirmDelete(null)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default LoginCRUD;
