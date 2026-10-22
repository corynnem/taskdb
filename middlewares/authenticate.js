const jwt = require('jsonwebtoken');

// Builds a middleware that only lets through tokens issued for `role`
// whose user still exists in `Model`.
const authenticate = (Model, role) => async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({
      message: 'missing authorization token'
    });
  }

  let payload;
  try {
    payload = jwt.verify(authorization.split(' ')[1], process.env.JWT_SECRET);
  } catch (e) {
    return res.status(401).json({
      message: 'invalid or expired token'
    });
  }

  if (payload.role !== role) {
    return res.status(403).json({
      message: 'Not allowed'
    });
  }

  let user;
  try {
    user = await Model.findOne({
      where: {
        id: payload.id
      }
    });
  } catch (e) {
    return next(e);
  }

  if (!user) {
    return res.status(401).json({
      message: 'user no longer exists'
    });
  }

  req.user = user;
  next();
}

module.exports = authenticate;
