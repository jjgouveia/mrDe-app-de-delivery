const { validateToken } = require('../src/utils/jwtEngine');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Token is required' });
    try {
      const data = validateToken(authorization);
      req.user = data;
      next();
    } catch (error) {
      next(error);
    }
  };