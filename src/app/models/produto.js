const Sequelize = require("sequelize");
const sequelize = require("../../config/database");

const Produto = sequelize.define("produtos", {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Nome do produto é obrigatório"
      }
    }
  },
  valor: {
    type: Sequelize.DOUBLE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Valor é obrigatório"
      }
    }
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Descricao é Obrigatória"
      }
    }
  }
});

module.exports = Produto;
