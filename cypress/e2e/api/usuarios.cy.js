import { usuariosService } from '../../services/usuarios.service';
import { usuarioFactory } from '../../factories/usuario.factory';

describe('Gestão de usuários - API', () => {
  let usuarioBase;
  let usuariosCriados = [];

  beforeEach(() => {
    usuarioBase = usuarioFactory.usuarioValido();
  });

  afterEach(() => {
    usuariosCriados.forEach((id) => {
      usuariosService.deletarUsuario(id);
    });
    usuariosCriados = [];
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
        usuariosCriados.push(res.body._id);
      });
    });

    it('Cadastrar usuário comum com sucesso', () => {
      usuariosService.criarUsuario(usuarioBase).then((res) => {
        expect(res.status).to.eq(201);
        expect(res.body.message).to.eq('Cadastro realizado com sucesso');
        expect(res.body).to.have.property('_id');
        usuariosCriados.push(res.body._id);
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
});