const express = require('express');
const modoPagoController = require('../controllers/modoPagoController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// Rutas protegidas
router.get('/', authMiddleware, roleMiddleware(['Empleado', 'Administrador', 'Gerente']), modoPagoController.getAll);
router.get('/:id', authMiddleware, roleMiddleware(['Empleado', 'Administrador', 'Gerente']), modoPagoController.getById);
router.post('/', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), modoPagoController.create);
router.put('/:id', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), modoPagoController.update);
router.delete('/:id', authMiddleware, roleMiddleware(['Administrador', 'Gerente']), modoPagoController.delete);

module.exports = router;
