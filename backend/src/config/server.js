const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Configurar middleware
app.use(cors());
app.use(bodyParser.json());

// Exportar el servidor
module.exports = app;
