const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    if (decoded.rol !== 1) {
      return res.status(403).json({ error: 'Acceso denegado: solo administradores' });
    }
    req.user = decoded; // guarda el usuario decodificado por si se necesita más adelante
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
