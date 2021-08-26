const jwt = require('jsonwebtoken');
const { Employer } = require('../models');

const validateEmployer = (req, res, next) => {
  console.log(req.headers.authorization)
  if (req.method === 'OPTIONS') {
    return next();
  } else if (req.headers.authorization && req.headers.authorization.includes('Bearer')) {
    const { authorization } = req.headers;
    const payload = authorization ? jwt.verify(authorization.includes('Bearer') ? authorization.split(' ')[1] : authorization, process.env.JWT_SECRET): undefined;
    console.log(payload)
    if (payload) {
      Employer.findOne({
        where: {
          id: payload.id
        }
      })
      .then(user => {
        req.user = user;
        next();
      })
    } else {
      res.status(401).json({
        message: 'Not allowed'
      });
    }
  } else {
    res.status(401).json({
      message: 'No Employer Authorization'
    });
  }
}

module.exports = validateEmployer;