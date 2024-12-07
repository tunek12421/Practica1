const db = require('../config/db');

const Cliente = {
    getAll: (callback) => {
        const query = 'SELECT * FROM Cliente';
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM Cliente WHERE id_cliente = ?';
        db.get(query, [id], (err, row) => {
            callback(err, row);
        });
    },
    create: (data, callback) => {
        const query = `INSERT INTO Cliente (nombre, apellido, direccion, fecha_nacimiento, telefono, email)
                       VALUES (?, ?, ?, ?, ?, ?)`;
        db.run(
            query,
            [data.nombre, data.apellido, data.direccion, data.fecha_nacimiento, data.telefono, data.email],
            function (err) {
                callback(err, this.lastID);
            }
        );
    },
    update: (id, data, callback) => {
        const query = `UPDATE Cliente SET 
                        nombre = ?, 
                        apellido = ?, 
                        direccion = ?, 
                        fecha_nacimiento = ?, 
                        telefono = ?, 
                        email = ?
                       WHERE id_cliente = ?`;
        db.run(
            query,
            [data.nombre, data.apellido, data.direccion, data.fecha_nacimiento, data.telefono, data.email, id],
            function (err) {
                callback(err, this.changes);
            }
        );
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Cliente WHERE id_cliente = ?';
        db.run(query, [id], function (err) {
            callback(err, this.changes);
        });
    },
};

module.exports = Cliente;
