import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const { auth } = useAuth();
    const { rol } = auth.user;

    // Cargar lista de categorías
    const fetchCategorias = async () => {
        try {
            const response = await api.get('/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al cargar las categorías:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Crear o editar categoría
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/categorias/${formData.id_categoria}`, formData);
                setModalMessage('Categoría actualizada correctamente.');
            } else {
                await api.post('/categorias', formData);
                setModalMessage('Categoría creada correctamente.');
            }
            setShowForm(false);
            setIsEditing(false);
            setFormData({ nombre: '', descripcion: '' });
            fetchCategorias(); // Recargar lista
        } catch (error) {
            setModalMessage('Error al guardar la categoría.');
            console.error('Error:', error);
        } finally {
            setShowModal(true);
        }
    };

    // Eliminar categoría
    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await api.delete(`/categorias/${confirmDelete}`);
                setModalMessage('Categoría eliminada correctamente.');
                fetchCategorias(); // Recargar lista
            } catch (error) {
                setModalMessage('Error al eliminar la categoría.');
                console.error('Error:', error);
            } finally {
                setShowModal(true);
                setConfirmDelete(null);
            }
        }
    };

    // Mostrar formulario para editar categoría
    const handleEdit = (categoria) => {
        setFormData(categoria);
        setIsEditing(true);
        setShowForm(true);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Categorías</h2>

            {/* Botón para crear categoría (solo Administrador/Gerente) */}
            {['Administrador', 'Gerente'].includes(rol) && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => {
                        setShowForm(true);
                        setIsEditing(false);
                        setFormData({ nombre: '', descripcion: '' });
                    }}
                >
                    Crear Categoría
                </button>
            )}

            {/* Formulario para crear/editar categoría */}
            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-6">
                    <h3 className="text-xl font-bold mb-4">{isEditing ? 'Editar Categoría' : 'Crear Categoría'}</h3>
                    <div className="mb-3">
                        <label className="block text-gray-700">Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Descripción:</label>
                        <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                        {isEditing ? 'Actualizar Categoría' : 'Guardar Categoría'}
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                        onClick={() => {
                            setShowForm(false);
                            setIsEditing(false);
                            setFormData({ nombre: '', descripcion: '' });
                        }}
                    >
                        Cancelar
                    </button>
                </form>
            )}

            {/* Lista de categorías */}
            {loading ? (
                <p>Cargando categorías...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categorias.map((categoria) => (
                        <div key={categoria.id_categoria} className="p-6 bg-white shadow-md rounded-lg">
                            <h3 className="text-xl font-bold text-yellow-600">{categoria.nombre}</h3>
                            <p className="text-gray-700">Descripción: {categoria.descripcion}</p>
                            {['Administrador', 'Gerente'].includes(rol) && (
                                <div className="mt-4 space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleEdit(categoria)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => setConfirmDelete(categoria.id_categoria)}
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
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
                        <p className="text-gray-700">¿Estás seguro de que deseas eliminar esta categoría?</p>
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

export default Categorias;
