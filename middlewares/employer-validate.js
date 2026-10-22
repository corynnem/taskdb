const { Employer } = require('../models');
const authenticate = require('./authenticate');

const validateEmployer = authenticate(Employer, 'employer');

module.exports = validateEmployer;
