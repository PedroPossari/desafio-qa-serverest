import { produtosService } from '../../services/produtos.service';
import { produtoFactory } from '../../factories/produto.factory';
import { gerarAuthTokens } from '../../utils/generateAuthTokens';
import { deletarProdutosPorPrefixo } from '../../utils/deleteProdutos'
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios';
import { deletarCarrinhosPorPrefixoUsuario } from '../../utils/deleteCarrinhos';

describe('API - Produtos', () => {
  let tokenAdmin;
  let tokenComum;
  let produtoId;

  before(() => {
    gerarAuthTokens().then(auth => {
      tokenAdmin = auth.admin.token;
      tokenComum = auth.comum.token;
    });
  });

  after(() => {
    deletarCarrinhosPorPrefixoUsuario('QA_User_');
    deletarProdutosPorPrefixo('QA_Produto_');
    deletarUsuariosPorPrefixo('QA_User_');
  });

  // =====================================================
  // POST /produtos
  // =====================================================
  describe('POST /produtos', () => {
    it('Deve cadastrar produto com sucesso sendo administrador', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin)
        .then(res => {
          expect(res.status).to.eq(201);
          expect(res.body.message).to.eq('Cadastro realizado com sucesso');
          produtoId = res.body._id;
        });
    });

    it('Não deve permitir cadastrar produto sem token', () => {
      produtosService.criar(produtoFactory.valido())
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });

    it('Não deve permitir cadastrar produto com token inválido', () => {
      produtosService.criar(produtoFactory.valido(), 'Bearer tokenInvalido')
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });

    it('Não deve permitir cadastrar produto sendo usuário comum', () => {
      produtosService.criar(produtoFactory.valido(), tokenComum)
        .then(res => {
          expect(res.status).to.eq(403);
        });
    });

    it('Não deve permitir cadastrar produto com nome duplicado', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin).then(res1 => {
        produtoId = res1.body._id;

        produtosService.criar(produto, tokenAdmin).then(res2 => {
          expect(res2.status).to.eq(400);
          expect(res2.body.message).to.eq('Já existe produto com esse nome');
        });
      });
    });

    it('Não deve permitir cadastrar produto sem informar nome', () => {
      const produto = produtoFactory.valido();
      delete produto.nome;

      produtosService.criar(produto, tokenAdmin)
        .then(res => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não deve permitir cadastrar produto sem informar preço', () => {
      const produto = produtoFactory.valido();
      delete produto.preco;

      produtosService.criar(produto, tokenAdmin)
        .then(res => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não deve permitir cadastrar produto sem informar descrição', () => {
      const produto = produtoFactory.valido();
      delete produto.descricao;

      produtosService.criar(produto, tokenAdmin)
        .then(res => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não deve permitir cadastrar produto sem informar quantidade', () => {
      const produto = produtoFactory.valido();
      delete produto.quantidade;

      produtosService.criar(produto, tokenAdmin)
        .then(res => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não deve permitir cadastrar produto com preço negativo', () => {
      produtosService.criar(produtoFactory.precoNegativo(), tokenAdmin)
        .then(res => {
          expect(res.status).to.eq(400);
        });
    });
  });

  // =====================================================
  // GET /produtos
  // =====================================================
  describe('GET /produtos', () => {
    it('Deve listar todos os produtos com sucesso', () => {
      produtosService.listar()
        .then(res => {
          expect(res.status).to.eq(200);
          expect(res.body).to.have.property('produtos');
        });
    });

    it('Deve filtrar produto por nome', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin).then(res => {
        produtoId = res.body._id;

        produtosService.listar(`?nome=${produto.nome}`)
          .then(list => {
            expect(list.status).to.eq(200);
            expect(list.body.produtos[0].nome).to.eq(produto.nome);
          });
      });
    });

    it('Deve retornar lista vazia ao filtrar produto inexistente', () => {
      produtosService.listar('?nome=produtoInexistente123')
        .then(res => {
          expect(res.status).to.eq(200);
          expect(res.body.quantidade).to.eq(0);
        });
    });

    it('Deve filtrar produto por preço', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin).then(res => {
        produtoId = res.body._id;

        produtosService.listar(`?preco=${produto.preco}`)
          .then(list => {
            expect(list.status).to.eq(200);
            expect(list.body.produtos[0].preco).to.eq(produto.preco);
          });
      });
    });

    it('Deve filtrar produto por quantidade', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin).then(res => {
        produtoId = res.body._id;

        produtosService.listar(`?quantidade=${produto.quantidade}`)
          .then(list => {
            expect(list.status).to.eq(200);
            expect(list.body.produtos[0].quantidade).to.eq(produto.quantidade);
          });
      });
    });
  });

  // =====================================================
  // GET /produtos/{id}
  // =====================================================
  describe('GET /produtos/{id}', () => {
    it('Deve buscar produto por ID com sucesso', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin).then(res => {
        produtoId = res.body._id;

        produtosService.buscarPorId(produtoId)
          .then(busca => {
            expect(busca.status).to.eq(200);
            expect(busca.body.nome).to.eq(produto.nome);
          });
      });
    });

    it('Não deve buscar produto com ID inexistente', () => {
      produtosService.buscarPorId('idInexistente123')
        .then(res => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Produto não encontrado');
        });
    });

    it('Não deve buscar produto com ID inválido', () => {
      produtosService.buscarPorId('@')
        .then(res => {
          expect(res.status).to.eq(400);
        });
    });
  });

  // =====================================================
  // PUT /produtos/{id}
  // =====================================================
  describe('PUT /produtos/{id}', () => {
    it('Deve atualizar produto com sucesso sendo administrador', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin).then(res => {
        produtoId = res.body._id;

        const atualizado = { ...produto, preco: 999 };

        produtosService.atualizar(produtoId, atualizado, tokenAdmin)
          .then(update => {
            expect(update.status).to.eq(200);
            expect(update.body.message).to.eq('Registro alterado com sucesso');
          });
      });
    });

    it('Não deve atualizar produto sem token', () => {
      produtosService.atualizar('idFake', produtoFactory.valido())
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });

    it('Não deve atualizar produto sendo usuário comum', () => {
      produtosService.atualizar('idFake', produtoFactory.valido(), tokenComum)
        .then(res => {
          expect(res.status).to.eq(403);
        });
    });

    it('Não deve atualizar produto com nome duplicado', () => {
      const produto1 = produtoFactory.valido();
      const produto2 = produtoFactory.valido();

      produtosService.criar(produto1, tokenAdmin).then(res1 => {
        const id1 = res1.body._id;

        produtosService.criar(produto2, tokenAdmin).then(res2 => {
          produtoId = res2.body._id;

          produtosService.atualizar(produtoId, { ...produto2, nome: produto1.nome }, tokenAdmin)
            .then(update => {
              expect(update.status).to.eq(400);
            });

          produtosService.deletar(id1, tokenAdmin);
        });
      });
    });

    it('Deve cadastrar novo produto ao atualizar ID inexistente', () => {
      produtosService.atualizar('idInexistente123', produtoFactory.valido(), tokenAdmin)
        .then(res => {
          expect(res.status).to.eq(201);
          expect(res.body.message).to.eq('Cadastro realizado com sucesso');
        });
    });
  });

  // =====================================================
  // DELETE /produtos/{id}
  // =====================================================
  describe('DELETE /produtos/{id}', () => {
    it('Deve excluir produto com sucesso sendo administrador', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin).then(res => {
        const id = res.body._id;

        produtosService.deletar(id, tokenAdmin)
          .then(del => {
            expect(del.status).to.eq(200);
            expect(del.body.message).to.eq('Registro excluído com sucesso');
          });
      });
    });

    it('Não deve excluir produto sem token', () => {
      produtosService.deletar('idFake')
        .then(res => {
          expect(res.status).to.eq(401);
        });
    });

    it('Não deve excluir produto sendo usuário comum', () => {
      produtosService.deletar('idFake', tokenComum)
        .then(res => {
          expect(res.status).to.eq(403);
        });
    });

    it('Deve retornar mensagem adequada ao excluir produto inexistente', () => {
      produtosService.deletar('idInexistente123', tokenAdmin)
        .then(res => {
          expect(res.status).to.eq(200);
          expect(res.body.message).to.eq('Nenhum registro excluído');
        });
    });

    it('Não deve excluir produto com ID inválido', () => {
      produtosService.deletar('@', tokenAdmin)
        .then(res => {
          expect(res.status).to.eq(400);
        });
    });
  });

  // =====================================================
  // SCHEMA - PRODUTOS
  // =====================================================
  describe('Schema - Produtos', () => {
    // ============================
    // GET /produtos
    // ============================
    it('Validar schema - Listar produtos', () => {
      produtosService.listar()
        .then(res => {
          expect(res.status).to.eq(200);

          expect(res.body).to.have.property('quantidade');
          expect(res.body.quantidade).to.be.a('number');

          expect(res.body).to.have.property('produtos');
          expect(res.body.produtos).to.be.an('array');

          if (res.body.produtos.length > 0) {
            res.body.produtos.forEach(produto => {
              expect(produto).to.have.property('_id');
              expect(produto._id).to.be.a('string');

              expect(produto).to.have.property('nome');
              expect(produto.nome).to.be.a('string');

              expect(produto).to.have.property('preco');
              expect(produto.preco).to.be.a('number');

              expect(produto).to.have.property('descricao');
              expect(produto.descricao).to.be.a('string');

              expect(produto).to.have.property('quantidade');
              expect(produto.quantidade).to.be.a('number');
            });
          }
        });
    });

    // ============================
    // POST /produtos (201)
    // ============================
    it('Validar schema - Criar produto com sucesso', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin)
        .then(res => {
          expect(res.status).to.eq(201);

          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');

          expect(res.body).to.have.property('_id');
          expect(res.body._id).to.be.a('string');
        });
    });

    // ============================
    // POST /produtos (401)
    // ============================
    it('Validar schema - Erro token inválido (POST)', () => {
      produtosService
        .criar(produtoFactory.valido(), 'token_invalido')
        .then(res => {
          expect(res.status).to.eq(401);

          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
        });
    });

    // ============================
    // GET /produtos/{id} (200)
    // ============================
    it('Validar schema - Buscar produto por ID', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin)
        .then(resCreate => {
          const id = resCreate.body._id;

          produtosService.buscarPorId(id)
            .then(res => {
              expect(res.status).to.eq(200);

              expect(res.body).to.have.property('_id');
              expect(res.body._id).to.be.a('string');

              expect(res.body).to.have.property('nome');
              expect(res.body.nome).to.be.a('string');

              expect(res.body).to.have.property('preco');
              expect(res.body.preco).to.be.a('number');

              expect(res.body).to.have.property('descricao');
              expect(res.body.descricao).to.be.a('string');

              expect(res.body).to.have.property('quantidade');
              expect(res.body.quantidade).to.be.a('number');
            });
        });
    });

    // ============================
    // GET /produtos/{id} (400)
    // ============================
    it('Validar schema - ID inexistente', () => {
      produtosService.buscarPorId('id_fake')
        .then(res => {
          expect(res.status).to.eq(400);

          expect(res.body).to.have.property('id');
        });
    });

    // ============================
    // PUT /produtos/{id} (200)
    // ============================
    it('Validar schema - Atualizar produto', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin)
        .then(resCreate => {
          const id = resCreate.body._id;

          const atualizado = {
            ...produto,
            preco: 888
          };

          produtosService.atualizar(id, atualizado, tokenAdmin)
            .then(res => {
              expect(res.status).to.eq(200);

              expect(res.body).to.have.property('message');
              expect(res.body.message).to.be.a('string');
            });
        });
    });

    // ============================
    // DELETE /produtos/{id} (200)
    // ============================
    it('Validar schema - Excluir produto', () => {
      const produto = produtoFactory.valido();

      produtosService.criar(produto, tokenAdmin)
        .then(resCreate => {
          const id = resCreate.body._id;

          produtosService.deletar(id, tokenAdmin)
            .then(res => {
              expect(res.status).to.eq(200);

              expect(res.body).to.have.property('message');
              expect(res.body.message).to.be.a('string');
            });
        });
    });

    // ============================
    // DELETE /produtos/{id} (401)
    // ============================
    it('Validar schema - Erro token inválido (DELETE)', () => {
      produtosService.deletar('idFake', 'token_invalido')
        .then(res => {
          expect(res.status).to.eq(401);

          expect(res.body).to.have.property('message');
          expect(res.body.message).to.be.a('string');
        });
    });
  });
});