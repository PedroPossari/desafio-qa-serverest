import { loginFactory } from '../../factories/login.factory';
import { loginService } from '../../services/login.service';
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios';

describe('Autenticação de usuários - API', () => {
  let usuario;

  beforeEach(() => {
    loginFactory.criarUsuario().then(u => {
      usuario = u;
    });
  });

  after(() => {
      deletarUsuariosPorPrefixo('QA_User_');
  });

  // ==================================================
  // POSITIVO - POST /login
  // ==================================================
  it('Realizar login com sucesso', () => {
    loginService.realizarLogin({ email: usuario.email, password: usuario.password }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.eq('Login realizado com sucesso');
      expect(res.body).to.have.property('authorization');
      expect(res.body.authorization).to.match(/^Bearer\s/);
    });
  });
  // ==================================================
  // NEGATIVOS - login com dados inválidos
  // ==================================================
  it('Não permitir login com senha incorreta', () => {
    const credenciais = loginFactory.usuarioSenhaIncorreta(usuario);
    loginService.realizarLogin(credenciais).then(res => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.eq('Email e/ou senha inválidos');
    });
  });

  it('Não permitir login com email inexistente', () => {
    const credenciais = loginFactory.usuarioEmailInexistente();
    loginService.realizarLogin(credenciais).then(res => {
      expect(res.status).to.eq(401);
      expect(res.body.message).to.eq('Email e/ou senha inválidos');
    });
  });

  it('Não permitir login com email vazio', () => {
    const credenciais = loginFactory.usuarioEmailVazio(usuario);
    loginService.realizarLogin(credenciais).then(res => {
      expect(res.status).to.eq(400);
    });
  });

  it('Não permitir login com senha vazia', () => {
    const credenciais = loginFactory.usuarioSenhaVazia(usuario);
    loginService.realizarLogin(credenciais).then(res => {
      expect(res.status).to.eq(400);
    });
  });

  // ==================================================
  // VALIDAÇÃO DE REQUISIÇÃO
  // ==================================================
  it('Não permitir login com corpo vazio', () => {
    const credenciais = loginFactory.usuarioCorpoVazio();
    loginService.realizarLogin(credenciais).then(res => {
      expect(res.status).to.eq(400);
    });
  });

  it('Não permitir login com email em formato inválido', () => {
    const credenciais = loginFactory.usuarioEmailInvalidoFormato(usuario);
    loginService.realizarLogin(credenciais).then(res => {
      expect(res.status).to.eq(400);
    });
  });

  it('Não permitir login com email como número', () => {
    const credenciais = loginFactory.usuarioEmailNumero(usuario);
    loginService.realizarLogin(credenciais).then(res => {
      expect(res.status).to.eq(400);
    });
  });

  it('Não permitir login com senha como número', () => {
    const credenciais = loginFactory.usuarioSenhaNumero(usuario);
    loginService.realizarLogin(credenciais).then(res => {
      expect(res.status).to.eq(400);
    });
  });

  // ==================================================
  // VALIDAÇÃO - sem informar email e senha
  // ==================================================
  it('Não permitir login sem informar email e senha', () => {
    loginService.realizarLogin({}).then(res => {
      expect(res.status).to.eq(400);
    });
  });

  it('Não permitir login com corpo da requisição vazio', () => {
    loginService.realizarLogin({}).then(res => {
      expect(res.status).to.eq(400);
    });
  });

  // ==================================================
  // SEGURANÇA - campos nulos
  // ==================================================
  it('Não permitir login com campos nulos', () => {
    const credenciais = loginFactory.usuarioCamposNulos();
    loginService.realizarLogin(credenciais).then(res => {
      expect(res.status).to.eq(400);
    });
  });

});