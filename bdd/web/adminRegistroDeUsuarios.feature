Feature: Cadastro de Usuários pelo Administrador via Front-end


  # ==================================================
  # TELA DE CADASTRO DE USUÁRIOS - ADMINISTRADOR
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Cadastrar usuário comum com sucesso pelo administrador
    Given que estou autenticado como usuário administrador
    And que estou na tela de cadastro de usuários
    And que preencho os campos nome, email e senha com dados válidos
    And que não marco a opção de administrador
    When clico no botão de cadastrar usuário
    Then o sistema deve exibir a mensagem "Cadastro realizado com sucesso"
    And o usuário deve ser cadastrado como usuário comum
    And devo visualizar o usuário na lista de usuários


  Scenario: Cadastrar usuário administrador com sucesso pelo administrador
    Given que estou autenticado como usuário administrador
    And que estou na tela de cadastro de usuários
    And que preencho os campos nome, email e senha com dados válidos
    And que marco a opção de administrador
    When clico no botão de cadastrar usuário
    Then o sistema deve exibir a mensagem "Cadastro realizado com sucesso"
    And o usuário deve ser cadastrado como administrador
    And devo visualizar o usuário na lista de usuários