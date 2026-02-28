import { gerarAuthTokens } from './generateAuthTokens';
import { produtosService } from '../services/produtos.service';
import { carrinhoService } from '../services/carrinhos.service';

function gerarNovoProduto() {
  return {
    nome: `Produto Carrinho ${Date.now()}`,
    preco: 150,
    descricao: 'Produto para teste de carrinho',
    quantidade: 20
  };
}

export function gerarCarrinhoComProduto() {

  return gerarAuthTokens().then(({ admin, comum }) => {

    const produto = gerarNovoProduto();

    return produtosService
      .criar(produto, admin.token)

      .then(resProduto => {

        const produtoId = resProduto.body._id;

        const bodyCarrinho = {
          produtos: [
            {
              idProduto: produtoId,
              quantidade: 1
            }
          ]
        };

        return carrinhoService
          .criar(bodyCarrinho, comum.token)

          .then(resCarrinho => {

            return {
              admin,
              comum,
              produto,
              produtoId,
              carrinhoId: resCarrinho.body._id,
              carrinhoResponse: resCarrinho
            };

          });

      });

  });

}