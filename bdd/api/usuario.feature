Feature: Gestão de usuários via API


  # ==================================================
  # POST /usuarios - Cadastro
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Cadastrar usuário administrador com sucesso
    Given que possuo dados válidos de um usuário administrador
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 201
    And deve exibir a mensagem "Cadastro realizado com sucesso"
    And deve retornar o id do usuário


  Scenario: Cadastrar usuário comum com sucesso
    Given que possuo dados válidos de um usuário não administrador
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 201
    And deve exibir a mensagem "Cadastro realizado com sucesso"
    And deve retornar o id do usuário



  # CENÁRIOS - DUPLICIDADE


  Scenario: Não permitir cadastro com email já utilizado
    Given que já existe um usuário cadastrado com um email válido
    When envio uma requisição POST para /usuarios com o mesmo email
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Este email já está sendo usado"



  # CENÁRIOS - VALIDAÇÃO DE EMAIL


  Scenario: Não permitir cadastro com email sem arroba
    Given que possuo dados de usuário com email inválido sem arroba
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com email sem domínio
    Given que possuo dados de usuário com email inválido sem domínio
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com email vazio
    Given que possuo dados de usuário com email em branco
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 400



  # CENÁRIOS - CAMPOS OBRIGATÓRIOS


  Scenario: Não permitir cadastro sem informar nome
    Given que possuo dados de usuário sem o campo nome
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro sem informar senha
    Given que possuo dados de usuário sem o campo password
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro sem informar perfil de administrador
    Given que possuo dados de usuário sem o campo administrador
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 400



  # CENÁRIOS - PAYLOAD INVÁLIDO


  Scenario: Não permitir cadastro com corpo da requisição vazio
    Given que envio uma requisição POST para /usuarios sem corpo
    When envio a requisição
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com todos os campos em branco
    Given que possuo dados de usuário com todos os campos vazios
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com campos nulos
    Given que possuo dados de usuário com campos nulos
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 400



  # CENÁRIOS - TIPOS DE DADOS INVÁLIDOS


  Scenario: Não permitir cadastro com administrador inválido
    Given que possuo dados de usuário com valor inválido no campo administrador
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 400


  Scenario: Não permitir cadastro com senha muito curta
    Given que possuo dados de usuário com senha inválida
    When envio uma requisição POST para /usuarios
    Then o sistema deve retornar status 400