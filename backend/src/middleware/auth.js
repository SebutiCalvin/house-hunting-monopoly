const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin required' });
  next();
};

exports.isAgentOrAdmin = (req, res, next) => {
  if (req.user.role !== 'admin' && req.user.role !== 'agent') {
    return res.status(403).json({ message: 'Agent or Admin required' });
  }
  next();
};
