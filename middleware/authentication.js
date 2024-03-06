const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); 
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    const message = error instanceof jwt.JsonWebTokenError ? 'Invalid token' : 'Token verification failed';
    return res.status(401).json({ message });
  }
};