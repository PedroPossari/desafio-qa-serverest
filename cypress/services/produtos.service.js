const BASE_URL = 'https://serverest.dev';

export const produtosService = {

  criar(body, token) {
    return cy.request({
      method: 'POST',
      url: `${BASE_URL}/produtos`,
      headers: token ? { Authorization: token } : {},
      body,
      failOnStatusCode: false
    });
  },

  listar(query = '') {
    return cy.request({
      method: 'GET',
      url: `${BASE_URL}/produtos${query}`,
      failOnStatusCode: false
    });
  },

  buscarPorId(id) {
    return cy.request({
      method: 'GET',
      url: `${BASE_URL}/produtos/${id}`,
      failOnStatusCode: false
    });
  },

  atualizar(id, body, token) {
    return cy.request({
      method: 'PUT',
      url: `${BASE_URL}/produtos/${id}`,
      headers: token ? { Authorization: token } : {},
      body,
      failOnStatusCode: false
    });
  },

  deletar(id, token) {
    return cy.request({
      method: 'DELETE',
      url: `${BASE_URL}/produtos/${id}`,
      headers: token ? { Authorization: token } : {},
      failOnStatusCode: false
    });
  }

};