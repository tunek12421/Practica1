import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Clientes</h2>
                {loading ? (
                    <p>Cargando clientes...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {clientes.map((cliente) => (
                            <div key={cliente.id_cliente} className="p-6 bg-white shadow-md rounded-lg">
                                <h3 className="text-xl font-bold text-blue-600">
                                    {cliente.nombre} {cliente.apellido}
                                </h3>
                                <p className="text-gray-700">Dirección: {cliente.direccion}</p>
                                <p className="text-gray-700">Teléfono: {cliente.telefono}</p>
                                <p className="text-gray-700">Email: {cliente.email}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Clientes;
