const express = require('express');
const clienteController = require('../controllers/clienteController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Rutas protegidas
router.get('/', authMiddleware, clienteController.getAll); // Todos los roles pueden leer
router.get('/:id', authMiddleware, clienteController.getById); // Todos los roles pueden leer detalles
router.post('/', authMiddleware, roleMiddleware(['Empleado', 'Administrador', 'Gerente']), clienteController.create); // Empleados pueden añadir clientes
router.put('/:id', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), clienteController.update); // Admin/Gerente pueden modificar
router.delete('/:id', authMiddleware, roleMiddleware(['Administrador','Gerente']), clienteController.delete); // Solo Gerente puede eliminar

module.exports = router;
