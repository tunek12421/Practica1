const express = require('express');
const loginController = require('../controllers/loginController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.post(
    '/',
    authMiddleware,
    roleMiddleware(['Administrador', 'Gerente']),
    loginController.create
);

router.get(
    '/',
    authMiddleware,
    roleMiddleware(['Administrador', 'Gerente']),
    loginController.getAll
);

router.get(
    '/:id',
    authMiddleware,
    roleMiddleware(['Administrador', 'Gerente']),
    loginController.getById
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware(['Administrador', 'Gerente']),
    loginController.update
);

router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware(['Administrador', 'Gerente']),
    loginController.delete
);

module.exports = router;
