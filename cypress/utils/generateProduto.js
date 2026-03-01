import { gerarAuthTokens } from './generateAuthTokens';
import { produtosService } from '../services/produtos.service';

export function gerarNovoProduto() {
  return {
    nome: `QA_Produto_${Date.now()}`,
    preco: 100,
    descricao: 'QA_Produto_gerado automaticamente',
    quantidade: 10
  };
}

export function gerarProdutoComAdmin() {

  return gerarAuthTokens().then(({ admin }) => {

    const produto = gerarNovoProduto();

    return produtosService
      .criar(produto, admin.token)
      .then(res => {

        return {
          admin,
          produto,
          produtoId: res.body._id,
          response: res
        };

      });

  });

}