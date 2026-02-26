Feature: Gestão de produtos via API


  # ==================================================
  # POST /produtos - Cadastro
  # ==================================================


  # CENÁRIOS POSITIVOS


  Scenario: Cadastrar produto com sucesso como administrador
    Given que estou autenticado como usuário administrador
    And que possuo dados válidos de um produto
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 201
    And deve exibir a mensagem "Cadastro realizado com sucesso"
    And deve retornar o id do produto



  # CENÁRIOS DE AUTORIZAÇÃO


  Scenario: Não permitir cadastro sem token
    Given que não possuo token de autenticação
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 401
    And deve exibir mensagem de token inválido


  Scenario: Não permitir cadastro com token inválido
    Given que possuo um token inválido
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 401
    And deve exibir mensagem de token inválido


  Scenario: Não permitir cadastro com token expirado
    Given que possuo um token expirado
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 401
    And deve exibir mensagem de token inválido



  # CENÁRIOS DE PERMISSÃO


  Scenario: Não permitir cadastro por usuário não administrador
    Given que estou autenticado como usuário não administrador
    And que possuo dados válidos de um produto
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 403
    And deve exibir a mensagem "Rota exclusiva para administradores"



  # CENÁRIOS DE DUPLICIDADE


  Scenario: Não permitir cadastro de produto com nome já utilizado
    Given que existe um produto cadastrado com determinado nome
    When envio uma requisição POST para /produtos com o mesmo nome
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Já existe produto com esse nome"



  # CENÁRIOS DE VALIDAÇÃO


  Scenario: Não permitir cadastro sem informar nome
    Given que possuo dados de produto sem o campo nome
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro sem informar preço
    Given que possuo dados de produto sem o campo preco
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro sem informar quantidade
    Given que possuo dados de produto sem o campo quantidade
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com preço negativo
    Given que possuo dados de produto com preço negativo
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com quantidade negativa
    Given que possuo dados de produto com quantidade negativa
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 400



  # CENÁRIOS DE PAYLOAD INVÁLIDO


  Scenario: Não permitir cadastro com corpo da requisição vazio
    Given que envio uma requisição POST para /produtos sem corpo
    When envio a requisição
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com campos nulos
    Given que possuo dados de produto com campos nulos
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com tipos inválidos
    Given que possuo dados de produto com tipos inválidos
    When envio uma requisição POST para /produtos
    Then o sistema deve retornar status 400