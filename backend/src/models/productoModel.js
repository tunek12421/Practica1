const db = require('../config/db');

const Producto = {
    getAll: (callback) => {
        const query = `
            SELECT p.*, c.nombre AS categoria_nombre 
            FROM Producto p
            JOIN Categoria c ON p.id_categoria = c.id_categoria
        `;
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    },
    getById: (id, callback) => {
        const query = `
            SELECT p.*, c.nombre AS categoria_nombre 
            FROM Producto p
            JOIN Categoria c ON p.id_categoria = c.id_categoria
            WHERE p.id_producto = ?
        `;
        db.get(query, [id], (err, row) => {
            callback(err, row);
        });
    },
    create: (data, callback) => {
        const query = `
            INSERT INTO Producto (nombre, precio, stock, id_categoria)
            VALUES (?, ?, ?, ?)
        `;
        db.run(
            query,
            [data.nombre, data.precio, data.stock, data.id_categoria],
            function (err) {
                callback(err, this.lastID);
            }
        );
    },
    update: (id, data, callback) => {
        const query = `
            UPDATE Producto SET 
                nombre = ?, 
                precio = ?, 
                stock = ?, 
                id_categoria = ?
            WHERE id_producto = ?
        `;
        db.run(
            query,
            [data.nombre, data.precio, data.stock, data.id_categoria, id],
            function (err) {
                callback(err, this.changes);
            }
        );
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Producto WHERE id_producto = ?';
        db.run(query, [id], function (err) {
            callback(err, this.changes);
        });
    },
};

module.exports = Producto;
