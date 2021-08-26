const { Sequelize } = require("sequelize");

const db = new Sequelize(
  process.env.DATABASE_URL ||
    `postgres://postgres:${encodeURIComponent(
      process.env.PASS
    )}@localhost:5432/tasks`,
  { 
      dialect: "postgres",
      ssl: process.env.ENVIRONMENT === 'production'
  },

);

module.exports = db;
