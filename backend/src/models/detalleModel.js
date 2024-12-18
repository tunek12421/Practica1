const db = require('../config/db');

const Detalle = {
    create: (data, callback) => {
        const query = `
            INSERT INTO DETALLE (id_factura, id_producto, cantidad, precio)
            VALUES (?, ?, ?, ?)
        `;
        db.run(query, [data.id_factura, data.id_producto, data.cantidad, data.precio], function (err) {
            callback(err, this?.lastID);
        });
    },

    getAll: (callback) => {
        const query = `
            SELECT d.num_detalle, d.cantidad, d.precio, p.nombre AS producto, d.id_factura
            FROM DETALLE d
            JOIN PRODUCTO p ON d.id_producto = p.id_producto
        `;
        db.all(query, [], callback);
    },

    getAllByFactura: (id_factura, callback) => {
        const query = `
            SELECT d.num_detalle, d.cantidad, d.precio, p.nombre AS producto
            FROM DETALLE d
            JOIN PRODUCTO p ON d.id_producto = p.id_producto
            WHERE d.id_factura = ?
        `;
        db.all(query, [id_factura], callback);
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE DETALLE
            SET id_producto = ?, cantidad = ?, precio = ?
            WHERE num_detalle = ?
        `;
        db.run(query, [data.id_producto, data.cantidad, data.precio, id], callback);
    },

    delete: (id, callback) => {
        const query = `DELETE FROM DETALLE WHERE num_detalle = ?`;
        db.run(query, [id], callback);
    },

    deleteByFactura: (id_factura, callback) => {
        const query = `DELETE FROM DETALLE WHERE id_factura = ?`;
        db.run(query, [id_factura], callback);
    },
};

module.exports = Detalle;
