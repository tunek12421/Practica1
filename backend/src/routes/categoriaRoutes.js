const express = require('express');
const categoriaController = require('../controllers/categoriaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Rutas protegidas
router.get('/', authMiddleware, categoriaController.getAll); // Todos los roles pueden leer
router.get('/:id', authMiddleware, categoriaController.getById); // Todos los roles pueden leer detalles
router.post('/', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), categoriaController.create); // Admin/Gerente pueden añadir categorías
router.put('/:id', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), categoriaController.update); // Admin/Gerente pueden modificar categorías
router.delete('/:id', authMiddleware, roleMiddleware(['Administrador','Gerente']), categoriaController.delete); // Solo Gerente puede eliminar categorías

module.exports = router;
