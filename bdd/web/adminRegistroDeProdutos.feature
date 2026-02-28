Feature: Cadastro de Produtos pelo Administrador via Front-end


  # ==================================================
  # TELA DE CADASTRO DE PRODUTOS - ADMINISTRADOR
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Cadastrar produto com sucesso pelo administrador
    Given que estou autenticado como usuário administrador
    And que estou na tela de cadastro de produtos
    And que preencho os campos nome, preço, descrição e quantidade com dados válidos
    When clico no botão de cadastrar produto
    Then o sistema deve exibir a mensagem "Cadastro realizado com sucesso"
    And o produto deve ser cadastrado no sistema
    And devo visualizar o produto na lista de produtos