const db = require('../config/db');

const User = {
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM LOGIN WHERE username = ?';
        db.get(query, [username], (err, row) => {
            callback(err, row);
        });
    },
    create: (data, callback) => {
        const query = 'INSERT INTO LOGIN (username, password, rol) VALUES (?, ?, ?)';
        db.run(query, [data.username, data.password, data.rol], function (err) {
            callback(err, this.lastID);
        });
    },
};

module.exports = User;
