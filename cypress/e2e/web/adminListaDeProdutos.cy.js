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

describe('Gerenciamento de Produtos pelo Administrador via Front-end', () => {
  
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
    })

    it('Acessar tela de edição de produto pela listagem', () => {
      const novoProduto = gerarNovoProduto()
      
      AdminHomePage.clicarCadastrarProdutos()
      AdminRegistroDeProduto.cadastrarProduto({
        nome: novoProduto.nome,
        preco: novoProduto.preco,
        descricao: novoProduto.descricao,
        quantity: novoProduto.quantidade
      })
      
      AdminListaDeProdutos.encontrarProdutoPorNome(novoProduto.nome, novoProduto.preco)
      
      AdminListaDeProdutos.clicarEditarPorNome(novoProduto.nome)
    })

    it('Excluir produto com sucesso pela listagem', () => {
      const novoProduto = gerarNovoProduto()
      
      AdminHomePage.clicarCadastrarProdutos()
      AdminRegistroDeProduto.cadastrarProduto({
        nome: novoProduto.nome,
        preco: novoProduto.preco,
        descricao: novoProduto.descricao,
        quantity: novoProduto.quantidade
      })
      
      AdminListaDeProdutos.encontrarProdutoPorNome(novoProduto.nome, novoProduto.preco)
      
      AdminListaDeProdutos.clicarExcluirPorNome(novoProduto.nome)
      
      cy.contains(novoProduto.nome).should('not.exist')
    })
  })
})