const express = require('express');
const facturaController = require('../controllers/facturaController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Rutas protegidas
router.post('/', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), facturaController.create);
router.get('/:id', authMiddleware, roleMiddleware(['Administrador', 'Gerente', 'Empleado']), facturaController.getById);
router.get('/', authMiddleware, roleMiddleware(['Administrador', 'Gerente', 'Empleado']), facturaController.getAll);
router.put('/:id', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), facturaController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), facturaController.delete);

module.exports = router;
