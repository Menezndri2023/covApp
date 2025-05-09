const jwt = require('jsonwebtoken');
const SECRET = 'your_secret_key';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ message: 'Token invalide' });
  }
};

module.exports = authMiddleware;
