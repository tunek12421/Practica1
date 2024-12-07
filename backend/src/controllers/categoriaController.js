const Categoria = require('../models/categoriaModel');

const categoriaController = {
    getAll: (req, res) => {
        Categoria.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        });
    },
    getById: (req, res) => {
        const { id } = req.params;
        Categoria.getById(id, (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ error: 'Categoría no encontrada' });
            res.json(row);
        });
    },
    create: (req, res) => {
        const { nombre, descripcion } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
        }
        Categoria.create({ nombre, descripcion }, (err, id) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id });
        });
    },
    update: (req, res) => {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El campo "nombre" es obligatorio' });
        }
        Categoria.update(id, { nombre, descripcion }, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
            res.json({ message: 'Categoría actualizada exitosamente' });
        });
    },
    delete: (req, res) => {
        const { id } = req.params;
        Categoria.delete(id, (err, changes) => {
            if (err) return res.status(500).json({ error: err.message });
            if (changes === 0) return res.status(404).json({ error: 'Categoría no encontrada' });
            res.json({ message: 'Categoría eliminada exitosamente' });
        });
    },
};

module.exports = categoriaController;
