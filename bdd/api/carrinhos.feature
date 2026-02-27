Feature: Gestão de carrinhos via API


  # ==================================================
  # POST /carrinhos - Cadastro
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Cadastrar carrinho com sucesso
    Given que estou autenticado com um usuário válido
    And que não possuo carrinho cadastrado
    And que existem produtos disponíveis em estoque
    And que possuo dados válidos para cadastro do carrinho
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 201
    And deve exibir a mensagem "Cadastro realizado com sucesso"
    And deve retornar o id do carrinho
    And deve reduzir a quantidade dos produtos no estoque



  # CENÁRIOS - AUTORIZAÇÃO


  Scenario: Não permitir cadastro sem token
    Given que não possuo token de autenticação
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 401
    And deve exibir mensagem de token inválido


  Scenario: Não permitir cadastro com token inválido
    Given que possuo um token inválido
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 401
    And deve exibir mensagem de token inválido


  Scenario: Não permitir cadastro com token expirado
    Given que possuo um token expirado
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 401
    And deve exibir mensagem de token inválido



  # CENÁRIOS - NEGÓCIO


  Scenario: Não permitir cadastrar mais de um carrinho por usuário
    Given que estou autenticado com um usuário que já possui carrinho
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Não é permitido ter mais de 1 carrinho"


  Scenario: Não permitir produto duplicado no carrinho
    Given que possuo produtos repetidos no corpo da requisição
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Não é permitido possuir produto duplicado"


  Scenario: Não permitir cadastro com produto inexistente
    Given que informo um id de produto inexistente
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Produto não encontrado"


  Scenario: Não permitir cadastro com quantidade maior que o estoque
    Given que informo quantidade superior ao estoque disponível
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Produto não possui quantidade suficiente"



  # CENÁRIOS - VALIDAÇÃO


  Scenario: Não permitir cadastro sem informar produtos
    Given que envio a requisição sem informar produtos
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com lista de produtos vazia
    Given que informo uma lista de produtos vazia
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com quantidade zero
    Given que informo produto com quantidade zero
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com quantidade negativa
    Given que informo produto com quantidade negativa
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 400



  # CENÁRIOS - PAYLOAD INVÁLIDO


  Scenario: Não permitir cadastro com corpo vazio
    Given que envio uma requisição POST para /carrinhos sem corpo
    When envio a requisição
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com campos nulos
    Given que informo produtos com campos nulos
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com tipos inválidos
    Given que informo dados de produtos com tipos inválidos
    When envio uma requisição POST para /carrinhos
    Then o sistema deve retornar status 400