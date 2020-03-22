const Produto = require("../models/produto");

class ProdutoController {
  lista() {
    return async (req, resp) => {
      try {
        const prod = await Produto.findAll({
          attributes: ["id", "nome", "valor", "descricao"]
        });
        resp.status(200).json(prod);
      } catch (error) {
        return resp
          .status(400)
          .json({ message: `Erro ao listar os produtos. ${error}` });
      }

      // Produto.find((err, produtos) => {
      //   if (err)
      //     return resp.status(400).send(`Erro ao listar os produtos. ${err}`);
      //   resp.status(200).json(produtos);
      // });
    };
  }

  cadastra() {
    return async (req, resp) => {
      const { nome, valor, descricao } = req.body;
      try {
        await Produto.create({
          nome,
          valor,
          descricao
        });
        resp.status(201).json({ message: "Produto cadastrado com sucesso!!!" });
      } catch (error) {
        return resp
          .status(400)
          .json({ message: `Erro ao cadastrar o produto. ${error}` });
      }

      // var produto = new Produto();
      // //TODO: Assert fields
      // produto.nome = req.body.nome;
      // produto.preco = req.body.preco;
      // produto.descricao = req.body.descricao;

      // produto.save(err => {
      //   if (err) return resp.status(400).send(`Erro ao salvar produto: ${err}`);
      //   resp.status(201).json({ message: "Produto cadastrado com sucesso!!!" });
      // });
    };
  }

  listaPorId() {
    return async (req, resp) => {
      const { id } = req.params;
      try {
        const prod = await Produto.findAll({
          where: { id }
        });
        resp.status(200).json(prod);
      } catch (error) {
        return resp
          .status(400)
          .json({ message: `Erro ao listar o produto. ${error}` });
      }

      // return (req, resp) => {
      //   Produto.findById(req.params.produto_id, (err, produto) => {
      //     if (err) return resp.status(400).send(`Produto não encontrado. ${err}`);
      //     resp.status(200).json(produto);
      //   });
    };
  }

  atualiza() {
    return async (req, resp) => {
      try {
        const prod = await Produto.update(
          {
            nome: req.body.nome,
            valor: req.body.valor,
            descricao: req.body.descricao
          },
          {
            where: {
              id: req.params.id
            }
          }
        );
        resp.status(201).json({ message: "Produto atualizado com sucesso!!!" });
      } catch (error) {
        return resp
          .status(400)
          .json({ message: `Erro ao atualizar o produto. ${error}` });
      }
    };

    // return (req, resp) => {
    //   Produto.findById(req.params.produto_id, (err, produto) => {
    //     if (err) return resp.status(400).send(`Produto não encontrado. ${err}`);
    //     //TODO: Criar Assert dos params
    //     produto.nome = req.body.nome;
    //     produto.preco = req.body.preco;
    //     produto.descricao = req.body.descricao;

    //     produto.save(err => {
    //       if (err)
    //         return resp.status(400).send(`Erro ao atualizar o produto. ${err}`);
    //       resp.status(200).json({ message: "Produto Atualizado com sucesso" });
    //     });
    //   });
    // };
  }

  deleta() {
    return async (req, resp) => {
      try {
        const prod = await Produto.destroy({
          where: {
            id: req.params.id
          }
        });
        resp.status(200).json({ message: "Produto deletado com sucesso!!!" });
      } catch (error) {
        return resp
          .status(400)
          .json({ message: `Erro ao listar os produtos. ${error}` });
      }
    };

    // return (req, resp) => {
    //   Produto.remove({ _id: req.params.produto_id }, err => {
    //     if (err) return resp.status(400).send(`Produto não encontrado. ${err}`);
    //     resp.status(200).json({ message: "Produto excluido com sucesso!" });
    //   });
    // };
  }
}

module.exports = ProdutoController;
