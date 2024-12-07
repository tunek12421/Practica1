import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Productos</h2>
                {loading ? (
                    <p>Cargando productos...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {productos.map((producto) => (
                            <div key={producto.id_producto} className="p-6 bg-white shadow-md rounded-lg">
                                <h3 className="text-xl font-bold text-green-600">{producto.nombre}</h3>
                                <p className="text-gray-700">Precio: ${producto.precio}</p>
                                <p className="text-gray-700">Stock: {producto.stock}</p>
                                <p className="text-gray-700">Categoría: {producto.id_categoria}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Productos;
