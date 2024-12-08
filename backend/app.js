const app = require('./src/config/server');

// Importar rutas



const clienteRoutes = require('./src/routes/clienteRoutes');
const productoRoutes = require('./src/routes/productoRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');
const authRoutes = require('./src/routes/authRoutes');
const ventaRoutes = require('./src/routes/ventaRoutes');
const modoPagoRoutes = require('./src/routes/modoPagoRoutes');


app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

// Usar las rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/modo-pago', modoPagoRoutes);

app.use('/api/auth', authRoutes);

module.exports = app;
