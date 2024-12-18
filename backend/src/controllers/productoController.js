const Producto = require('../models/productoModel');

const productoController = {
    getAll: (req, res) => {
        Producto.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },
    getById: (req, res) => {
        const { id } = req.params;
        Producto.getById(id, (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ error: 'Producto no encontrado' });
            res.json(row);
        });
    },
    create: (req, res) => {
        const { nombre, precio, stock, id_categoria } = req.body;
        if (!nombre || precio == null || stock == null || !id_categoria) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        Producto.create({ nombre, precio, stock, id_categoria }, (err, id) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id });
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const { nombre, precio, stock, id_categoria } = req.body;
        if (!nombre || precio == null || stock == null || !id_categoria) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }
        Producto.update(id, { nombre, precio, stock, id_categoria }, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ error: 'Producto no encontrado' });
            res.json({ message: 'Producto actualizado exitosamente' });
        });
    },
    delete: (req, res) => {
        const { id } = req.params;
        Producto.delete(id, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ error: 'Producto no encontrado' });
            res.json({ message: 'Producto eliminado exitosamente' });
        });
    },
};

module.exports = productoController;