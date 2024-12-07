const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        const { rol } = req.user;
        if (!requiredRoles.includes(rol)) {
            return res.status(403).json({ error: 'No tienes permisos para acceder a este recurso' });
        }
        next();
    };
};

module.exports = roleMiddleware;
