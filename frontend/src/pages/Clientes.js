import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        direccion: '',
        fecha_nacimiento: '',
        telefono: '',
        email: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const { auth } = useAuth();
    const { rol } = auth.user;

    // Cargar lista de clientes
    const fetchClientes = async () => {
        try {
            const response = await api.get('/clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Error al cargar los clientes:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Crear o editar cliente
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/clientes/${formData.id_cliente}`, formData);
                setModalMessage('Cliente actualizado correctamente.');
            } else {
                await api.post('/clientes', formData);
                setModalMessage('Cliente creado correctamente.');
            }
            setShowForm(false);
            setIsEditing(false);
            setFormData({
                nombre: '',
                apellido: '',
                direccion: '',
                fecha_nacimiento: '',
                telefono: '',
                email: '',
            });
            fetchClientes(); // Recargar lista
        } catch (error) {
            setModalMessage('Error al guardar el cliente.');
            console.error('Error:', error);
        } finally {
            setShowModal(true);
        }
    };

    // Eliminar cliente
    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await api.delete(`/clientes/${confirmDelete}`);
                setModalMessage('Cliente eliminado correctamente.');
                fetchClientes(); // Recargar lista
            } catch (error) {
                setModalMessage('Error al eliminar el cliente.');
                console.error('Error:', error);
            } finally {
                setShowModal(true);
                setConfirmDelete(null);
            }
        }
    };

    // Mostrar formulario para editar cliente
    const handleEdit = (cliente) => {
        setFormData(cliente);
        setIsEditing(true);
        setShowForm(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Clientes</h2>
            {['Empleado', 'Administrador', 'Gerente'].includes(rol) && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => {
                        setShowForm(true);
                        setIsEditing(false);
                        setFormData({
                            nombre: '',
                            apellido: '',
                            direccion: '',
                            fecha_nacimiento: '',
                            telefono: '',
                            email: '',
                        });
                    }}
                >
                    {isEditing ? 'Editar Cliente' : 'Crear Cliente'}
                </button>
            )}

            {showForm && (
                <form onSubmit={handleSubmit} className="bg-white p-4 shadow-md rounded mb-6">
                    <h3 className="text-xl font-bold mb-4">{isEditing ? 'Editar Cliente' : 'Crear Cliente'}</h3>
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
                        <label className="block text-gray-700">Apellido:</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Dirección:</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Fecha de Nacimiento:</label>
                        <input
                            type="date"
                            name="fecha_nacimiento"
                            value={formData.fecha_nacimiento}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Teléfono:</label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Correo Electrónico:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                        {isEditing ? 'Actualizar Cliente' : 'Guardar Cliente'}
                    </button>
                    <button
                        type="button"
                        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                        onClick={() => {
                            setShowForm(false);
                            setIsEditing(false);
                            setFormData({
                                nombre: '',
                                apellido: '',
                                direccion: '',
                                fecha_nacimiento: '',
                                telefono: '',
                                email: '',
                            });
                        }}
                    >
                        Cancelar
                    </button>
                </form>
            )}

            {loading ? (
                <p>Cargando...</p>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4">Nombre</th>
                            <th className="py-2 px-4">Apellido</th>
                            <th className="py-2 px-4">Dirección</th>
                            <th className="py-2 px-4">Teléfono</th>
                            <th className="py-2 px-4">Correo Electrónico</th>
                            {['Administrador', 'Gerente'].includes(rol) && <th className="py-2 px-4">Acciones</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id_cliente}>
                                <td className="py-2 px-4">{cliente.nombre}</td>
                                <td className="py-2 px-4">{cliente.apellido}</td>
                                <td className="py-2 px-4">{cliente.direccion}</td>
                                <td className="py-2 px-4">{cliente.telefono}</td>
                                <td className="py-2 px-4">{cliente.email}</td>
                                {['Administrador', 'Gerente'].includes(rol) && (
                                    <td className="py-2 px-4 space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                                            onClick={() => handleEdit(cliente)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                            onClick={() => setConfirmDelete(cliente.id_cliente)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                        <p className="text-gray-700">¿Estás seguro de que deseas eliminar este cliente?</p>
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
        </div>
    );
};

export default Clientes;
