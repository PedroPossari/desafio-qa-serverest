import { produtosService } from '../../services/produtos.service';
import { produtoFactory } from '../../factories/produto.factory';
import { gerarAuthTokens } from '../../utils/generateAuthTokens';

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

  afterEach(() => {
    if (produtoId) {
      produtosService.deletar(produtoId, tokenAdmin);
      produtoId = null;
    }
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

});