import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Facturas = () => {
    const [facturas, setFacturas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [modosPago, setModosPago] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        id_cliente: '',
        fecha: '',
        num_pago: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    // Cargar facturas, clientes y modos de pago
    const fetchFacturas = async () => {
        try {
            const [facturasResponse, clientesResponse, modosPagoResponse] = await Promise.all([
                api.get('/facturas'),
                api.get('/clientes'),
                api.get('/modo-pago'),
            ]);
            setFacturas(facturasResponse.data);
            setClientes(clientesResponse.data);
            setModosPago(modosPagoResponse.data);
        } catch (error) {
            console.error('Error al cargar los datos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFacturas();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Crear o editar factura
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/facturas/${formData.num_factura}`, formData);
                setModalMessage('Factura actualizada correctamente.');
            } else {
                await api.post('/facturas', formData);
                setModalMessage('Factura creada correctamente.');
            }
            setShowForm(false);
            setIsEditing(false);
            setFormData({ id_cliente: '', fecha: '', num_pago: '' });
            fetchFacturas(); // Recargar lista
        } catch (error) {
            setModalMessage('Error al guardar la factura.');
            console.error('Error:', error);
        } finally {
            setShowModal(true);
        }
    };

    // Eliminar factura
    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await api.delete(`/facturas/${confirmDelete}`);
                setModalMessage('Factura eliminada correctamente.');
                fetchFacturas(); // Recargar lista
            } catch (error) {
                setModalMessage('Error al eliminar la factura.');
                console.error('Error:', error);
            } finally {
                setShowModal(true);
                setConfirmDelete(null);
            }
        }
    };

    // Mostrar formulario para editar factura
    const handleEdit = (factura) => {
        setFormData(factura);
        setIsEditing(true);
        setShowForm(true);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Facturas</h2>

            {/* Botón para crear factura */}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                onClick={() => {
                    setShowForm(true);
                    setIsEditing(false);
                    setFormData({ id_cliente: '', fecha: '', num_pago: '' });
                }}
            >
                Crear Factura
            </button>

            {/* Lista de facturas */}
            {loading ? (
                <p>Cargando facturas...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {facturas.map((factura) => (
                        <div key={factura.num_factura} className="p-6 bg-white shadow-md rounded-lg hover:shadow-[0px_0px_20px_7px_#00000024]">
                            <h3 className="text-xl font-bold text-green-600">Factura #{factura.num_factura}</h3>
                            <p className="text-gray-700">Fecha: {factura.fecha}</p>
                            <p className="text-gray-700">Cliente: {factura.cliente}</p>
                            <p className="text-gray-700">Modo de Pago: {factura.modo_pago}</p>
                            <div className="mt-4 space-x-2">
                                <button
                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleEdit(factura)}
                                >
                                    Editar
                                </button>
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => setConfirmDelete(factura.num_factura)}
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
                            <h3 className="text-xl font-bold mb-4">{isEditing ? 'Editar Factura' : 'Crear Factura'}</h3>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Cliente:</label>
                                <select
                                    name="id_cliente"
                                    value={formData.id_cliente}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                >
                                    <option value="">Seleccione un cliente</option>
                                    {clientes.map((cliente) => (
                                        <option key={cliente.id_cliente} value={cliente.id_cliente}>
                                            {cliente.nombre} {cliente.apellido}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Fecha:</label>
                                <input
                                    type="date"
                                    name="fecha"
                                    value={formData.fecha}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 font-semibold">Modo de Pago:</label>
                                <select
                                    name="num_pago"
                                    value={formData.num_pago}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                >
                                    <option value="">Seleccione un modo de pago</option>
                                    {modosPago.map((modo) => (
                                        <option key={modo.num_pago} value={modo.num_pago}>
                                            {modo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition-all">
                                {isEditing ? 'Actualizar Factura' : 'Guardar Factura'}
                            </button>
                            <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded ml-2 shadow-md hover:bg-red-600 transition-all"
                                onClick={() => {
                                    setShowForm(false);
                                    setIsEditing(false);
                                    setFormData({ id_cliente: '', fecha: '', num_pago: '' });
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
                        <p className="text-gray-700">¿Estás seguro de que deseas eliminar esta factura?</p>
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

export default Facturas;
