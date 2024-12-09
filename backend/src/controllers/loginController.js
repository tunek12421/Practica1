const Login = require('../models/loginModel');

const loginController = {
    create: (req, res) => {
        const { username, password, rol } = req.body;

        if (!username || !password || !rol) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        Login.create({ username, password, rol }, (err, id_usuario) => {
            if (err) {
                if (err.code === 'SQLITE_CONSTRAINT') {
                    return res.status(409).json({ error: 'El nombre de usuario ya existe' });
                }
                return res.status(500).json({ error: 'Error al crear el usuario' });
            }
            res.status(201).json({ message: 'Usuario creado exitosamente', id_usuario });
        });
    },

    getAll: (req, res) => {
        Login.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
            res.status(200).json(rows);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;

        Login.getById(id, (err, row) => {
            if (err) return res.status(500).json({ error: 'Error al obtener el usuario' });
            if (!row) return res.status(404).json({ error: 'Usuario no encontrado' });
            res.status(200).json(row);
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { username, password, rol } = req.body;

        if (!username || !password || !rol) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        Login.update(id, { username, password, rol }, (err) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar el usuario' });
            res.status(200).json({ message: 'Usuario actualizado exitosamente' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;

        Login.delete(id, (err) => {
            if (err) return res.status(500).json({ error: 'Error al eliminar el usuario' });
            res.status(200).json({ message: 'Usuario eliminado exitosamente' });
        });
    },
};

module.exports = loginController;
