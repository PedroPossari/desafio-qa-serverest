const BASE_URL = 'https://serverest.dev';

export const carrinhoService = {

  criar(body, token) {
    return cy.request({
      method: 'POST',
      url: `${BASE_URL}/carrinhos`,
      headers: token ? { Authorization: token } : {},
      body,
      failOnStatusCode: false
    });
  },

  listar(query = '') {
    return cy.request({
      method: 'GET',
      url: `${BASE_URL}/carrinhos${query}`,
      failOnStatusCode: false
    });
  },

  buscarPorId(id) {
    return cy.request({
      method: 'GET',
      url: `${BASE_URL}/carrinhos/${id}`,
      failOnStatusCode: false
    });
  },

  concluirCompra(token) {
    return cy.request({
      method: 'DELETE',
      url: `${BASE_URL}/carrinhos/concluir-compra`,
      headers: token ? { Authorization: token } : {},
      failOnStatusCode: false
    });
  },

  cancelarCompra(token) {
    return cy.request({
      method: 'DELETE',
      url: `${BASE_URL}/carrinhos/cancelar-compra`,
      headers: token ? { Authorization: token } : {},
      failOnStatusCode: false
    });
  }

};