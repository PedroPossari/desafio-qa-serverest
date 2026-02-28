class AdminHomePage {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      cadastrarUsuariosButton: () => cy.get('[data-testid="cadastrarUsuarios"]'),
      listarUsuariosButton: () => cy.get('[data-testid="listarUsuarios"]'),
      cadastrarProdutosButton: () => cy.get('[data-testid="cadastrarProdutos"]'),
      listarProdutosButton: () => cy.get('[data-testid="listarProdutos"]'),
      relatoriosButton: () => cy.get('[data-testid="relatorios"]')
    }
  
  
    // =========================
    // AÇÕES
    // =========================
  
    clicarCadastrarUsuarios() {
      this.elements.cadastrarUsuariosButton().click()
    }
  
    clicarListarUsuarios() {
      this.elements.listarUsuariosButton().click()
    }
  
    clicarCadastrarProdutos() {
      this.elements.cadastrarProdutosButton().click()
    }
  
    clicarListarProdutos() {
      this.elements.listarProdutosButton().click()
    }
  
    clicarRelatorios() {
      this.elements.relatoriosButton().click()
    }
  
  }
  
  export default new AdminHomePage()