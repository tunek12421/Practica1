const express = require('express');
const detalleController = require('../controllers/detalleController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post(
    '/',
    authMiddleware,
    roleMiddleware(['Empleado', 'Administrador', 'Gerente']),
    detalleController.create
);

router.get(
    '/',
    authMiddleware,
    roleMiddleware(['Empleado', 'Administrador', 'Gerente']),
    detalleController.getAll
);

router.get(
    '/:id_factura',
    authMiddleware,
    roleMiddleware(['Empleado', 'Administrador', 'Gerente']),
    detalleController.getAllByFactura
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(['Administrador', 'Gerente']),
    detalleController.update
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['Administrador', 'Gerente']),
    detalleController.delete
);

module.exports = router;
