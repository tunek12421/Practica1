const Factura = require('../models/facturaModel');

const facturaController = {
    create: (req, res) => {
        const { id_cliente, fecha, num_pago } = req.body;

        if (!id_cliente || !fecha || !num_pago) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        Factura.create({ id_cliente, fecha, num_pago }, (err, num_factura) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Factura creada exitosamente', num_factura });
        });
    },
    getById: (req, res) => {
        const { id } = req.params;

        Factura.getById(id, (err, factura) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!factura) return res.status(404).json({ error: 'Factura no encontrada' });
            res.json(factura);
        });
    },
    getAll: (req, res) => {
        Factura.getAll((err, facturas) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(facturas);
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const { id_cliente, fecha, num_pago } = req.body;

        if (!id_cliente || !fecha || !num_pago) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        Factura.update(id, { id_cliente, fecha, num_pago }, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ error: 'Factura no encontrada' });
            res.json({ message: 'Factura actualizada exitosamente' });
        });
    },
    delete: (req, res) => {
        const { id } = req.params;

        Factura.delete(id, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ error: 'Factura no encontrada' });
            res.json({ message: 'Factura eliminada exitosamente' });
        });
    },
};

module.exports = facturaController;
