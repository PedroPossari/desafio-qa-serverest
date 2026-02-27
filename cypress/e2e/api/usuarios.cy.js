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
        usuariosCriados.push(res.body._id);
        usuariosService.listarUsuarios(`?nome=${usuarioBase.nome}`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.usuarios[0].nome).to.eq(usuarioBase.nome);
        });
      });
    });

    it('Filtrar usuários por email', () => {
      usuariosService.criarUsuario(usuarioBase).then((res) => {
        usuariosCriados.push(res.body._id);
        usuariosService.listarUsuarios(`?email=${usuarioBase.email}`).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.usuarios[0].email).to.eq(usuarioBase.email);
        });
      });
    });

    it('Filtrar usuários por perfil administrador', () => {
      const admin = usuarioFactory.usuarioAdmin();
      usuariosService.criarUsuario(admin).then((res) => {
        usuariosCriados.push(res.body._id);
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
});