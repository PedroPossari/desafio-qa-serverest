Feature: Gerenciamento de Usuários pelo Administrador via Front-end


  # ==================================================
  # TELA DE LISTAGEM DE USUÁRIOS - ADMINISTRADOR
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Acessar tela de edição de usuário pela listagem
    Given que estou autenticado como usuário administrador
    And que estou na tela de listagem de usuários
    And que existe ao menos um usuário cadastrado no sistema
    When clico na opção de editar usuário
    Then devo ser redirecionado para a tela de edição de usuário
    And devo visualizar os dados do usuário selecionado


  Scenario: Excluir usuário com sucesso pela listagem
    Given que estou autenticado como usuário administrador
    And que estou na tela de listagem de usuários
    And que existe um usuário cadastrado no sistema
    When clico na opção de excluir usuário
    Then o sistema deve remover o usuário selecionado
    And deve exibir a mensagem "Registro excluído com sucesso"
    And o usuário não deve mais aparecer na lista