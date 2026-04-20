const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",

    logging: false
  }
);

// Database connection check
sequelize
  .authenticate()
  .then(() => {
    console.log("MySQL Database Connected Successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to database:", error);
  });

module.exports = sequelize;