const app = require('./app');
require('dotenv').config();


// Puerto del servidor
const PORT = process.env.PORT || 3001;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

console.log('JWT_SECRET desde .env:', process.env.JWT_SECRET);
