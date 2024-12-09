const app = require('./src/config/server');

// Importar rutas



const clienteRoutes = require('./src/routes/clienteRoutes');
const productoRoutes = require('./src/routes/productoRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');
const authRoutes = require('./src/routes/authRoutes');
const ventaRoutes = require('./src/routes/ventaRoutes');
const modoPagoRoutes = require('./src/routes/modoPagoRoutes');
const facturaRoutes = require('./src/routes/facturaRoutes');
const detalleRoutes = require('./src/routes/detalleRoutes');
const loginRoutes = require('./src/routes/loginRoutes');


app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

// Usar las rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/ventas', ventaRoutes);
app.use('/api/modo-pago', modoPagoRoutes);
app.use('/api/facturas', facturaRoutes);
app.use('/api/detalles', detalleRoutes);
app.use('/api/login', loginRoutes);

app.use('/api/auth', authRoutes);

module.exports = app;
