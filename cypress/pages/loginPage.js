class LoginPage {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      emailInput: () => cy.get('[data-testid="email"]'),
      senhaInput: () => cy.get('[data-testid="senha"]'),
      entrarButton: () => cy.get('[data-testid="entrar"]'),
      cadastrarLink: () => cy.get('[data-testid="cadastrar"]')
    }
  
  
    // =========================
    // AÇÕES
    // =========================
  
    preencherEmail(email) {
      this.elements.emailInput().clear().type(email)
    }
  
    preencherSenha(senha) {
      this.elements.senhaInput().clear().type(senha)
    }
  
    clicarEntrar() {
      this.elements.entrarButton().click()
    }
  
    clicarCadastrar() {
      this.elements.cadastrarLink().click()
    }
  
    // =========================
    // AÇÃO COMPLETA (opcional)
    // =========================
  
    realizarLogin(email, senha) {
      this.preencherEmail(email)
      this.preencherSenha(senha)
      this.clicarEntrar()
    }
  
  }
  
  export default new LoginPage()