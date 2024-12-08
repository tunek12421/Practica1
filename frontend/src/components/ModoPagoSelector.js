import React from 'react';

const ModoPagoSelector = ({ modosPago, venta, setVenta }) => {
    return (
        <div className="mb-6 bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-2">2. Selecciona el Modo de Pago</h3>
            <select
                value={venta.num_pago}
                onChange={e => setVenta({ ...venta, num_pago: e.target.value })}
                className="w-full px-4 py-2 border rounded"
            >
                <option value="">Seleccione un modo de pago</option>
                {modosPago.map((pago) => (
                    <option key={pago.num_pago} value={pago.num_pago}>
                        {pago.nombre} - {pago.otros_detalles}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ModoPagoSelector;
