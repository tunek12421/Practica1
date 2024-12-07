import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                    Bienvenido al Panel de Control
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link
                        to="/clientes"
                        className="p-6 bg-blue-100 rounded-lg shadow hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-bold text-blue-600">Clientes</h3>
                        <p className="text-gray-700">Gestionar clientes registrados.</p>
                    </Link>
                    <Link
                        to="/productos"
                        className="p-6 bg-green-100 rounded-lg shadow hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-bold text-green-600">Productos</h3>
                        <p className="text-gray-700">Gestionar inventario de productos.</p>
                    </Link>
                    <Link
                        to="/categorias"
                        className="p-6 bg-yellow-100 rounded-lg shadow hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-bold text-yellow-600">Categorías</h3>
                        <p className="text-gray-700">Administrar categorías de productos.</p>
                    </Link>
                    <Link
                        to="/ventas"
                        className="p-6 bg-red-100 rounded-lg shadow hover:shadow-lg transition"
                    >
                        <h3 className="text-xl font-bold text-red-600">Ventas</h3>
                        <p className="text-gray-700">Registrar ventas y generar facturas.</p>
                    </Link>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Dashboard;
