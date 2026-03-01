import LoginPage from "../../pages/loginPage"
import CadastroPage from "../../pages/cadastroPage"
import UserHomePage from "../../pages/userHomePage"
import ProdutoPage from "../../pages/produtoPage"
import ListaDoCarrinhoPage from "../../pages/listaDoCarrinhoPage"
import { gerarNovoUsuario } from "../../utils/generateNovoUsuario"
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios'

describe('Funcionalidades da Tela de Detalhes do Produto via Front-end', () => {
  
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
      
      UserHomePage.acessarPrimeiroProduto()
      cy.url().should('include', '/detalhesProduto')
    })

    it('Adicionar produto à lista de compras pela tela de detalhes', () => {
      ProdutoPage.adicionarNaSacola()
      
      cy.url().should('include', '/minhaListaDeProdutos')
      
      ListaDoCarrinhoPage.elements.paginaInicialButton().should('be.visible')
      ListaDoCarrinhoPage.elements.adicionarCarrinhoButton().should('be.visible')
      ListaDoCarrinhoPage.elements.limparListaButton().should('be.visible')
      ListaDoCarrinhoPage.elements.diminuirQuantidadeButtons().should('be.visible')
      ListaDoCarrinhoPage.elements.aumentarQuantidadeButtons().should('be.visible')
    })

    it('Voltar para a home a partir da tela de detalhes do produto', () => {
      ProdutoPage.voltarParaHome()
      
      cy.url().should('include', '/home')
      
      UserHomePage.elements.campoPesquisa().should('be.visible')
      UserHomePage.elements.botaoPesquisar().should('be.visible')
      UserHomePage.elements.productDetailLinks().should('have.length.at.least', 1)
    })

    it('Acessar lista de compras pelo ícone do carrinho na tela de detalhes', () => {
      ProdutoPage.irParaCarrinho()
      
      ListaDoCarrinhoPage.elements.paginaInicialButton().should('be.visible')
    })
  })
})