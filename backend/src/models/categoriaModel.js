const db = require('../config/db');

const Categoria = {
    getAll: (callback) => {
        const query = 'SELECT * FROM Categoria';
        db.all(query, [], (err, rows) => {
            callback(err, rows);
        });
    },
    getById: (id, callback) => {
        const query = 'SELECT * FROM Categoria WHERE id_categoria = ?';
        db.get(query, [id], (err, row) => {
            callback(err, row);
        });
    },
    create: (data, callback) => {
        const query = 'INSERT INTO Categoria (nombre, descripcion) VALUES (?, ?)';
        db.run(query, [data.nombre, data.descripcion], function (err) {
            callback(err, this.lastID);
        });
    },
    update: (id, data, callback) => {
        const query = `UPDATE Categoria SET 
                        nombre = ?, 
                        descripcion = ? 
                       WHERE id_categoria = ?`;
        db.run(query, [data.nombre, data.descripcion, id], function (err) {
            callback(err, this.changes);
        });
    },
    delete: (id, callback) => {
        const query = 'DELETE FROM Categoria WHERE id_categoria = ?';
        db.run(query, [id], function (err) {
            callback(err, this.changes);
        });
    },
};

module.exports = Categoria;
