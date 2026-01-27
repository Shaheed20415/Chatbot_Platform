const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: { message: 'No token', code: 401 } });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id || decoded.userId };

    next();
  } catch (err) {
    return res.status(401).json({
      error: { message: 'Invalid token', code: 401 }
    });
  }
};


// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ ok: false, message: 'Unauthorized' });
//   }

//   try {
//     req.user = jwt.verify(token, process.env.JWT_SECRET);
//     next();
//   } catch (err) {
//     res.status(401).json({ ok: false, message: 'Invalid token' });
//   }
// };