const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    {
        dialect: "sqlite",
        storage: "./src/config/database.sqlite",
        logging: false,
    }
)

sequelize.authenticate().then(() => {
    console.log("database conncation successfully");
}).catch((e) => {
    console.log("database conncation field", e.message);
});

module.exports = sequelize;