import LoginPage from "../../pages/loginPage"
import CadastroPage from "../../pages/cadastroPage"
import AdminHomePage from "../../pages/adminHomePage"
import AdminRegistroDeUsuarioPage from "../../pages/adminRegistroDeUsuariosPage"
import AdminListaDeUsuariosPage from "../../pages/adminListaDeUsuariosPage"
import { gerarNovoUsuario } from "../../utils/generateNovoUsuario"
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios'

describe('Cadastro de Usuários pelo Administrador via Front-end', () => {
  
  after(() => {
    deletarUsuariosPorPrefixo('QA_User_')
  })

  describe('CENÁRIOS POSITIVOS', () => {
    
    beforeEach(() => {
      const usuarioAdmin = gerarNovoUsuario(true)
      
      cy.wrap(usuarioAdmin).as('usuario')
      
      cy.visit('/login')
      LoginPage.clicarCadastrar()
      CadastroPage.cadastrarUsuarioAdministrador({
        nome: usuarioAdmin.nome,
        email: usuarioAdmin.email,
        password: usuarioAdmin.password
      })
      
      cy.contains('Cadastro realizado com sucesso').should('be.visible')
      
      cy.visit('/login')
      LoginPage.realizarLogin(usuarioAdmin.email, usuarioAdmin.password)
      cy.url().should('include', '/home')
      
      cy.contains('Este é seu sistema para administrar seu ecommerce.').should('be.visible')
      
      AdminHomePage.clicarCadastrarUsuarios()
      cy.url().should('include', '/cadastrarusuarios')
    })

    it('Cadastrar usuário comum com sucesso pelo administrador', () => {
      const novoUsuario = gerarNovoUsuario(false)
      
      AdminRegistroDeUsuarioPage.cadastrarUsuario({
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        password: novoUsuario.password,
        administrador: false
      })
      
      AdminListaDeUsuariosPage.encontrarUsuarioPorNome(novoUsuario.nome, novoUsuario.email)
      
      cy.contains(novoUsuario.nome).should('be.visible')
      cy.contains(novoUsuario.email).should('be.visible')
      cy.contains('false').should('be.visible')
    })

    it('Cadastrar usuário administrador com sucesso pelo administrador', () => {
      const novoAdmin = gerarNovoUsuario(true)
      
      AdminRegistroDeUsuarioPage.cadastrarUsuario({
        nome: novoAdmin.nome,
        email: novoAdmin.email,
        password: novoAdmin.password,
        administrador: true
      })
      
      AdminListaDeUsuariosPage.encontrarUsuarioPorNome(novoAdmin.nome, novoAdmin.email)
      
      cy.contains(novoAdmin.nome).should('be.visible')
      cy.contains(novoAdmin.email).should('be.visible')
      cy.contains('true').should('be.visible')
    })
  })
})