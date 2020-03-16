var Produto = require("../models/produto");

class ProdutoController {
  lista() {
    return (req, resp) => {
      Produto.find((err, produtos) => {
        if (err)
          return resp.status(400).send(`Erro ao listar os produtos. ${err}`);
        resp.status(200).json(produtos);
      });
    };
  }

  cadastra() {
    return (req, resp) => {
      var produto = new Produto();
      //TODO: Assert fields
      produto.nome = req.body.nome;
      produto.preco = req.body.preco;
      produto.descricao = req.body.descricao;

      produto.save(err => {
        if (err) return resp.status(400).send(`Erro ao salvar produto: ${err}`);
        resp.status(201).json({ message: "Produto cadastrado com sucesso!!!" });
      });
    };
  }

  listaPorId() {
    return (req, resp) => {
      Produto.findById(req.params.produto_id, (err, produto) => {
        if (err) return resp.status(400).send(`Produto não encontrado. ${err}`);
        resp.status(200).json(produto);
      });
    };
  }

  atualiza() {
    return (req, resp) => {
      Produto.findById(req.params.produto_id, (err, produto) => {
        if (err) return resp.status(400).send(`Produto não encontrado. ${err}`);
        //TODO: Criar Assert dos params
        produto.nome = req.body.nome;
        produto.preco = req.body.preco;
        produto.descricao = req.body.descricao;

        produto.save(err => {
          if (err)
            return resp.status(400).send(`Erro ao atualizar o produto. ${err}`);
          resp.status(200).json({ message: "Produto Atualizado com sucesso" });
        });
      });
    };
  }

  deleta() {
    return (req, resp) => {
      Produto.remove({ _id: req.params.produto_id }, err => {
        if (err) return resp.status(400).send(`Produto não encontrado. ${err}`);
        resp.status(200).json({ message: "Produto excluido com sucesso!" });
      });
    };
  }
}

module.exports = ProdutoController;
