Feature: Funcionalidades da Home do Administrador via Front-end


  # ==================================================
  # TELA HOME - USUÁRIO ADMINISTRADOR
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Acessar tela de cadastro de usuários pela home do administrador
    Given que estou autenticado como usuário administrador
    And que estou na tela home do administrador
    When clico na opção de cadastrar novo usuário
    Then devo ser redirecionado para a tela de cadastro de usuários
    And devo visualizar o formulário de cadastro


  Scenario: Acessar tela de listagem de usuários pela home do administrador
    Given que estou autenticado como usuário administrador
    And que estou na tela home do administrador
    When clico na opção de listar usuários
    Then devo ser redirecionado para a tela de listagem de usuários
    And devo visualizar a lista de usuários cadastrados


  Scenario: Acessar tela de cadastro de produtos pela home do administrador
    Given que estou autenticado como usuário administrador
    And que estou na tela home do administrador
    When clico na opção de cadastrar produtos
    Then devo ser redirecionado para a tela de cadastro de produtos
    And devo visualizar o formulário de cadastro de produtos


  Scenario: Acessar tela de listagem de produtos pela home do administrador
    Given que estou autenticado como usuário administrador
    And que estou na tela home do administrador
    When clico na opção de listar produtos
    Then devo ser redirecionado para a tela de listagem de produtos
    And devo visualizar a lista de produtos cadastrados


  Scenario: Acessar tela de relatórios pela home do administrador
    Given que estou autenticado como usuário administrador
    And que estou na tela home do administrador
    When clico na opção de ver relatórios
    Then devo ser redirecionado para a tela de relatórios
    And devo visualizar as informações gerenciais disponíveis