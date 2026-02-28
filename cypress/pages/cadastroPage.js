class CadastroPage {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      nomeInput: () => cy.get('[data-testid="nome"]'),
      emailInput: () => cy.get('[data-testid="email"]'),
      passwordInput: () => cy.get('[data-testid="password"]'),
      administradorCheckbox: () => cy.get('[data-testid="checkbox"]'),
      cadastrarButton: () => cy.get('[data-testid="cadastrar"]'),
      entrarLink: () => cy.get('[data-testid="entrar"]')
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
  
    clicarCadastrar() {
      this.elements.cadastrarButton().click()
    }
  
    clicarEntrar() {
      this.elements.entrarLink().click()
    }
  
  
    // =========================
    // AÇÃO COMPLETA
    // =========================
  
    realizarCadastro({ nome, email, password, administrador = false }) {
      this.preencherNome(nome)
      this.preencherEmail(email)
      this.preencherPassword(password)
  
      if (administrador) {
        this.tornarAdministrador()
      } else {
        this.tornarUsuarioComum()
      }
  
      this.clicarCadastrar()
    }
  
  }
  
  export default new CadastroPage()