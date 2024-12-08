import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ClienteSelector from '../components/ClienteSelector';
import ProductoSelector from '../components/ProductoSelector';
import ModoPagoSelector from '../components/ModoPagoSelector';
import ResumenVenta from '../components/ResumenVenta';

const Ventas = () => {
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [modosPago, setModosPago] = useState([]); // Para almacenar los modos de pago disponibles
    const [venta, setVenta] = useState({
        id_cliente: '',
        fecha: new Date().toISOString().slice(0, 10),
        num_pago: '',
        productos: [],
    });
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [clientesResponse, productosResponse, modosPagoResponse] = await Promise.all([
                    api.get('/clientes'),
                    api.get('/productos'),
                    api.get('/modo-pago'), // Obtiene los modos de pago
                ]);
                setClientes(clientesResponse.data);
                setProductos(productosResponse.data);
                setModosPago(modosPagoResponse.data); // Almacena los modos de pago
            } catch (error) {
                console.error('Error al cargar datos:', error);
                setError('Error al cargar datos. Intenta nuevamente.');
            }
        };
        fetchData();
    }, []);

    const handleVenta = async () => {
        try {
            const { id_cliente, fecha, num_pago, productos } = venta;

            if (!id_cliente || !fecha || !num_pago || productos.length === 0) {
                setError('Debe completar todos los campos obligatorios.');
                return;
            }

            const response = await api.post('/ventas', { id_cliente, fecha, num_pago, productos });
            const idFactura = response.data.id_factura;

            setMensaje(
                <>
                    Venta registrada exitosamente. ID Factura: {idFactura}.{' '}
                    <button
                        onClick={() => handleDownloadFactura(idFactura)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Descargar Factura
                    </button>
                </>
            );
            setVenta({ id_cliente: '', fecha: new Date().toISOString().slice(0, 10), num_pago: '', productos: [] });
            setError('');
        } catch (error) {
            setError('Error al registrar la venta.');
            console.error('Error:', error);
        }
    };

    const handleDownloadFactura = async (idFactura) => {
        try {
            const response = await api.get(`/ventas/${idFactura}`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `factura_${idFactura}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Error al descargar la factura:', error);
            setError('Error al descargar la factura. Intenta nuevamente.');
        }
    };

    return (
        <main className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold text-blue-600 mb-6 text-center">Registrar Nueva Venta</h2>

            <ClienteSelector 
                clientes={clientes} 
                venta={venta} 
                setVenta={setVenta} 
            />

            <ModoPagoSelector 
                modosPago={modosPago} 
                venta={venta} 
                setVenta={setVenta} 
            />

            <ProductoSelector 
                productos={productos} 
                venta={venta} 
                setVenta={setVenta} 
                setError={setError} 
            />

            <ResumenVenta 
                venta={venta} 
                handleVenta={handleVenta} 
            />

            {mensaje && <p className="mt-4 text-green-600 text-center">{mensaje}</p>}
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </main>
    );
};

export default Ventas;
