import LoginPage from "../../pages/loginPage"
import CadastroPage from "../../pages/cadastroPage"
import AdminHomePage from "../../pages/adminHomePage"
import AdminRegistroDeProduto from "../../pages/adminRegistroDeProdutosPage"
import AdminListaDeProdutos from "../../pages/adminListaDeProdutosPage"
import { gerarNovoUsuario } from "../../utils/generateNovoUsuario"
import { gerarNovoProduto } from "../../utils/generateProduto"
import { deletarProdutosPorPrefixo } from '../../utils/deleteProdutos'
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios';
import { deletarCarrinhosPorPrefixoUsuario } from '../../utils/deleteCarrinhos';

describe('Cadastro de Produtos pelo Administrador via Front-end', () => {
  
  after(() => {
    deletarCarrinhosPorPrefixoUsuario('QA_User_');
    deletarProdutosPorPrefixo('QA_Produto_');
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
      
      AdminHomePage.clicarCadastrarProdutos()
      cy.url().should('include', '/cadastrarprodutos')
    })

    it('Cadastrar produto com sucesso pelo administrador', () => {
      const produto = gerarNovoProduto()
      
      AdminRegistroDeProduto.preencherNome(produto.nome)
      AdminRegistroDeProduto.preencherPreco(produto.preco)
      AdminRegistroDeProduto.preencherDescricao(produto.descricao)
      AdminRegistroDeProduto.preencherQuantidade(produto.quantidade)
      AdminRegistroDeProduto.clicarCadastrarProduto()
      
      AdminListaDeProdutos.encontrarProdutoPorNome(produto.nome, produto.preco)
      
      cy.contains(produto.nome).should('be.visible')
    })
  })
})