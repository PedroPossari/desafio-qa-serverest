class AdminNavbarPage {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      homeLink: () => cy.get('[data-testid="home"]'),
      cadastrarUsuariosLink: () => cy.get('[data-testid="cadastrar-usuarios"]'),
      cadastrarProdutosLink: () => cy.get('[data-testid="cadastrar-produtos"]'),
      listarProdutosLink: () => cy.get('[data-testid="listar-produtos"]'),
      relatoriosLink: () => cy.get('[data-testid="link-relatorios"]'),
      logoutLink: () => cy.get('[data-testid="logout"]')
    }
  
  
    // =========================
    // AÇÕES
    // =========================
  
    clicarHome() {
      this.elements.homeLink().click()
    }
  
    clicarCadastrarUsuarios() {
      this.elements.cadastrarUsuariosLink().click()
    }
  
    clicarCadastrarProdutos() {
      this.elements.cadastrarProdutosLink().click()
    }
  
    clicarListarProdutos() {
      this.elements.listarProdutosLink().click()
    }
  
    clicarRelatorios() {
      this.elements.relatoriosLink().click()
    }
  
    clicarLogout() {
      this.elements.logoutLink().click()
    }
  
  }
  
  export default new AdminNavbarPage()