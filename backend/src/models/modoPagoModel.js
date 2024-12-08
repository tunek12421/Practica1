const db = require('../config/db');

const ModoPago = {
    getAll: (callback) => {
        const query = `SELECT * FROM MODO_PAGO`;
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    },

    getById: (num_pago, callback) => {
        const query = `SELECT * FROM MODO_PAGO WHERE num_pago = ?`;
        db.get(query, [num_pago], (err, row) => {
            callback(err, row);
        });
    },

    create: (data, callback) => {
        const query = `INSERT INTO MODO_PAGO (nombre, otros_detalles) VALUES (?, ?)`;
        db.run(query, [data.nombre, data.otros_detalles], function (err) {
            callback(err, this.lastID); // Devuelve el ID generado
        });
    },

    update: (num_pago, data, callback) => {
        const query = `UPDATE MODO_PAGO SET nombre = ?, otros_detalles = ? WHERE num_pago = ?`;
        db.run(query, [data.nombre, data.otros_detalles, num_pago], function (err) {
            callback(err, this.changes); // Indica cuántas filas fueron actualizadas
        });
    },

    delete: (num_pago, callback) => {
        const query = `DELETE FROM MODO_PAGO WHERE num_pago = ?`;
        db.run(query, [num_pago], function (err) {
            callback(err, this.changes); // Indica cuántas filas fueron eliminadas
        });
    },
};

module.exports = ModoPago;
