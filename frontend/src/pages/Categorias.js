import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Categorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCategorias = async () => {
        try {
            const response = await api.get('/categorias');
            setCategorias(response.data);
        } catch (error) {
            console.error('Error al cargar las categorías:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategorias();
    }, []);

    return (
        <>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Categorías</h2>
                {loading ? (
                    <p>Cargando categorías...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categorias.map((categoria) => (
                            <div key={categoria.id_categoria} className="p-6 bg-white shadow-md rounded-lg">
                                <h3 className="text-xl font-bold text-yellow-600">{categoria.nombre}</h3>
                                <p className="text-gray-700">Descripción: {categoria.descripcion}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </>
    );
};

export default Categorias;
