const { Sequelize } = require("sequelize");

// Render provides DATABASE_URL and requires SSL. The local fallback is a
// plain Postgres install, which usually has no SSL.
const isHosted = Boolean(process.env.DATABASE_URL);

const db = new Sequelize(
  process.env.DATABASE_URL ||
    `postgres://postgres:${encodeURIComponent(
      process.env.PASS
    )}@localhost:5432/tasks`,
  {
      dialect: "postgres",
      dialectOptions: isHosted
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            }
          }
        : {}
  }
);

module.exports = db;
