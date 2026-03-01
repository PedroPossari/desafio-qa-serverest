class AdminRegistroDeUsuarioPage {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      nomeInput: () => cy.get('[data-testid="nome"]'),
      emailInput: () => cy.get('[data-testid="email"]'),
      passwordInput: () => cy.get('[data-testid="password"]'),
      administradorCheckbox: () => cy.get('[data-testid="checkbox"]'),
      cadastrarUsuarioButton: () => cy.get('[data-testid="cadastrarUsuario"]')
    }
  
  
    // =========================
    // AÇÕES
    // =========================
  
    preencherNome(nome) {
      this.elements.nomeInput().clear().type(nome)
    }
  
    preencherEmail(email) {
      this.elements.emailInput().clear().type(email)
    }
  
    preencherPassword(password) {
      this.elements.passwordInput().clear().type(password)
    }
  
    tornarAdministrador() {
      this.elements.administradorCheckbox().check()
    }
  
    tornarUsuarioComum() {
      this.elements.administradorCheckbox().uncheck()
    }
  
    clicarCadastrarUsuario() {
      this.elements.cadastrarUsuarioButton().click()
    }
  
  
    // =========================
    // AÇÃO COMPLETA
    // =========================
  
    cadastrarUsuario({ nome, email, password, administrador = false }) {
      this.preencherNome(nome)
      this.preencherEmail(email)
      this.preencherPassword(password)
  
      if (administrador) {
        this.tornarAdministrador()
      } else {
        this.tornarUsuarioComum()
      }
  
      this.clicarCadastrarUsuario()
    }
  
  }
  
  export default new AdminRegistroDeUsuarioPage()