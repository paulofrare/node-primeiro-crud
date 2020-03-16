var Produto = require("../models/produto");

const ProdutoController = require("../controllers/produto-controller");
const produtoController = new ProdutoController();

module.exports = app => {
  app.use(function(req, resp, next) {
    console.log("Teste middleware... Algo está acontecendo aqui");
    next();
  });

  app.get("/", function(req, resp) {
    resp.json({ message: "Bem vindo a nossa rota!" });
  });

  app
    .route("/produtos")
    .post(produtoController.cadastra())
    .get(produtoController.lista());

  app
    .route("/produtos/:produto_id")
    .get(produtoController.listaPorId())
    .put(produtoController.atualiza())
    .delete(produtoController.deleta());
};
