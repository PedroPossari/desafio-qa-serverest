import LoginPage from "../../pages/loginPage"
import CadastroPage from "../../pages/cadastroPage"
import UserHomePage from "../../pages/userHomePage"
import ProdutoPage from "../../pages/produtoPage"
import ListaDoCarrinhoPage from "../../pages/listaDoCarrinhoPage"
import { gerarNovoUsuario } from "../../utils/generateNovoUsuario"
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios'

describe('Funcionalidades da Home do Usuário Comum via Front-end', () => {
  
  after(() => {
    deletarUsuariosPorPrefixo('QA_User_')
  })

  describe('CENÁRIOS POSITIVOS', () => {
    
    beforeEach(() => {
      const usuarioComum = gerarNovoUsuario(false)
      
      cy.wrap(usuarioComum).as('usuario')
      
      cy.visit('/login')
      LoginPage.clicarCadastrar()
      CadastroPage.cadastrarUsuarioComum({
        nome: usuarioComum.nome,
        email: usuarioComum.email,
        password: usuarioComum.password
      })
      
      cy.contains('Cadastro realizado com sucesso').should('be.visible')
      
      cy.visit('/login')
      LoginPage.realizarLogin(usuarioComum.email, usuarioComum.password)
      cy.url().should('include', '/home')
    })

    it('Pesquisar produto com sucesso pela barra de busca', () => {
      cy.get('@usuario').then(() => {
        UserHomePage.pesquisarProduto('Samsung 60 polegadas')
        
        cy.contains('Samsung 60 polegadas').should('be.visible')
      })
    })

    it('Acessar detalhes do produto pela home', () => {
      cy.get('@usuario').then(() => {
        UserHomePage.acessarPrimeiroProduto()
        
        cy.get(ProdutoPage.elements.adicionarNaSacolaButton).should('be.visible')
        cy.get(ProdutoPage.elements.verCarrinhoButton).should('be.visible')
        cy.get(ProdutoPage.elements.voltarHomeButton).should('be.visible')
      })
    })

    it('Adicionar produto à lista de compras pela home', () => {
      cy.get('@usuario').then(() => {
        UserHomePage.adicionarPrimeiroProdutoNaLista()
        
        cy.get(ListaDoCarrinhoPage.elements.adicionarCarrinhoButton).should('be.visible')
        cy.get(ListaDoCarrinhoPage.elements.aumentarQuantidadeButtons).should('be.visible')
        cy.get(ListaDoCarrinhoPage.elements.limparListaButton).should('be.visible')
      })
    })

    it('Acessar lista de compras pelo ícone do carrinho', () => {
      cy.get('@usuario').then(() => {
        
        UserHomePage.irParaCarrinho()
        
        cy.get(ListaDoCarrinhoPage.elements.paginaInicialButton).should('be.visible')
      })
    })
  })
})