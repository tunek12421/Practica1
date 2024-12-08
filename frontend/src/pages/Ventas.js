import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Ventas = () => {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [filteredClientes, setFilteredClientes] = useState([]);
    const [filteredProductos, setFilteredProductos] = useState([]);
    const [venta, setVenta] = useState({
        id_cliente: '',
        fecha: new Date().toISOString().slice(0, 10),
        num_pago: '',
        items: [],
    });
    const [searchCliente, setSearchCliente] = useState('');
    const [searchProducto, setSearchProducto] = useState('');
    const [selectedProducto, setSelectedProducto] = useState({ id_producto: '', cantidad: 1 });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    // Cargar clientes y productos al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientesResponse, productosResponse] = await Promise.all([
                    api.get('/clientes'),
                    api.get('/productos'),
                ]);
                setClientes(clientesResponse.data);
                setProductos(productosResponse.data);
                setFilteredClientes(clientesResponse.data);
                setFilteredProductos(productosResponse.data);
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setError('Error al cargar datos. Intenta nuevamente.');
            }
        };
        fetchData();
    }, []);

    // Buscar clientes
    const handleSearchCliente = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchCliente(query);
        setFilteredClientes(
            clientes.filter(cliente =>
                `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(query)
            )
        );
    };

    // Buscar productos
    const handleSearchProducto = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchProducto(query);
        setFilteredProductos(
            productos.filter(producto => producto.nombre.toLowerCase().includes(query))
        );
    };

    // Añadir productos a la venta
    const handleAddProducto = () => {
        if (!selectedProducto.id_producto || selectedProducto.cantidad <= 0) {
            setError('Debe seleccionar un producto y una cantidad válida.');
            return;
        }

        const producto = productos.find(p => p.id_producto === parseInt(selectedProducto.id_producto, 10));
        if (!producto || producto.stock < selectedProducto.cantidad) {
            setError('Stock insuficiente para este producto.');
            return;
        }

        setVenta(prevVenta => {
            const existingItemIndex = prevVenta.items.findIndex(
                item => item.id_producto === parseInt(selectedProducto.id_producto, 10)
            );

            if (existingItemIndex >= 0) {
                // Actualizar cantidad y subtotal del producto existente
                const updatedItems = [...prevVenta.items];
                updatedItems[existingItemIndex].cantidad += parseInt(selectedProducto.cantidad, 10);
                updatedItems[existingItemIndex].subtotal =
                    updatedItems[existingItemIndex].cantidad * producto.precio;
                return { ...prevVenta, items: updatedItems };
            } else {
                // Añadir nuevo producto a la lista
                return {
                    ...prevVenta,
                    items: [
                        ...prevVenta.items,
                        {
                            ...producto,
                            cantidad: parseInt(selectedProducto.cantidad, 10),
                            subtotal: producto.precio * parseInt(selectedProducto.cantidad, 10),
                        },
                    ],
                };
            }
        });

        // Reiniciar el formulario del producto seleccionado
        setSelectedProducto({ id_producto: '', cantidad: 1 });
        setError('');
    };

    // Registrar venta
    const handleVenta = async () => {
        try {
            const { id_cliente, fecha, num_pago, items } = venta;

            if (!id_cliente || !fecha || !num_pago || items.length === 0) {
                setError('Debe completar todos los campos obligatorios.');
                return;
            }

            const response = await api.post('/ventas', { id_cliente, fecha, num_pago, productos: items });
            setMensaje(`Venta registrada exitosamente. ID Factura: ${response.data.id_factura}`);
            setVenta({ id_cliente: '', fecha: new Date().toISOString().slice(0, 10), num_pago: '', items: [] });
            setError('');
        } catch (error) {
            setError('Error al registrar la venta.');
            console.error('Error:', error);
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-blue-600 mb-6 text-center">Registrar Nueva Venta</h2>

            {/* Selección de Cliente */}
            <div className="mb-6 bg-white p-4 rounded shadow-md">
                <h3 className="text-lg font-bold text-gray-700 mb-2">1. Selecciona un Cliente</h3>
                <input
                    type="text"
                    value={searchCliente}
                    onChange={handleSearchCliente}
                    placeholder="Buscar cliente por nombre..."
                    className="w-full px-4 py-2 border rounded mb-4"
                />
                <select
                    value={venta.id_cliente}
                    onChange={e => setVenta({ ...venta, id_cliente: e.target.value })}
                    className="w-full px-4 py-2 border rounded"
                >
                    <option value="">Seleccione un cliente</option>
                    {filteredClientes.map(cliente => (
                        <option key={cliente.id_cliente} value={cliente.id_cliente}>
                            {cliente.nombre} {cliente.apellido} - {cliente.email}
                        </option>
                    ))}
                </select>
            </div>

            {/* Selección de Productos */}
            <div className="mb-6 bg-white p-4 rounded shadow-md">
                <h3 className="text-lg font-bold text-gray-700 mb-2">2. Añadir Productos a la Venta</h3>
                <input
                    type="text"
                    value={searchProducto}
                    onChange={handleSearchProducto}
                    placeholder="Buscar producto por nombre..."
                    className="w-full px-4 py-2 border rounded mb-4"
                />
                <div className="flex items-center space-x-4">
                    <select
                        value={selectedProducto.id_producto}
                        onChange={e => setSelectedProducto({ ...selectedProducto, id_producto: e.target.value })}
                        className="flex-1 px-4 py-2 border rounded"
                    >
                        <option value="">Seleccione un producto</option>
                        {filteredProductos.map(producto => (
                            <option key={producto.id_producto} value={producto.id_producto}>
                                {producto.nombre} - Stock: {producto.stock} - Precio: ${producto.precio}
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        min="1"
                        value={selectedProducto.cantidad}
                        onChange={e => setSelectedProducto({ ...selectedProducto, cantidad: parseInt(e.target.value, 10) })}
                        className="w-24 px-4 py-2 border rounded"
                        placeholder="Cantidad"
                    />
                    <button
                        onClick={handleAddProducto}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Añadir
                    </button>
                </div>
                {error && <p className="mt-2 text-red-600">{error}</p>}
            </div>

            {/* Resumen de la Venta */}
            <div className="mb-6 bg-white p-4 rounded shadow-md">
                <h3 className="text-lg font-bold text-gray-700 mb-2">3. Resumen de la Venta</h3>
                {venta.items.length > 0 ? (
                    <table className="w-full bg-white shadow-md rounded">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 text-left">Producto</th>
                                <th className="py-2 px-4 text-left">Cantidad</th>
                                <th className="py-2 px-4 text-left">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {venta.items.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4">{item.nombre}</td>
                                    <td className="py-2 px-4">{item.cantidad}</td>
                                    <td className="py-2 px-4">${item.subtotal.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-gray-600">No se han añadido productos a la venta.</p>
                )}
            </div>

            {/* Total y Botón de Registro */}
            <div className="text-right">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Total: ${venta.items.reduce((acc, item) => acc + item.subtotal, 0).toFixed(2)}</h3>
                <button
                    onClick={handleVenta}
                    className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                >
                    Registrar Venta
                </button>
            </div>

            {/* Mensajes de Notificación */}
            {mensaje && <p className="mt-4 text-green-600 text-center">{mensaje}</p>}
        </main>
    );
};

export default Ventas;
