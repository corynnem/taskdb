const { Employee } = require('../models');
const authenticate = require('./authenticate');

const validate = authenticate(Employee, 'employee');

module.exports = validate;
