class CadastroPage {

  elements = {
    nomeInput: () => cy.get('[data-testid="nome"]'),
    emailInput: () => cy.get('[data-testid="email"]'),
    passwordInput: () => cy.get('[data-testid="password"]'),
    administradorCheckbox: () => cy.get('[data-testid="checkbox"]'),
    cadastrarButton: () => cy.get('[data-testid="cadastrar"]'),
    entrarLink: () => cy.get('[data-testid="entrar"]')
  }

  preencherNome(nome) {
    this.elements.nomeInput().clear().type(nome)
  }

  preencherEmail(email) {
    this.elements.emailInput().clear().type(email)
  }

  preencherPassword(password) {
    this.elements.passwordInput().clear().type(password)
  }

  marcarComoAdministrador() {
    this.elements.administradorCheckbox().check({ force: true })
  }

  marcarComoUsuarioComum() {
    this.elements.administradorCheckbox().uncheck({ force: true })
  }

  clicarCadastrar() {
    this.elements.cadastrarButton().click()
  }

  clicarEntrar() {
    this.elements.entrarLink().click()
  }

  cadastrarUsuarioComum({ nome, email, password }) {
    this.preencherNome(nome)
    this.preencherEmail(email)
    this.preencherPassword(password)
    this.marcarComoUsuarioComum()
    this.clicarCadastrar()
  }

  cadastrarUsuarioAdministrador({ nome, email, password }) {
    this.preencherNome(nome)
    this.preencherEmail(email)
    this.preencherPassword(password)
    this.marcarComoAdministrador()
    this.clicarCadastrar()
  }
}

export default new CadastroPage()