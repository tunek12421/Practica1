const ModoPago = require('../models/modoPagoModel');

const modoPagoController = {
    getAll: (req, res) => {
        ModoPago.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        ModoPago.getById(id, (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ error: 'Modo de pago no encontrado' });
            res.json(row);
        });
    },

    create: (req, res) => {
        const { nombre, otros_detalles } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
        }

        ModoPago.create({ nombre, otros_detalles }, (err, id) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Modo de pago creado', num_pago: id });
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { nombre, otros_detalles } = req.body;

        if (!nombre) {
            return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
        }

        ModoPago.update(id, { nombre, otros_detalles }, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ error: 'Modo de pago no encontrado' });
            res.json({ message: 'Modo de pago actualizado exitosamente' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        ModoPago.delete(id, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ error: 'Modo de pago no encontrado' });
            res.json({ message: 'Modo de pago eliminado exitosamente' });
        });
    },
};

module.exports = modoPagoController;
