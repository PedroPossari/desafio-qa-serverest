import { gerarNovoUsuario } from './generateNovoUsuario';

const BASE_URL = 'https://serverest.dev';

function criarUsuarioELogin(administrador) {
  const usuario = gerarNovoUsuario(administrador);

  return cy.request('POST', `${BASE_URL}/usuarios`, usuario)
    .then(() =>
      cy.request('POST', `${BASE_URL}/login`, {
        email: usuario.email,
        password: usuario.password
      })
    )
    .then(resLogin => ({
      usuario,
      token: resLogin.body.authorization
    }));
}

export function gerarAuthTokens() {
  return criarUsuarioELogin(true).then(admin =>
    criarUsuarioELogin(false).then(comum => ({
      admin,
      comum
    }))
  );
}