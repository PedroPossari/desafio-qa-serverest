import LoginPage from "../../pages/loginPage"
import CadastroPage from "../../pages/cadastroPage"
import AdminHomePage from "../../pages/adminHomePage"
import AdminRegistroDeUsuarioPage from "../../pages/adminRegistroDeUsuariosPage"
import AdminListaDeUsuariosPage from "../../pages/adminListaDeUsuariosPage"
import { gerarNovoUsuario } from "../../utils/generateNovoUsuario"
import { deletarUsuariosPorPrefixo } from '../../utils/deleteUsuarios'

describe('Gerenciamento de Usuários pelo Administrador via Front-end', () => {
  
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

    it('Acessar tela de edição de usuário pela listagem', () => {
      const novoUsuario = gerarNovoUsuario(false)
      
      AdminHomePage.clicarCadastrarUsuarios()
      AdminRegistroDeUsuarioPage.cadastrarUsuario({
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        password: novoUsuario.password,
        administrador: false
      })
      
      AdminListaDeUsuariosPage.encontrarUsuarioPorNome(novoUsuario.nome, novoUsuario.email)
      
      AdminListaDeUsuariosPage.clicarEditarPorNome(novoUsuario.nome)
    })

    it('Excluir usuário com sucesso pela listagem', () => {
      const novoUsuario = gerarNovoUsuario(false)
      
      AdminHomePage.clicarCadastrarUsuarios()
      AdminRegistroDeUsuarioPage.cadastrarUsuario({
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        password: novoUsuario.password,
        administrador: false
      })
      
      AdminListaDeUsuariosPage.encontrarUsuarioPorNome(novoUsuario.nome, novoUsuario.email)
      
      AdminListaDeUsuariosPage.clicarExcluirPorNome(novoUsuario.nome)
      
      cy.contains(novoUsuario.nome).should('not.exist')
      cy.contains(novoUsuario.email).should('not.exist')
    })
  })
})