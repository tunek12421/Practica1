const db = require('../config/db');

const Login = {
    create: (data, callback) => {
        const query = `
            INSERT INTO LOGIN (username, password, rol)
            VALUES (?, ?, ?)
        `;
        db.run(query, [data.username, data.password, data.rol], function (err) {
            callback(err, this?.lastID);
        });
    },

    getAll: (callback) => {
        const query = `
            SELECT id_usuario, username, rol
            FROM LOGIN
        `;
        db.all(query, [], callback);
    },

    getById: (id, callback) => {
        const query = `
            SELECT id_usuario, username, rol
            FROM LOGIN
            WHERE id_usuario = ?
        `;
        db.get(query, [id], callback);
    },

    update: (id, data, callback) => {
        const query = `
            UPDATE LOGIN
            SET username = ?, password = ?, rol = ?
            WHERE id_usuario = ?
        `;
        db.run(query, [data.username, data.password, data.rol, id], callback);
    },

    delete: (id, callback) => {
        const query = `
            DELETE FROM LOGIN
            WHERE id_usuario = ?
        `;
        db.run(query, [id], callback);
    },
};

module.exports = Login;
