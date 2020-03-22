var express = require("express");
var app = express();

const sequelize = require("./database");

sequelize
  .authenticate()
  .then(() => {
    console.log("Sequeilize Bombando...");
  })
  .catch(err => {
    console.error("Sequelize não conseguiu conectar ao banco...", err);
  });

var bodyParser = require("body-parser");

// var mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/node-crud-api", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const rotas = require("../app/rotas/rotas");
rotas(app);

module.exports = app;
