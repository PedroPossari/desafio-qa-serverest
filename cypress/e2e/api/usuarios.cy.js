import { usuariosService } from '../../services/usuarios.service';
import { usuarioFactory } from '../../factories/usuario.factory';

describe('Gestão de usuários - API', () => {
  let usuarioBase;
  let usuariosCriados = [];

  beforeEach(() => {
    usuarioBase = usuarioFactory.usuarioValido();
  });

  after(() => {
    usuariosService.listarUsuarios('?nome=QA_User_').then((res) => {
      res.body.usuarios.forEach((u) => {
        usuariosService.deletarUsuario(u._id).then((resDel) => {
          cy.log(`Usuário fantasma ${u.nome} deletado: ${resDel.body.message}`);
        });
      });
    });
  });

  // ==================================================
  // POST /usuarios
  // ==================================================
  describe('POST /usuarios', () => {
    it('Cadastrar usuário administrador com sucesso', () => {
      const usuario = usuarioFactory.usuarioAdmin();

      usuariosService.criarUsuario(usuario).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
        expect(res.body).to.have.property('_id');
      });
    });

    it('Cadastrar usuário comum com sucesso', () => {
      usuariosService.criarUsuario(usuarioBase).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
        expect(res.body).to.have.property('_id');
      });
    });

    it('Não permitir cadastro com email já utilizado', () => {
      usuariosService.criarUsuario(usuarioBase).then(() => {
        usuariosService.criarUsuario(usuarioBase).then((res) => {
          expect(res.status).to.eq(400);
          expect(res.body.message).to.eq('Este email já está sendo usado');
        });
      });
    });

    it('Não permitir cadastro com email sem arroba', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioEmailInvalidoSemArroba())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não permitir cadastro com email sem domínio', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioEmailInvalidoSemDominio())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não permitir cadastro com email vazio', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioEmailVazio())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não permitir cadastro sem informar nome', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioSemNome())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não permitir cadastro sem informar senha', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioSemSenha())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não permitir cadastro sem informar perfil de administrador', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioSemAdmin())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não permitir cadastro com corpo da requisição vazio', () => {
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/usuarios',
        failOnStatusCode: false,
      }).then((res) => {
        expect(res.status).to.eq(400);
      });
    });

    it('Não permitir cadastro com todos os campos em branco', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioCamposVazios())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não permitir cadastro com campos nulos', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioCamposNulos())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não permitir cadastro com administrador inválido', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioAdminInvalido())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não permitir cadastro com senha muito curta', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioSenhaCurta())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });

    it('Não permitir cadastro com senha muito longa', () => {
      usuariosService.criarUsuario(usuarioFactory.usuarioSenhaLonga())
        .then((res) => {
          expect(res.status).to.eq(400);
        });
    });
  });
  // ==================================================
  // GET /usuarios
  // ==================================================
  describe('GET /usuarios', () => {
    it('Listar todos os usuários com sucesso', () => {
      usuariosService.listarUsuarios().then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property('quantidade');
        expect(res.body.usuarios).to.be.an('array');
      });
    });

    it('Filtrar usuários por nome', () => {
      usuariosService.criarUsuario(usuarioBase).then((res) => {
        usuariosService.listarUsuarios(`?nome=${usuarioBase.nome}`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.usuarios[0].nome).to.eq(usuarioBase.nome);
        });
      });
    });

    it('Filtrar usuários por email', () => {
      usuariosService.criarUsuario(usuarioBase).then((res) => {
        usuariosService.listarUsuarios(`?email=${usuarioBase.email}`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.usuarios[0].email).to.eq(usuarioBase.email);
        });
      });
    });

    it('Filtrar usuários por perfil administrador', () => {
      const admin = usuarioFactory.usuarioAdmin();
      usuariosService.criarUsuario(admin).then((res) => {
        usuariosService.listarUsuarios('?administrador=true').then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.usuarios.some((u) => u.administrador === 'true')).to.be.true;
        });
      });
    });

    it('Buscar usuários com filtro inexistente', () => {
      usuariosService.listarUsuarios('?nome=naoexiste123').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.quantidade).to.eq(0);
        expect(res.body.usuarios).to.be.empty;
      });
    });
  });

  // ==================================================
  // GET /usuarios/{id}
  // ==================================================
  describe('GET /usuarios/{id}', () => {
    it('Buscar usuário por ID válido', () => {
      usuariosService.criarUsuario(usuarioBase).then((res) => {
        const id = res.body._id;
        usuariosCriados.push(id);
        usuariosService.buscarUsuarioPorId(id).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body._id).to.eq(id);
          expect(response.body.nome).to.eq(usuarioBase.nome);
          expect(response.body.email).to.eq(usuarioBase.email);
        });
      });
    });

    it('Buscar usuário com ID inexistente', () => {
      usuariosService.buscarUsuarioPorId('999999999999').then((res) => {
        expect(res.status).to.eq(400);
        expect(res.body.message).to.eq('Usuário não encontrado');
      });
    });

    it('Buscar usuário com ID inválido', () => {
      usuariosService.buscarUsuarioPorId('idInvalido123').then((res) => {
        expect(res.status).to.eq(400);
      });
    });
  });
  
    // ==================================================
    // PUT /usuarios/{id}
    // ==================================================
    describe('PUT /usuarios/{id}', () => {
      it('Atualizar usuário com sucesso', () => {
        usuariosService.criarUsuario(usuarioBase).then((res) => {
          const id = res.body._id;
          usuariosCriados.push(id);
  
          const atualizado = { ...usuarioBase, nome: 'Nome Atualizado' };
          usuariosService.atualizarUsuario(id, atualizado).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Registro alterado com sucesso');
          });
        });
      });
  
      it('Atualizar usuário alterando perfil para administrador', () => {
        const usuarioComum = usuarioFactory.usuarioComum();
        usuariosService.criarUsuario(usuarioComum).then((res) => {
          const id = res.body._id;
          usuariosCriados.push(id);
  
          const atualizado = { ...usuarioComum, administrador: 'true' };
          usuariosService.atualizarUsuario(id, atualizado).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Registro alterado com sucesso');
          });
        });
      });
  
      it('Não permitir atualização com email já utilizado', () => {
        const usuario1 = usuarioFactory.usuarioValido();
        const usuario2 = usuarioFactory.usuarioValido();
  
        usuariosService.criarUsuario(usuario1).then((res1) => {
          usuariosCriados.push(res1.body._id);
          usuariosService.criarUsuario(usuario2).then((res2) => {
            usuariosCriados.push(res2.body._id);
  
            const atualizado = { ...usuario2, email: usuario1.email };
            usuariosService.atualizarUsuario(res2.body._id, atualizado).then((response) => {
              expect(response.status).to.eq(400);
              expect(response.body.message).to.eq('Este email já está sendo usado');
            });
          });
        });
      });
  
      it('Atualizar usuário com ID inexistente deve realizar novo cadastro', () => {
        const usuario = usuarioFactory.usuarioValido();
        usuariosService.atualizarUsuario('idNaoExiste', usuario).then((res) => {
          expect(res.status).to.eq(201);
          expect(res.body.message).to.eq('Cadastro realizado com sucesso');
          expect(res.body).to.have.property('_id');

        });
      });
  
      it('Não permitir atualização com email inválido', () => {
        usuariosService.criarUsuario(usuarioBase).then((res) => {
          const id = res.body._id;
          usuariosCriados.push(id);
  
          const atualizado = { ...usuarioBase, email: 'emailinvalido' };
          usuariosService.atualizarUsuario(id, atualizado).then((response) => {
            expect(response.status).to.eq(400);
          });
        });
      });
  
      it('Não permitir atualização com campos obrigatórios vazios', () => {
        usuariosService.criarUsuario(usuarioBase).then((res) => {
          const id = res.body._id;
          usuariosCriados.push(id);
  
          const atualizado = { ...usuarioBase, nome: '' };
          usuariosService.atualizarUsuario(id, atualizado).then((response) => {
            expect(response.status).to.eq(400);
          });
        });
      });
  
      it('Não permitir atualização com corpo da requisição vazio', () => {
        usuariosService.criarUsuario(usuarioBase).then((res) => {
          const id = res.body._id;
          usuariosCriados.push(id);
  
          cy.request({
            method: 'PUT',
            url: `https://serverest.dev/usuarios/${id}`,
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.eq(400);
          });
        });
      });
  
      it('Não permitir atualização com campos nulos', () => {
        usuariosService.criarUsuario(usuarioBase).then((res) => {
          const id = res.body._id;
          usuariosCriados.push(id);
  
          usuariosService.atualizarUsuario(id, usuarioFactory.usuarioCamposNulos())
            .then((response) => {
              expect(response.status).to.eq(400);
            });
        });
      });
    });
    
  // ==================================================
  // DELETE /usuarios/{id}
  // ==================================================
  describe('DELETE /usuarios/{id}', () => {
    it('Excluir usuário com sucesso', () => {
      usuariosService.criarUsuario(usuarioBase).then((res) => {
        const id = res.body._id;
        usuariosService.deletarUsuario(id).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.message).to.eq('Registro excluído com sucesso');
        });
      });
    });

    it('Tentar excluir usuário já removido', () => {
      usuariosService.criarUsuario(usuarioBase).then((res) => {
        const id = res.body._id;

        usuariosService.deletarUsuario(id).then(() => {
          usuariosService.deletarUsuario(id).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Nenhum registro excluído');
          });
        });
      });
    });

    it('Tentar excluir usuário com ID inexistente', () => {
      usuariosService.deletarUsuario('999999999999').then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body.message).to.eq('Nenhum registro excluído');
      });
    });

    it('Tentar excluir usuário com ID inválido', () => {
      usuariosService.deletarUsuario('idInvalido123').then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});