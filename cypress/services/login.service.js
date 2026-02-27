const BASE_URL = 'https://serverest.dev';

export const loginService = {
  realizarLogin(body) {
    return cy.request({
      method: 'POST',
      url: `${BASE_URL}/login`,
      body,
      failOnStatusCode: false
    });
  },

  requisicaoAutenticada(token, endpoint = '/usuarios') {
    return cy.request({
      method: 'GET',
      url: `${BASE_URL}${endpoint}`,
      headers: { Authorization: token },
      failOnStatusCode: false
    });
  }
};