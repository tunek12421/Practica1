import React, { useState } from 'react';

const ProductoSelector = ({ productos, venta, setVenta, setError }) => {
    const [searchProducto, setSearchProducto] = useState('');
    const [selectedProducto, setSelectedProducto] = useState({ id_producto: '', cantidad: 1 });

    const filteredProductos = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(searchProducto.toLowerCase())
    );

    const handleAddProducto = () => {
        const { id_producto, cantidad } = selectedProducto;

        if (!id_producto || cantidad <= 0) {
            setError('Debe seleccionar un producto y una cantidad válida.');
            return;
        }

        const producto = productos.find(p => p.id_producto === parseInt(id_producto, 10));
        if (!producto) {
            setError('Producto no encontrado.');
            return;
        }

        if (producto.stock < cantidad) {
            setError('Stock insuficiente para este producto.');
            return;
        }

        setVenta(prevVenta => {
            const existingItemIndex = prevVenta.productos.findIndex(
                item => item.id_producto === parseInt(id_producto, 10)
            );

            if (existingItemIndex >= 0) {
                const updatedProductos = [...prevVenta.productos];
                const existingItem = updatedProductos[existingItemIndex];
                const nuevaCantidad = parseInt(cantidad, 10);

                if (existingItem.cantidad + nuevaCantidad > producto.stock) {
                    setError('Cantidad total supera el stock disponible.');
                    return prevVenta; // No hacer cambios si supera el stock
                }

                updatedProductos[existingItemIndex] = {
                    ...existingItem,
                    cantidad: existingItem.cantidad + nuevaCantidad,
                };

                return { ...prevVenta, productos: updatedProductos };
            } else {
                return {
                    ...prevVenta,
                    productos: [
                        ...prevVenta.productos,
                        {
                            id_producto: parseInt(id_producto, 10),
                            cantidad: parseInt(cantidad, 10),
                            precio: producto.precio,
                        },
                    ],
                };
            }
        });

        setSelectedProducto({ id_producto: '', cantidad: 1 }); // Reiniciar el formulario
        setError('');
    };

    const isAddDisabled = () => {
        if (!selectedProducto.id_producto) return true;

        const producto = productos.find(p => p.id_producto === parseInt(selectedProducto.id_producto, 10));
        return !producto || selectedProducto.cantidad > producto.stock || selectedProducto.cantidad <= 0;
    };

    return (
        <div className="mb-6 bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-2">2. Añadir Productos a la Venta</h3>
            <input
                type="text"
                value={searchProducto}
                onChange={(e) => setSearchProducto(e.target.value)}
                placeholder="Buscar producto por nombre..."
                className="w-full px-4 py-2 border rounded mb-4"
            />
            <div className="flex items-center space-x-4">
                <select
                    value={selectedProducto.id_producto}
                    onChange={(e) =>
                        setSelectedProducto({ ...selectedProducto, id_producto: e.target.value })
                    }
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
                    onChange={(e) =>
                        setSelectedProducto({
                            ...selectedProducto,
                            cantidad: parseInt(e.target.value, 10),
                        })
                    }
                    className="w-24 px-4 py-2 border rounded"
                    placeholder="Cantidad"
                />
                <button
                    onClick={handleAddProducto}
                    disabled={isAddDisabled()}
                    className={`px-4 py-2 rounded ${
                        isAddDisabled() ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                >
                    Añadir
                </button>
            </div>
        </div>
    );
};

export default ProductoSelector;
