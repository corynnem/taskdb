const { Sequelize } = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL || `postgres://postgres:${encodeURIComponent(process.env.PASS)}@localhost:5432/tasks`)

module.exports = db