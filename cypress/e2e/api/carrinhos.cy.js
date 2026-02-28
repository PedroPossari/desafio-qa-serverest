import { CarrinhoFactory } from '../../factories/carrinho.factory';
import { carrinhoService } from '../../services/carrinhos.service';
import { gerarAuthTokens } from '../../utils/generateAuthTokens';
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios';
import { deletarProdutosPorPrefixo } from '../../utils/deleteProdutos'
import { deletarCarrinhosPorPrefixoUsuario } from '../../utils/deleteCarrinhos';

const TOKEN_EXPIRADO =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlRva2VuX0FETUlOX0VYUEBxYS5jb20uYnIiLCJwYXNzd29yZCI6InRlc3RlIiwiaWF0IjoxNzcyMjc4NzgxLCJleHAiOjE3NzIyNzkzODF9.uKzVxoZ8_L0SjYFexVn883mpsz5ilj_PUcFmLmC7ris';


  after(() => {
    deletarCarrinhosPorPrefixoUsuario('QA_User_');
    deletarProdutosPorPrefixo('QA_Produto_');
    deletarUsuariosPorPrefixo('QA_User_');
  });


describe('Gestão de Carrinhos - API', () => {
  // ==================================================
  // POST /carrinhos
  // ==================================================
  describe('POST /carrinhos - Cadastro', () => {
    it('Cadastrar carrinho com sucesso', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(({ res, produtoId }) => {
          expect(res.status).to.eq(201);
          expect(res.body.message)
            .to.eq('Cadastro realizado com sucesso');
          expect(res.body._id).to.not.be.null;
        });
    });

    it('Não permitir cadastro sem token', () => {
      carrinhoService
        .criar({}, null)
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });

    it('Não permitir cadastro com token inválido', () => {
      carrinhoService
        .criar({}, 'token_invalido')
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });

    it('Não permitir cadastro com token expirado', () => {
      const body = {
        produtos: [
          {
            idProduto: 'BeeJh5lz3k6kSIzA',
            quantidade: 1
          }
        ]
      };

      carrinhoService
        .criar(body, TOKEN_EXPIRADO)
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });

    it('Não permitir cadastrar mais de um carrinho', () => {
      CarrinhoFactory
        .criarCarrinhoDuplicado()
        .then(res => {
          expect(res.status).to.eq(400);
          expect(res.body.message)
            .to.include('Não é permitido ter mais de 1 carrinho');
        });
    });

    it('Não permitir produto duplicado', () => {
      CarrinhoFactory
        .criarProdutoDuplicado()
        .then(res => {
          expect(res.status).to.eq(400);
          expect(res.body.message)
            .to.include('Não é permitido possuir produto duplicado');
        });
    });

    it('Não permitir cadastro com produto inexistente', () => {
      CarrinhoFactory
        .criarProdutoInexistente()
        .then(res => {
          expect(res.status).to.eq(400);
          expect(res.body.message)
            .to.include('Produto não encontrado');
        });
    });

    it('Não permitir cadastro com quantidade maior que o estoque', () => {
      CarrinhoFactory
        .criarProdutoSemEstoque()
        .then(res => {
          expect(res.status).to.eq(400);
          expect(res.body.message)
            .to.include('Produto não possui quantidade suficiente');
        });
    });

    it('Não permitir cadastro sem informar produtos', () => {
      gerarAuthTokens().then(({ comum }) => {
        CarrinhoFactory
          .criarSemProdutos(comum.token)
          .then(res => {
            expect(res.status).to.eq(400);
          });
      });
    });

    it('Não permitir cadastro com lista vazia', () => {
      gerarAuthTokens().then(({ comum }) => {
        CarrinhoFactory
          .criarListaVazia(comum.token)
          .then(res => {
            expect(res.status).to.eq(400);
          });
      });
    });

    it('Não permitir cadastro com quantidade zero', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(({ produtoId, comum }) => {
          CarrinhoFactory
            .criarQuantidadeZero(produtoId, comum.token)
            .then(res => {
              expect(res.status).to.eq(400);
            });
        });
    });

    it('Não permitir cadastro com quantidade negativa', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(({ produtoId, comum }) => {
          CarrinhoFactory
            .criarQuantidadeNegativa(produtoId, comum.token)
            .then(res => {
              expect(res.status).to.eq(400);
            });
        });
    });

    it('Não permitir cadastro com corpo vazio', () => {
      gerarAuthTokens().then(({ comum }) => {
        cy.request({
          method: 'POST',
          url: 'https://serverest.dev/carrinhos',
          headers: { Authorization: comum.token },
          failOnStatusCode: false
        }).then(res => {
          expect(res.status).to.eq(400);
        });
      });
    });

    it('Não permitir cadastro com campos nulos', () => {
      gerarAuthTokens().then(({ comum }) => {
        CarrinhoFactory
          .criarCamposNulos(comum.token)
          .then(res => {
            expect(res.status).to.eq(400);
          });
      });
    });

    it('Não permitir cadastro com tipos inválidos', () => {
      gerarAuthTokens().then(({ comum }) => {
        CarrinhoFactory
          .criarTiposInvalidos(comum.token)
          .then(res => {
            expect(res.status).to.eq(400);
          });
      });
    });
  });

  // ==================================================
  // GET /carrinhos
  // ==================================================
  describe('GET /carrinhos - Listagem', () => {
    it('Listar todos os carrinhos', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(() => {
          carrinhoService
            .listar()
            .then(res => {
              expect(res.status).to.eq(200);
              expect(res.body.carrinhos).to.be.an('array');
              expect(res.body.quantidade).to.be.greaterThan(0);
            });
        });
    });

    it('Filtrar por usuário', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(({ comum }) => {
          carrinhoService
            .listar(`?idUsuario=${comum.usuario._id}`)
            .then(res => {
              expect(res.status).to.eq(200);
              res.body.carrinhos.forEach(c => {
                expect(c.idUsuario)
                  .to.eq(comum.usuario._id);
              });
            });
        });
    });

    it('Filtrar por precoTotal', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(() => {
          carrinhoService.listar().then(lista => {
            const preco = lista.body.carrinhos[0].precoTotal;
            carrinhoService
              .listar(`?precoTotal=${preco}`)
              .then(res => {
                res.body.carrinhos.forEach(c => {
                  expect(c.precoTotal).to.eq(preco);
                });
              });
          });
        });
    });

    it('Filtrar por quantidadeTotal', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(() => {
          carrinhoService.listar().then(lista => {
            const qtd = lista.body.carrinhos[0].quantidadeTotal;
            carrinhoService
              .listar(`?quantidadeTotal=${qtd}`)
              .then(res => {
                res.body.carrinhos.forEach(c => {
                  expect(c.quantidadeTotal).to.eq(qtd);
                });
              });
          });
        });
    });

    it('Buscar com filtros inexistentes', () => {
      carrinhoService
        .listar('?precoTotal=999999')
        .then(res => {
          expect(res.status).to.eq(200);
          expect(res.body.carrinhos).to.have.length(0);
        });
    });
  });

  // ==================================================
  // GET /carrinhos/{id}
  // ==================================================
  describe('GET /carrinhos/{id}', () => {
    it('Buscar por ID válido', () => {
      CarrinhoFactory
        .criarCarrinhoPronto()
        .then(({ carrinhoId }) => {
          carrinhoService
            .buscarPorId(carrinhoId)
            .then(res => {
              expect(res.status).to.eq(200);
              expect(res.body._id).to.eq(carrinhoId);
            });
        });
    });

    it('Buscar ID inexistente', () => {
      carrinhoService
        .buscarPorId('id_fake')
        .then(res => {
          expect(res.status).to.eq(400);
        });
    });

    it('Buscar ID inválido', () => {
      carrinhoService
        .buscarPorId('@@@###')
        .then(res => {
          expect(res.status).to.eq(400);
        });
    });
  });

  // ==================================================
  // DELETE /concluir
  // ==================================================
  describe('DELETE /carrinhos/concluir-compra', () => {
    it('Concluir compra', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(({ comum }) => {
          carrinhoService
            .concluirCompra(comum.token)
            .then(res => {
              expect(res.status).to.eq(200);
            });
        });
    });

    it('Concluir sem carrinho', () => {
      gerarAuthTokens().then(({ comum }) => {
        carrinhoService
          .concluirCompra(comum.token)
          .then(res => {
            expect(res.status).to.eq(200);
            expect(res.body.message)
              .to.include('Não foi encontrado');
          });
      });
    });

    it('Concluir sem token', () => {
      cy.request({
        method: 'DELETE',
        url: 'https://serverest.dev/carrinhos/concluir-compra',
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(401);
      });
    });

    it('Concluir token inválido', () => {
      carrinhoService
        .concluirCompra('token_invalido')
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });

    it('Concluir token expirado', () => {
      carrinhoService
        .concluirCompra(TOKEN_EXPIRADO)
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });
  });

  // ==================================================
  // DELETE /cancelar
  // ==================================================
  describe('DELETE /carrinhos/cancelar-compra', () => {
    it('Cancelar compra', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(({ comum }) => {
          carrinhoService
            .cancelarCompra(comum.token)
            .then(res => {
              expect(res.status).to.eq(200);
            });
        });
    });

    it('Cancelar sem carrinho', () => {
      gerarAuthTokens().then(({ comum }) => {
        carrinhoService
          .cancelarCompra(comum.token)
          .then(res => {
            expect(res.status).to.eq(200);
            expect(res.body.message)
              .to.include('Não foi encontrado');
          });
      });
    });

    it('Cancelar sem token', () => {
      cy.request({
        method: 'DELETE',
        url: 'https://serverest.dev/carrinhos/cancelar-compra',
        failOnStatusCode: false
      }).then(res => {
        expect(res.status).to.eq(401);
      });
    });

    it('Cancelar token inválido', () => {
      carrinhoService
        .cancelarCompra('token_invalido')
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });

    it('Cancelar token expirado', () => {
      carrinhoService
        .cancelarCompra(TOKEN_EXPIRADO)
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });
  });

  // ==================================================
  // SCHEMA VALIDATION
  // ==================================================
  describe('Schema Validation - Carrinhos', () => {
    // =============================
    // GET /carrinhos
    // =============================
    it('Validar schema - Listar carrinhos', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(() => {
          carrinhoService.listar().then(res => {
            expect(res.status).to.eq(200);

            // Root
            expect(res.body).to.have.property('quantidade');
            expect(res.body.quantidade).to.be.a('number');

            expect(res.body).to.have.property('carrinhos');
            expect(res.body.carrinhos).to.be.an('array');

            if (res.body.carrinhos.length > 0) {
              const carrinho = res.body.carrinhos[0];

              expect(carrinho).to.have.property('_id').and.to.be.a('string');
              expect(carrinho).to.have.property('idUsuario').and.to.be.a('string');
              expect(carrinho).to.have.property('precoTotal').and.to.be.a('number');
              expect(carrinho).to.have.property('quantidadeTotal').and.to.be.a('number');

              expect(carrinho).to.have.property('produtos');
              expect(carrinho.produtos).to.be.an('array');

              const grupo = carrinho.produtos[0];

              if (Array.isArray(grupo)) {
                grupo.forEach(prod => {
                  expect(prod).to.have.property('idProduto').and.to.be.a('string');
                  expect(prod).to.have.property('quantidade').and.to.be.a('number');
                  expect(prod).to.have.property('precoUnitario').and.to.be.a('number');
                });
              } else {
                expect(grupo).to.have.property('idProduto').and.to.be.a('string');
                expect(grupo).to.have.property('quantidade').and.to.be.a('number');
                expect(grupo).to.have.property('precoUnitario').and.to.be.a('number');
              }
            }
          });
        });
    });

    // =============================
    // POST /carrinhos
    // =============================
    it('Validar schema - Criar carrinho', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(({ res }) => {
          expect(res.status).to.eq(201);

          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');

          expect(res.body).to.have.property('_id');
          expect(res.body._id).to.be.a('string');
        });
    });

    it('Validar schema - Erro ao criar carrinho', () => {
      CarrinhoFactory
        .criarProdutoInexistente()
        .then(res => {
          expect(res.status).to.eq(400);

          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
        });
    });

    // =============================
    // DELETE /concluir-compra
    // =============================
    it('Validar schema - Concluir compra', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(({ comum }) => {
          carrinhoService
            .concluirCompra(comum.token)
            .then(res => {
              expect(res.status).to.eq(200);

              expect(res.body).to.have.property('message');
              expect(res.body.message).to.be.a('string');
            });
        });
    });

    // =============================
    // DELETE /cancelar-compra
    // =============================
    it('Validar schema - Cancelar compra', () => {
      CarrinhoFactory
        .criarCarrinhoValido()
        .then(({ comum }) => {
          carrinhoService
            .cancelarCompra(comum.token)
            .then(res => {
              expect(res.status).to.eq(200);

              expect(res.body).to.have.property('message');
              expect(res.body.message).to.be.a('string');
            });
        });
    });
  });
});