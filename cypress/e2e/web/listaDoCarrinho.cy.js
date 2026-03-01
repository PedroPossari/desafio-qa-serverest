import LoginPage from "../../pages/loginPage"
import CadastroPage from "../../pages/cadastroPage"
import UserHomePage from "../../pages/userHomePage"
import ListaDoCarrinhoPage from "../../pages/listaDoCarrinhoPage"
import { gerarNovoUsuario } from "../../utils/generateNovoUsuario"
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios'

describe('Funcionalidades da Lista de Compras via Front-end', () => {
  
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

    it('Aumentar a quantidade de um produto na lista de compras', () => {
      UserHomePage.adicionarPrimeiroProdutoNaLista()
      cy.url().should('include', '/minhaListaDeProdutos')
      
      ListaDoCarrinhoPage.aumentarPrimeiroProduto()
      
      cy.contains('2').first().should('be.visible')
    })

    it('Diminuir a quantidade de um produto na lista de compras', () => {
      UserHomePage.adicionarPrimeiroProdutoNaLista()
      cy.url().should('include', '/minhaListaDeProdutos')
        
      ListaDoCarrinhoPage.aumentarPrimeiroProduto()
        
      cy.contains('2').first().should('be.visible')
  
      ListaDoCarrinhoPage.diminuirPrimeiroProduto()
  
      cy.contains('1').first().should('be.visible')
    })
    
    it('Limpar a lista de compras com sucesso', () => {
      UserHomePage.adicionarPrimeiroProdutoNaLista()
      cy.url().should('include', '/minhaListaDeProdutos')
        
      ListaDoCarrinhoPage.limparLista()

      cy.contains('Seu carrinho está vazio').first().should('be.visible')
    })

    it('Adicionar produtos da lista de compras ao carrinho', () => {
      UserHomePage.adicionarPrimeiroProdutoNaLista()
      cy.url().should('include', '/minhaListaDeProdutos')
        
      ListaDoCarrinhoPage.adicionarTudoAoCarrinho()

      cy.contains('Em construção aguarde').first().should('be.visible')
    })

    it('Retornar para a home pela lista de compras e adicionar novo produto', () => {
      UserHomePage.adicionarPrimeiroProdutoNaLista()
      cy.url().should('include', '/minhaListaDeProdutos')
        
      ListaDoCarrinhoPage.voltarParaPaginaInicial()

      UserHomePage.adicionarPrimeiroProdutoNaLista()

      cy.contains('Lista de Compras').first().should('be.visible')
    })

    it('Adicionar produto repetido à lista deve incrementar quantidade', () => {
      UserHomePage.adicionarPrimeiroProdutoNaLista()
      cy.url().should('include', '/minhaListaDeProdutos')
      
      ListaDoCarrinhoPage.voltarParaPaginaInicial()

      UserHomePage.adicionarPrimeiroProdutoNaLista()
      
      cy.contains('2').first().should('be.visible')
    })

    it('Adicionar produto repetido à lista deve incrementar quantidade', () => {
      UserHomePage.adicionarPrimeiroProdutoNaLista()
      cy.url().should('include', '/minhaListaDeProdutos')
      
      ListaDoCarrinhoPage.voltarParaPaginaInicial()

      UserHomePage.adicionarUltimoProdutoNaLista()

      cy.get(ListaDoCarrinhoPage.elements.nomeDoProduto).should('have.length', 2)
      
    })

  })
})