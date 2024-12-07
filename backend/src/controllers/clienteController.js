const Cliente = require('../models/clienteModel');

const clienteController = {
    getAll: (req, res) => {
        Cliente.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },
    getById: (req, res) => {
        const { id } = req.params;
        Cliente.getById(id, (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ error: 'Cliente no encontrado' });
            res.json(row);
        });
    },
    create: (req, res) => {
        const { nombre, apellido, direccion, fecha_nacimiento, telefono, email } = req.body;
        if (!nombre || !apellido || !direccion || !fecha_nacimiento || !telefono || !email) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        Cliente.create({ nombre, apellido, direccion, fecha_nacimiento, telefono, email }, (err, id) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id });
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, direccion, fecha_nacimiento, telefono, email } = req.body;
        if (!nombre || !apellido || !direccion || !fecha_nacimiento || !telefono || !email) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        Cliente.update(id, { nombre, apellido, direccion, fecha_nacimiento, telefono, email }, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
            res.json({ message: 'Cliente actualizado exitosamente' });
        });
    },
    delete: (req, res) => {
        const { id } = req.params;
        Cliente.delete(id, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ error: 'Cliente no encontrado' });
            res.json({ message: 'Cliente eliminado exitosamente' });
        });
    },
};

module.exports = clienteController;
