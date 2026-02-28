class UserNavbarPage {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      homeLink: () => cy.get('[data-testid="home"]'),
      listaDeComprasLink: () => cy.get('[data-testid="lista-de-compras"]'),
      carrinhoLink: () => cy.get('[data-testid="carrinho"]'),
      logoutButton: () => cy.get('[data-testid="logout"]')
    }
  
    // =========================
    // AÇÕES
    // =========================
  
    clicarHome() {
      this.elements.homeLink().click()
    }
  
    clicarListaDeCompras() {
      this.elements.listaDeComprasLink().click()
    }
  
    clicarCarrinho() {
      this.elements.carrinhoLink().click()
    }

    clicarLogout() {
        this.elements.logoutButton().click()
    }
  
  }
  
  export default new UserNavbarPage()