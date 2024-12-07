const express = require('express');
const productoController = require('../controllers/productoController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Rutas protegidas
router.get('/', authMiddleware, productoController.getAll); // Todos los roles pueden leer
router.get('/:id', authMiddleware, productoController.getById); // Todos los roles pueden leer detalles
router.post('/', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), productoController.create); // Admin/Gerente pueden añadir productos
router.put('/:id', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), productoController.update); // Admin/Gerente pueden modificar productos
router.delete('/:id', authMiddleware, roleMiddleware(['Administrador','Gerente']), productoController.delete); // Solo Gerente puede eliminar productos

module.exports = router;
