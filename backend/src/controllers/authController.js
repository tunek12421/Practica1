const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const authController = {
    login: (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Se requiere username y password' });
        }

        User.findByUsername(username, async (err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!user) return res.status(401).json({ error: 'Credenciales incorrectas' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ error: 'Credenciales incorrectas' });

            const token = jwt.sign({ id: user.id_usuario, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    },
    register: async (req, res) => {
        const { username, password, rol } = req.body;
        if (!username || !password || !rol) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            User.create({ username, password: hashedPassword, rol }, (err, id) => {
                if (err) {
                    if (err.code === 'SQLITE_CONSTRAINT') {
                        return res.status(400).json({ error: 'El username ya está en uso' });
                    }
                    return res.status(500).json({ error: err.message });
                }
                res.status(201).json({ id });
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = authController;
