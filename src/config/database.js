const Sequelize = require("sequelize");

const sequelize = new Sequelize("crud", "canivet", "nice0rock", {
  host: "localhost",
  dialect: "postgres"
});

module.exports = sequelize;
