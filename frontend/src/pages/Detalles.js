import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Detalles = () => {
    const [detalles, setDetalles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id_factura: '',
        id_producto: '',
        cantidad: '',
        precio: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const { auth } = useAuth();
    const { rol } = auth.user;

    // Cargar lista de detalles
    const fetchDetalles = async () => {
        try {
            const response = await api.get('/detalles');
            setDetalles(response.data);
        } catch (error) {
            console.error('Error al cargar los detalles:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetalles();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Crear o editar detalle
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/detalles/${formData.num_detalle}`, formData);
                setModalMessage('Detalle actualizado correctamente.');
            } else {
                await api.post('/detalles', formData);
                setModalMessage('Detalle creado correctamente.');
            }
            setShowForm(false);
            setIsEditing(false);
            setFormData({
                id_factura: '',
                id_producto: '',
                cantidad: '',
                precio: '',
            });
            fetchDetalles(); // Recargar lista
        } catch (error) {
            setModalMessage('Error al guardar el detalle.');
            console.error('Error:', error);
        } finally {
            setShowModal(true);
        }
    };

    // Eliminar detalle
    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await api.delete(`/detalles/${confirmDelete}`);
                setModalMessage('Detalle eliminado correctamente.');
                fetchDetalles(); // Recargar lista
            } catch (error) {
                setModalMessage('Error al eliminar el detalle.');
                console.error('Error:', error);
            } finally {
                setShowModal(true);
                setConfirmDelete(null);
            }
        }
    };

    // Mostrar formulario para editar detalle
    const handleEdit = (detalle) => {
        setFormData(detalle);
        setIsEditing(true);
        setShowForm(true);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Detalles</h2>

            {/* Botón para crear detalle (solo Administrador/Gerente) */}
            {['Administrador', 'Gerente'].includes(rol) && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => {
                        setShowForm(true);
                        setIsEditing(false);
                        setFormData({
                            id_factura: '',
                            id_producto: '',
                            cantidad: '',
                            precio: '',
                        });
                    }}
                >
                    Crear Detalle
                </button>
            )}

            {/* Lista de detalles */}
            {loading ? (
                <p>Cargando detalles...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {detalles.map((detalle) => (
                        <div key={detalle.num_detalle} className="p-6 bg-white shadow-md rounded-lg hover:shadow-[0px_0px_20px_7px_#00000024]">
                            <h3 className="text-xl font-bold text-green-600">Detalle #{detalle.num_detalle}</h3>
                            <p className="text-gray-700">Factura: {detalle.id_factura}</p>
                            <p className="text-gray-700">Producto: {detalle.producto}</p>
                            <p className="text-gray-700">Cantidad: {detalle.cantidad}</p>
                            <p className="text-gray-700">Precio: ${detalle.precio.toFixed(2)}</p>
                            {['Administrador', 'Gerente'].includes(rol) && (
                                <div className="mt-4 space-x-2">
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() => handleEdit(detalle)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() => setConfirmDelete(detalle.num_detalle)}
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
                            <h3 className="text-xl font-bold mb-4">{isEditing ? 'Editar Detalle' : 'Crear Detalle'}</h3>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Factura ID:</label>
                                <input
                                    type="number"
                                    name="id_factura"
                                    value={formData.id_factura}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Producto ID:</label>
                                <input
                                    type="number"
                                    name="id_producto"
                                    value={formData.id_producto}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Cantidad:</label>
                                <input
                                    type="number"
                                    name="cantidad"
                                    value={formData.cantidad}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Precio:</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    name="precio"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all">
                                {isEditing ? 'Actualizar Detalle' : 'Guardar Detalle'}
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded ml-2 shadow-md hover:bg-red-600 transition-all"
                                onClick={() => setShowForm(false)}
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
                        <p className="text-gray-700">¿Estás seguro de que deseas eliminar este detalle?</p>
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

export default Detalles;
