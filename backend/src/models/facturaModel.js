const db = require('../config/db');

const Factura = {
    create: (data, callback) => {
        const query = `INSERT INTO FACTURA (id_cliente, fecha, num_pago) VALUES (?, ?, ?)`;
        db.run(query, [data.id_cliente, data.fecha, data.num_pago], function (err) {
            callback(err, this.lastID); // Devuelve el ID de la nueva factura
        });
    },
    getById: (num_factura, callback) => {
        const query = `
            SELECT f.num_factura, f.fecha, c.nombre || ' ' || c.apellido AS cliente, mp.nombre AS modo_pago
            FROM FACTURA f
            JOIN CLIENTE c ON f.id_cliente = c.id_cliente
            JOIN MODO_PAGO mp ON f.num_pago = mp.num_pago
            WHERE f.num_factura = ?`;
        db.get(query, [num_factura], (err, row) => {
            callback(err, row);
        });
    },
    getAll: (callback) => {
        const query = `
            SELECT f.num_factura, f.fecha, c.nombre || ' ' || c.apellido AS cliente, mp.nombre AS modo_pago
            FROM FACTURA f
            JOIN CLIENTE c ON f.id_cliente = c.id_cliente
            JOIN MODO_PAGO mp ON f.num_pago = mp.num_pago`;
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    },
    update: (num_factura, data, callback) => {
        const query = `UPDATE FACTURA SET id_cliente = ?, fecha = ?, num_pago = ? WHERE num_factura = ?`;
        db.run(query, [data.id_cliente, data.fecha, data.num_pago, num_factura], function (err) {
            callback(err, this.changes); // Devuelve el número de filas afectadas
        });
    },
    delete: (num_factura, callback) => {
        const query = `DELETE FROM FACTURA WHERE num_factura = ?`;
        db.run(query, [num_factura], function (err) {
            callback(err, this.changes); // Devuelve el número de filas eliminadas
        });
    },
};

module.exports = Factura;
