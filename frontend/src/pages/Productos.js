import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { motion } from 'framer-motion';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        precio: '',
        stock: '',
        id_categoria: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const { auth } = useAuth();
    const { rol } = auth.user;

    // Cargar lista de productos
    const fetchProductos = async () => {
        try {
            const response = await api.get('/productos');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    // Manejar cambios en el formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Crear o editar producto
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await api.put(`/productos/${formData.id_producto}`, formData);
                setModalMessage('Producto actualizado correctamente.');
            } else {
                await api.post('/productos', formData);
                setModalMessage('Producto creado correctamente.');
            }
            setShowForm(false);
            setIsEditing(false);
            setFormData({ nombre: '', precio: '', stock: '', id_categoria: '' });
            fetchProductos(); // Recargar lista
        } catch (error) {
            setModalMessage('Error al guardar el producto.');
            console.error('Error:', error);
        } finally {
            setShowModal(true);
        }
    };

    // Eliminar producto
    const handleDelete = async () => {
        if (confirmDelete) {
            try {
                await api.delete(`/productos/${confirmDelete}`);
                setModalMessage('Producto eliminado correctamente.');
                fetchProductos(); // Recargar lista
            } catch (error) {
                setModalMessage('Error al eliminar el producto.');
                console.error('Error:', error);
            } finally {
                setShowModal(true);
                setConfirmDelete(null);
            }
        }
    };

    // Mostrar formulario para editar producto
    const handleEdit = (producto) => {
        setFormData(producto);
        setIsEditing(true);
        setShowForm(true);
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Productos</h2>

            {/* Botón para crear producto (solo Administrador/Gerente) */}
            {['Administrador', 'Gerente'].includes(rol) && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
                    onClick={() => {
                        setShowForm(true);
                        setIsEditing(false);
                        setFormData({ nombre: '', precio: '', stock: '', id_categoria: '' });
                    }}
                >
                    Crear Producto
                </button>
            )}

            {/* Lista de productos */}
            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {productos.map((producto) => (
                            <motion.div
                                key={producto.id_producto}
                                className="p-6 bg-white shadow-md rounded-lg hover:shadow-[0px_0px_20px_7px_#00000024]"
                                whileHover={{ scale: 1.05 }}
                            >
                                <h3 className="text-xl font-bold text-green-600">{producto.nombre}</h3>
                                <p className="text-gray-700">Precio: ${producto.precio}</p>
                                <p className="text-gray-700">Stock: {producto.stock}</p>
                                <p className="text-gray-700">Categoría: {producto.id_categoria}</p>
                                {['Administrador', 'Gerente'].includes(rol) && (
                                    <div className="mt-4 space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-400"
                                            onClick={() => handleEdit(producto)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-400"
                                            onClick={() => setConfirmDelete(producto.id_producto)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Modal para el formulario */}
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">{isEditing ? 'Editar Producto' : 'Crear Producto'}</h3>
                        <form onSubmit={handleSubmit}>
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
                                <label className="block text-gray-700">Precio:</label>
                                <input
                                    type="number"
                                    name="precio"
                                    value={formData.precio}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700">Stock:</label>
                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700">Categoría:</label>
                                <input
                                    type="text"
                                    name="id_categoria"
                                    value={formData.id_categoria}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                                {isEditing ? 'Actualizar Producto' : 'Guardar Producto'}
                            </button>
                            <button
                                type="button"
                                className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                                onClick={() => {
                                    setShowForm(false);
                                    setIsEditing(false);
                                    setFormData({ nombre: '', precio: '', stock: '', id_categoria: '' });
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
                        <p className="text-gray-700">¿Estás seguro de que deseas eliminar este producto?</p>
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

export default Productos;