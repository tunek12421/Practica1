import React from 'react';

const ResumenVenta = ({ venta, handleVenta }) => {
    const total = venta.productos.reduce((acc, item) => acc + item.cantidad * item.precio, 0);

    return (
        <div className="mb-6 bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-2">3. Resumen de la Venta</h3>
            {venta.productos.length > 0 ? (
                <table className="w-full bg-white shadow-md rounded">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 text-left">Producto</th>
                            <th className="py-2 px-4 text-left">Cantidad</th>
                            <th className="py-2 px-4 text-left">Precio</th>
                            <th className="py-2 px-4 text-left">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venta.productos.map((item, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4">{item.id_producto}</td>
                                <td className="py-2 px-4">{item.cantidad}</td>
                                <td className="py-2 px-4">${item.precio.toFixed(2)}</td>
                                <td className="py-2 px-4">${(item.cantidad * item.precio).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No se han añadido productos a la venta.</p>
            )}
            <div className="text-right mt-4">
                <h3 className="text-xl font-bold text-gray-700 mb-4">Total: ${total.toFixed(2)}</h3>
                <button
                    onClick={handleVenta}
                    className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
                >
                    Registrar Venta
                </button>
            </div>
        </div>
    );
};

export default ResumenVenta;
