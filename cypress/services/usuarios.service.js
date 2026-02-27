const BASE_URL = 'https://serverest.dev';

export const usuariosService = {

  criarUsuario(body) {
    return cy.request({
      method: 'POST',
      url: `${BASE_URL}/usuarios`,
      body,
      failOnStatusCode: false
    });
  },

  listarUsuarios(query = '') {
    return cy.request({
      method: 'GET',
      url: `${BASE_URL}/usuarios${query}`,
      failOnStatusCode: false
    });
  },

  buscarUsuarioPorId(id) {
    return cy.request({
      method: 'GET',
      url: `${BASE_URL}/usuarios/${id}`,
      failOnStatusCode: false
    });
  },

  atualizarUsuario(id, body) {
    return cy.request({
      method: 'PUT',
      url: `${BASE_URL}/usuarios/${id}`,
      body,
      failOnStatusCode: false
    });
  },

  deletarUsuario(id) {
    return cy.request({
      method: 'DELETE',
      url: `${BASE_URL}/usuarios/${id}`,
      failOnStatusCode: false
    });
  }

};