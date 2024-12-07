const app = require('./config/server');

// Importar rutas
const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const authRoutes = require('./routes/authRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

// Usar las rutas
app.use('/api/clientes', clienteRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/ventas', ventaRoutes);

app.use('/api/auth', authRoutes);

module.exports = app;
