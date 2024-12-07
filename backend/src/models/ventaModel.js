const db = require('../config/db');

const Venta = {
    createFactura: (data, callback) => {
        const query = `INSERT INTO FACTURA (id_cliente, fecha, num_pago) VALUES (?, ?, ?)`;
        db.run(query, [data.id_cliente, data.fecha, data.num_pago], function (err) {
            callback(err, this.lastID); // Retorna el ID de la nueva factura
        });
    },
    createDetalle: (data, callback) => {
        const query = `INSERT INTO DETALLE (id_factura, id_producto, cantidad, precio) VALUES (?, ?, ?, ?)`;
        db.run(query, [data.id_factura, data.id_producto, data.cantidad, data.precio], function (err) {
            callback(err);
        });
    },
    getFacturaById: (id_factura, callback) => {
        const query = `
            SELECT f.num_factura, f.fecha, c.nombre || ' ' || c.apellido AS cliente, c.direccion, p.nombre AS producto,
                   d.cantidad, d.precio, (d.cantidad * d.precio) AS subtotal
            FROM FACTURA f
            JOIN CLIENTE c ON f.id_cliente = c.id_cliente
            JOIN DETALLE d ON f.num_factura = d.id_factura
            JOIN PRODUCTO p ON d.id_producto = p.id_producto
            WHERE f.num_factura = ?
        `;
        db.all(query, [id_factura], (err, rows) => {
            callback(err, rows);
        });
    },
    updateStock: (id_producto, cantidad, callback) => {
        const query = `UPDATE PRODUCTO SET stock = stock - ? WHERE id_producto = ?`;
        db.run(query, [cantidad, id_producto], function (err) {
            callback(err, this.changes);
        });
    },
};

module.exports = Venta;
