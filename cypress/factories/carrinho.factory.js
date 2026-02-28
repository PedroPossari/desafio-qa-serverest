import { gerarAuthTokens } from '../utils/generateAuthTokens';
import { produtosService } from '../services/produtos.service';
import { carrinhoService } from '../services/carrinhos.service';

export const CarrinhoFactory = {

  // =============================
  // BASE
  // =============================

  gerarUsuario() {
    return gerarAuthTokens();
  },

  criarProduto(adminToken, quantidade = 10) {

    const produto = {
      nome: `QA_Produto_${Date.now()}`,
      preco: 100,
      descricao: 'Produto Teste',
      quantidade
    };

    return produtosService
      .criar(produto, adminToken)
      .then(res => ({
        produto,
        produtoId: res.body._id
      }));
  },

  // =============================
  // CENÁRIOS POSITIVOS
  // =============================

  criarCarrinhoValido() {

    return this.gerarUsuario().then(({ admin, comum }) => {

      return this
        .criarProduto(admin.token)
        .then(({ produtoId }) => {

          const body = {
            produtos: [
              {
                idProduto: produtoId,
                quantidade: 1
              }
            ]
          };

          return carrinhoService
            .criar(body, comum.token)
            .then(res => ({
              res,
              body,
              produtoId,
              comum
            }));
        });
    });
  },

criarCarrinhoPronto() {

  return this.criarCarrinhoValido()
    .then(({ res, comum, produtoId }) => {

      const carrinhoId = res.body._id;

      return {
        comum,
        produtoId,
        carrinhoId
      };

    });

},

  criarCarrinhoDuplicado() {

    return this.criarCarrinhoValido()
      .then(({ comum, produtoId }) => {

        const body = {
          produtos: [
            {
              idProduto: produtoId,
              quantidade: 1
            }
          ]
        };

        return carrinhoService
          .criar(body, comum.token)
          .then(res => res);
      });
  },

  // =============================
  // CENÁRIOS NEGÓCIO
  // =============================

  criarProdutoDuplicado() {

    return this.gerarUsuario().then(({ admin, comum }) => {

      return this.criarProduto(admin.token)
        .then(({ produtoId }) => {

          const body = {
            produtos: [
              { idProduto: produtoId, quantidade: 1 },
              { idProduto: produtoId, quantidade: 1 }
            ]
          };

          return carrinhoService
            .criar(body, comum.token)
            .then(res => res);
        });

    });
  },

  criarProdutoSemEstoque() {

    return this.gerarUsuario().then(({ admin, comum }) => {

      return this
        .criarProduto(admin.token, 1)
        .then(({ produtoId }) => {

          const body = {
            produtos: [
              {
                idProduto: produtoId,
                quantidade: 10
              }
            ]
          };

          return carrinhoService
            .criar(body, comum.token)
            .then(res => res);
        });

    });
  },

  criarProdutoInexistente() {

    return this.gerarUsuario().then(({ comum }) => {

      const body = {
        produtos: [
          {
            idProduto: 'id_fake',
            quantidade: 1
          }
        ]
      };

      return carrinhoService
        .criar(body, comum.token)
        .then(res => res);

    });
  },

  // =============================
  // VALIDAÇÃO
  // =============================

  criarSemProdutos(token) {
    return carrinhoService.criar({}, token);
  },

  criarListaVazia(token) {
    return carrinhoService.criar({ produtos: [] }, token);
  },

  criarQuantidadeZero(produtoId, token) {

    const body = {
      produtos: [
        {
          idProduto: produtoId,
          quantidade: 0
        }
      ]
    };

    return carrinhoService.criar(body, token);
  },

  criarQuantidadeNegativa(produtoId, token) {

    const body = {
      produtos: [
        {
          idProduto: produtoId,
          quantidade: -1
        }
      ]
    };

    return carrinhoService.criar(body, token);
  },

  criarCamposNulos(token) {

    const body = {
      produtos: [
        {
          idProduto: null,
          quantidade: null
        }
      ]
    };

    return carrinhoService.criar(body, token);
  },

  criarTiposInvalidos(token) {

    const body = {
      produtos: [
        {
          idProduto: 123,
          quantidade: 'abc'
        }
      ]
    };

    return carrinhoService.criar(body, token);
  }

};