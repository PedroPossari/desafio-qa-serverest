import LoginPage from "../../pages/loginPage"
import CadastroPage from "../../pages/cadastroPage"
import AdminHomePage from "../../pages/adminHomePage"
import AdminRegistroDeUsuarioPage from "../../pages/adminRegistroDeUsuariosPage"
import AdminListaDeUsuariosPage from "../../pages/adminListaDeUsuariosPage"
import AdminRegistroDeProduto from "../../pages/adminRegistroDeProdutosPage"
import AdminListaDeProdutos from "../../pages/adminListaDeProdutosPage"
import { gerarNovoUsuario } from "../../utils/generateNovoUsuario"
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios'

describe('Funcionalidades da Home do Administrador via Front-end', () => {
  
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
    })

    it('Acessar tela de cadastro de usuários pela home do administrador', () => {
      AdminHomePage.clicarCadastrarUsuarios()
      
      cy.url().should('include', '/cadastrarusuarios')
      
      AdminRegistroDeUsuarioPage.elements.nomeInput().should('be.visible')
      AdminRegistroDeUsuarioPage.elements.emailInput().should('be.visible')
      AdminRegistroDeUsuarioPage.elements.passwordInput().should('be.visible')
      AdminRegistroDeUsuarioPage.elements.administradorCheckbox().should('be.visible')
      AdminRegistroDeUsuarioPage.elements.cadastrarUsuarioButton().should('be.visible')
    })

    it('Acessar tela de listagem de usuários pela home do administrador', () => {
      AdminHomePage.clicarListarUsuarios()
      
      cy.url().should('include', '/listarusuarios')
      
      AdminListaDeUsuariosPage.elements.editarButtons().should('be.visible')
      AdminListaDeUsuariosPage.elements.excluirButtons().should('be.visible')
    })

    it('Acessar tela de cadastro de produtos pela home do administrador', () => {
      AdminHomePage.clicarCadastrarProdutos()
      
      cy.url().should('include', '/cadastrarprodutos')
      
      AdminRegistroDeProduto.elements.nomeInput().should('be.visible')
      AdminRegistroDeProduto.elements.precoInput().should('be.visible')
      AdminRegistroDeProduto.elements.descricaoInput().should('be.visible')
      AdminRegistroDeProduto.elements.quantityInput().should('be.visible')
      AdminRegistroDeProduto.elements.imagemInput().should('be.visible')
      AdminRegistroDeProduto.elements.cadastrarProdutoButton().should('be.visible')
    })

    it('Acessar tela de listagem de produtos pela home do administrador', () => {
      AdminHomePage.clicarListarProdutos()
      
      cy.url().should('include', '/listarprodutos')
      
      AdminListaDeProdutos.elements.editarButtons().should('be.visible')
      AdminListaDeProdutos.elements.excluirButtons().should('be.visible')
    })

    it('Acessar tela de relatórios pela home do administrador', () => {
      AdminHomePage.clicarRelatorios()
      
      cy.url().should('include', '/relatorios')
      
      cy.contains('Em construção aguarde').should('be.visible')
    })
  })
})