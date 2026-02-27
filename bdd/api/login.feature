Feature: Autenticação de usuários via API


  # ==================================================
  # POST /login - Autenticação
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Realizar login com sucesso
    Given que existe um usuário cadastrado com email e senha válidos
    When envio uma requisição POST para /login com credenciais válidas
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Login realizado com sucesso"
    And deve retornar um token de autorização válido



  # CENÁRIOS - NEGATIVOS


  Scenario: Não permitir login com senha incorreta
    Given que existe um usuário cadastrado
    And que informo uma senha inválida
    When envio uma requisição POST para /login
    Then o sistema deve retornar status 401
    And deve exibir a mensagem "Email e/ou senha inválidos"


  Scenario: Não permitir login com email inexistente
    Given que informo um email não cadastrado
    When envio uma requisição POST para /login
    Then o sistema deve retornar status 401
    And deve exibir a mensagem "Email e/ou senha inválidos"


  Scenario: Não permitir login com email vazio
    Given que informo o email em branco
    When envio uma requisição POST para /login
    Then o sistema deve retornar status 400


  Scenario: Não permitir login com senha vazia
    Given que informo a senha em branco
    When envio uma requisição POST para /login
    Then o sistema deve retornar status 400



  # CENÁRIOS - VALIDAÇÃO DE REQUISIÇÃO


  Scenario: Não permitir login com corpo vazio
    Given que envio uma requisição POST para /login sem corpo
    When envio a requisição
    Then o sistema deve retornar status 400


  Scenario: Não permitir login com email em formato inválido
    Given que informo um email em formato inválido
    When envio uma requisição POST para /login
    Then o sistema deve retornar status 400


  Scenario: Não permitir login com email como número
    Given que informo o email como valor numérico
    When envio uma requisição POST para /login
    Then o sistema deve retornar status 400


  Scenario: Não permitir login com tipo inválido na senha
    Given que informo a senha como valor numérico
    When envio uma requisição POST para /login
    Then o sistema deve retornar status 400



  # CENÁRIOS - VALIDAÇÃO


  Scenario: Não permitir login sem informar email e senha
    Given que envio a requisição sem informar credenciais
    When envio uma requisição POST para /login
    Then o sistema deve retornar status 400


  Scenario: Não permitir login com corpo da requisição vazio
    Given que envio uma requisição POST para /login sem corpo
    When envio a requisição
    Then o sistema deve retornar status 400



  # CENÁRIOS - SEGURANÇA


  Scenario: Não permitir login com campos nulos
    Given que informo email e senha como nulos
    When envio uma requisição POST para /login
    Then o sistema deve retornar status 400