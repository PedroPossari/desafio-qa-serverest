import LoginPage from "../../pages/loginPage"
import CadastroPage from "../../pages/cadastroPage"
import UserNavbarPage from "../../pages/userNavbarPage"
import { gerarNovoUsuario } from "../../utils/generateNovoUsuario"
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios'

describe('Login de usuários via Front-end', () => {
  
  after(() => {
    deletarUsuariosPorPrefixo('QA_User_')
  })

  describe('CENÁRIOS POSITIVOS - TELA DE LOGIN', () => {
    
    it('Realizar login com usuário comum e acessar homepage padrão', () => {
      cy.visit('/login')
      
      const usuarioComum = gerarNovoUsuario(false)
      
      cy.visit('/login')
      LoginPage.clicarCadastrar()
      CadastroPage.cadastrarUsuarioComum({
        nome: usuarioComum.nome,
        email: usuarioComum.email,
        password: usuarioComum.password
      })
      
      cy.contains('Cadastro realizado com sucesso').should('be.visible')
      
      cy.visit('/login')
      
      LoginPage.preencherEmail(usuarioComum.email)
      LoginPage.preencherSenha(usuarioComum.password)
      
      LoginPage.clicarEntrar()
      
      cy.url().should('include', '/home')
      
      cy.contains('Serverest Store').should('be.visible')
      cy.get('[data-testid="pesquisar"]').should('be.visible')
      cy.contains('Produtos').should('be.visible')
    })

    it('Realizar login com usuário administrador e acessar homepage administrativa', () => {
      cy.visit('/login')
      
      const usuarioAdmin = gerarNovoUsuario(true)
      
      cy.visit('/login')
      LoginPage.clicarCadastrar()
      CadastroPage.cadastrarUsuarioAdministrador({
        nome: usuarioAdmin.nome,
        email: usuarioAdmin.email,
        password: usuarioAdmin.password
      })
      
      cy.contains('Cadastro realizado com sucesso').should('be.visible')
      
      cy.visit('/login')
      
      LoginPage.preencherEmail(usuarioAdmin.email)
      LoginPage.preencherSenha(usuarioAdmin.password)
      
      LoginPage.clicarEntrar()
      
      cy.url().should('include', '/home')
      
      cy.contains('Este é seu sistema para administrar seu ecommerce.').should('be.visible')
      cy.contains(usuarioAdmin.nome).should('be.visible')
    })
  })

  describe('CENÁRIOS POSITIVOS - LOGOUT', () => {
    
    it('Realizar logout com sucesso', () => {
      const usuario = gerarNovoUsuario(false)
      
      cy.visit('/login')
      LoginPage.clicarCadastrar()
      CadastroPage.cadastrarUsuarioComum({
        nome: usuario.nome,
        email: usuario.email,
        password: usuario.password
      })
      cy.contains('Cadastro realizado com sucesso').should('be.visible')
      
      cy.visit('/login')
      LoginPage.realizarLogin(usuario.email, usuario.password)
      cy.url().should('include', '/home')
      
      UserNavbarPage.elements.homeLink().should('be.visible')
      UserNavbarPage.elements.listaDeComprasLink().should('be.visible')
      UserNavbarPage.elements.carrinhoLink().should('be.visible')
      
      UserNavbarPage.clicarLogout()
      
      cy.url().should('include', '/login')
      
      cy.get('[data-testid="email"]').should('be.visible')
      cy.get('[data-testid="senha"]').should('be.visible')
      cy.get('[data-testid="entrar"]').should('be.visible')
      
      cy.visit('/home', { failOnStatusCode: false })
      cy.url().should('include', '/login')
    })
  })
})