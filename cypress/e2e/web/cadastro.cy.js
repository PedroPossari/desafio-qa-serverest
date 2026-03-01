import LoginPage from "../../pages/loginPage"
import CadastroPage from "../../pages/cadastroPage"
import { gerarNovoUsuario } from "../../utils/generateNovoUsuario"
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios';

describe("Cadastro de usuários via Front-end", () => {

  beforeEach(() => {
    cy.visit("/login")
  })

  after(() =>{
    deletarUsuariosPorPrefixo('QA_User_');
  })

  it("Cadastrar usuário comum e validar mensagem de sucesso", () => {
    LoginPage.clicarCadastrar()

    const usuario = gerarNovoUsuario(false)
    CadastroPage.cadastrarUsuarioComum(usuario)

    cy.contains("Cadastro realizado com sucesso").should("be.visible")
  })

  it("Cadastrar usuário administrador e validar mensagem de sucesso", () => {
    LoginPage.clicarCadastrar()

    const admin = gerarNovoUsuario(true)
    CadastroPage.cadastrarUsuarioAdministrador(admin)

    cy.contains("Cadastro realizado com sucesso").should("be.visible")
  })
})