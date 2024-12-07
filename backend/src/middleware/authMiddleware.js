const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agrega la información del usuario al request
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;
