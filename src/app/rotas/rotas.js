var Produto = require("../models/produto");

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
    .post(function(req, resp) {
      var produto = new Produto();
      produto.nome = req.body.nome;
      produto.preco = req.body.preco;
      produto.descricao = req.body.descricao;

      produto.save(function(err) {
        if (err) {
          resp.send("Erro ao salvar produto... : " + err);
        }

        resp.json({ message: "Produto cadastrado com sucesso!!!" });
      });
    })

    .get(function(req, resp) {
      Produto.find(function(err, produtos) {
        if (err) resp.send("Erro ao listar os produtos." + err);
        resp.json(produtos);
      });
    });

  app
    .route("/produtos/:produto_id")

    .get(function(req, resp) {
      Produto.findById(req.params.produto_id, function(err, produto) {
        if (err) resp.send("Id não encontrado" + err);
        resp.json(produto);
      });
    })

    .put(function(req, resp) {
      Produto.findById(req.params.produto_id, function(err, produto) {
        if (err) resp.send("Id do produto não encontrado " + err);

        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;

        produto.save(function(err) {
          if (err) resp.send("Erro ao atualizar o produto " + err);

          resp.json({ message: "Produto Atualizado com sucesso" });
        });
      });
    })

    .delete(function(req, resp) {
      Produto.remove(
        {
          _id: req.params.produto_id
        },
        function(err) {
          if (err) resp.send("Id do produto não encontrado " + err);

          resp.json({ message: "Produto excluido com sucesso!" });
        }
      );
    });
};
