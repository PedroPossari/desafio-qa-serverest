Feature: Cadastro de usuários via Front-end


  # ==================================================
  # TELA DE CADASTRO DE USUÁRIOS
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Cadastrar usuário comum com sucesso pela interface
    Given que acesso a tela de cadastro de usuários
    And que preencho todos os campos obrigatórios com dados válidos
    And que não marco a opção de administrador
    When clico no botão de cadastrar
    Then o sistema deve exibir a mensagem "Cadastro realizado com sucesso"
    And o usuário deve ser cadastrado como usuário comum
    And devo ser redirecionado para a tela de listagem ou login


  Scenario: Cadastrar usuário administrador com sucesso pela interface
    Given que acesso a tela de cadastro de usuários
    And que preencho todos os campos obrigatórios com dados válidos
    And que marco a opção de administrador
    When clico no botão de cadastrar
    Then o sistema deve exibir a mensagem "Cadastro realizado com sucesso"
    And o usuário deve ser cadastrado como administrador
    And devo ser redirecionado para a tela de listagem ou login