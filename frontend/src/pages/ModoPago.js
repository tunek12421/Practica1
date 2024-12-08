import React, { useState, useEffect } from 'react';
import api from '../services/api'; // Asegúrate de ajustar la importación según tu configuración

const ModoPago = () => {
    const [modosPago, setModosPago] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        otros_detalles: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Cargar lista de modos de pago
    const fetchModosPago = async () => {
        try {
            const response = await api.get('/modo-pago');
            setModosPago(response.data);
        } catch (error) {
            console.error('Error al cargar los modos de pago:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchModosPago();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Crear o editar modo de pago
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/modoPago/${formData.num_pago}`, formData);
                setModalMessage('Modo de pago actualizado correctamente.');
            } else {
                await api.post('/modoPago', formData);
                setModalMessage('Modo de pago creado correctamente.');
            }
            setShowForm(false);
            setIsEditing(false);
            setFormData({ nombre: '', otros_detalles: '' });
            fetchModosPago(); // Recargar lista
        } catch (error) {
            setModalMessage('Error al guardar el modo de pago.');
            console.error('Error:', error);
        } finally {
            setShowModal(true);
        }
    };

    // Eliminar modo de pago
    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await api.delete(`/modoPago/${confirmDelete}`);
                setModalMessage('Modo de pago eliminado correctamente.');
                fetchModosPago(); // Recargar lista
            } catch (error) {
                setModalMessage('Error al eliminar el modo de pago.');
                console.error('Error:', error);
            } finally {
                setShowModal(true);
                setConfirmDelete(null);
            }
        }
    };

    // Mostrar formulario para editar modo de pago
    const handleEdit = (modoPago) => {
        setFormData(modoPago);
        setIsEditing(true);
        setShowForm(true);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Modos de Pago</h2>

            {/* Botón para crear modo de pago */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => {
                    setShowForm(true);
                    setIsEditing(false);
                    setFormData({ nombre: '', otros_detalles: '' });
                }}
            >
                Crear Modo de Pago
            </button>

            {/* Lista de modos de pago */}
            {loading ? (
                <p>Cargando modos de pago...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modosPago.map((modoPago) => (
                        <div key={modoPago.num_pago} className="p-6 bg-white shadow-md rounded-lg hover:shadow-[0px_0px_20px_7px_#00000024]">
                            <h3 className="text-xl font-bold text-green-600">{modoPago.nombre}</h3>
                            <p className="text-gray-700">Detalles: {modoPago.otros_detalles}</p>
                            <div className="mt-4 space-x-2">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleEdit(modoPago)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => setConfirmDelete(modoPago.num_pago)}
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal para el formulario */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
                            <h3 className="text-xl font-bold mb-4">{isEditing ? 'Editar Modo de Pago' : 'Crear Modo de Pago'}</h3>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Nombre:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Otros Detalles:</label>
                                <textarea
                                    name="otros_detalles"
                                    value={formData.otros_detalles}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                            </div>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition-all">
                                {isEditing ? 'Actualizar Modo de Pago' : 'Guardar Modo de Pago'}
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded ml-2 shadow-md hover:bg-red-600 transition-all"
                                onClick={() => {
                                    setShowForm(false);
                                    setIsEditing(false);
                                    setFormData({ nombre: '', otros_detalles: '' });
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
                        <p className="text-gray-700">¿Estás seguro de que deseas eliminar este modo de pago?</p>
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

export default ModoPago;
