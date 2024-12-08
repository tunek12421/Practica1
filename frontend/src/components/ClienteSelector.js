import React, { useState } from 'react';

const ClienteSelector = ({ clientes, venta, setVenta }) => {
    const [searchCliente, setSearchCliente] = useState('');
    const filteredClientes = clientes.filter(cliente =>
        `${cliente.nombre} ${cliente.apellido}`.toLowerCase().includes(searchCliente.toLowerCase())
    );

    return (
        <div className="mb-6 bg-white p-4 rounded shadow-md">
            <h3 className="text-lg font-bold text-gray-700 mb-2">1. Selecciona un Cliente</h3>
            <input
                type="text"
                value={searchCliente}
                onChange={(e) => setSearchCliente(e.target.value)}
                placeholder="Buscar cliente por nombre..."
                className="w-full px-4 py-2 border rounded mb-4"
            />
            <select
                value={venta.id_cliente}
                onChange={(e) => setVenta({ ...venta, id_cliente: e.target.value })}
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
    );
};

export default ClienteSelector;
