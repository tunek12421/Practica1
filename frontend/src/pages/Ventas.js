import React, { useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Ventas = () => {
    const [idCliente, setIdCliente] = useState('');
    const [productos, setProductos] = useState([{ id_producto: '', cantidad: '' }]);
    const [mensaje, setMensaje] = useState('');

    const handleVenta = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/ventas', {
                id_cliente: idCliente,
                productos,
            });
            setMensaje('Venta registrada exitosamente. ID Factura: ' + response.data.id_factura);
        } catch (error) {
            setMensaje('Error al registrar la venta.');
        }
    };

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Registrar Venta</h2>
                <form onSubmit={handleVenta} className="bg-white p-6 rounded shadow-md">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ID Cliente</label>
                        <input
                            type="text"
                            value={idCliente}
                            onChange={(e) => setIdCliente(e.target.value)}
                            className="w-full px-4 py-2 border rounded"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Productos</label>
                        {productos.map((producto, index) => (
                            <div key={index} className="flex space-x-4 mb-2">
                                <input
                                    type="text"
                                    placeholder="ID Producto"
                                    value={producto.id_producto}
                                    onChange={(e) =>
                                        setProductos((prev) => {
                                            const newProductos = [...prev];
                                            newProductos[index].id_producto = e.target.value;
                                            return newProductos;
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <input
                                    type="number"
                                    placeholder="Cantidad"
                                    value={producto.cantidad}
                                    onChange={(e) =>
                                        setProductos((prev) => {
                                            const newProductos = [...prev];
                                            newProductos[index].cantidad = e.target.value;
                                            return newProductos;
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded"
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() =>
                                setProductos((prev) => [...prev, { id_producto: '', cantidad: '' }])
                            }
                            className="mt-2 text-blue-500 hover:underline"
                        >
                            Añadir Producto
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Registrar Venta
                    </button>
                </form>
                {mensaje && <p className="mt-4 text-green-600">{mensaje}</p>}
            </main>
            <Footer />
        </>
    );
};

export default Ventas;
