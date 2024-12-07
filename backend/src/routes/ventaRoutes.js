const express = require('express');
const ventaController = require('../controllers/ventaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Rutas protegidas
router.post('/', authMiddleware, roleMiddleware(['Empleado', 'Administrador', 'Gerente']), ventaController.create); // Registrar venta
router.get('/:id', authMiddleware, roleMiddleware(['Empleado', 'Administrador', 'Gerente']), ventaController.getFactura); // Generar factura en PDF

module.exports = router;
