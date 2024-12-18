const Detalle = require('../models/detalleModel');

const detalleController = {
    create: (req, res) => {
        const { id_factura, id_producto, cantidad, precio } = req.body;

        if (!id_factura || !id_producto || !cantidad || !precio) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        Detalle.create({ id_factura, id_producto, cantidad, precio }, (err, num_detalle) => {
            if (err) return res.status(500).json({ error: 'Error al crear el detalle' });
            res.status(201).json({ message: 'Detalle creado exitosamente', num_detalle });
        });
    },

    getAll: (req, res) => {
        Detalle.getAll((err, rows) => {
            if (err) return res.status(500).json({ error: 'Error al obtener detalles' });
            res.status(200).json(rows);
        });
    },

    getAllByFactura: (req, res) => {
        const { id_factura } = req.params;

        Detalle.getAllByFactura(id_factura, (err, rows) => {
            if (err) return res.status(500).json({ error: 'Error al obtener detalles' });
            res.status(200).json(rows);
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { id_producto, cantidad, precio } = req.body;

        if (!id_producto || !cantidad || !precio) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        Detalle.update(id, { id_producto, cantidad, precio }, (err) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar el detalle' });
            res.status(200).json({ message: 'Detalle actualizado exitosamente' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;

        Detalle.delete(id, (err) => {
            if (err) return res.status(500).json({ error: 'Error al eliminar el detalle' });
            res.status(200).json({ message: 'Detalle eliminado exitosamente' });
        });
    },
};

module.exports = detalleController;
