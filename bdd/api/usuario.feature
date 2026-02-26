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


  # ==================================================
  # GET /usuarios - Listagem
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Listar todos os usuários com sucesso
    Given que existem usuários cadastrados no sistema
    When envio uma requisição GET para /usuarios
    Then o sistema deve retornar status 200
    And deve retornar a lista de usuários
    And deve retornar a quantidade total de registros


  Scenario: Filtrar usuários por nome
    Given que existem usuários cadastrados com nomes diferentes
    When envio uma requisição GET para /usuarios com filtro de nome
    Then o sistema deve retornar status 200
    And deve retornar apenas os usuários com o nome informado


  Scenario: Filtrar usuários por email
    Given que existe um usuário cadastrado com email específico
    When envio uma requisição GET para /usuarios com filtro de email
    Then o sistema deve retornar status 200
    And deve retornar apenas o usuário correspondente


  Scenario: Filtrar usuários por perfil administrador
    Given que existem usuários administradores e não administradores cadastrados
    When envio uma requisição GET para /usuarios com filtro administrador
    Then o sistema deve retornar status 200
    And deve retornar apenas os usuários conforme o perfil informado



  # CENÁRIOS - CONSULTA COM FILTROS INVÁLIDOS


  Scenario: Buscar usuários com filtro inexistente
    Given que não existem usuários com os dados informados
    When envio uma requisição GET para /usuarios com filtros inválidos
    Then o sistema deve retornar status 200
    And deve retornar uma lista vazia



  # ==================================================
  # GET /usuarios/{id} - Consulta por ID
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Buscar usuário por ID válido
    Given que existe um usuário cadastrado com um ID válido
    When envio uma requisição GET para /usuarios/{id}
    Then o sistema deve retornar status 200
    And deve retornar os dados do usuário correspondente



  # CENÁRIOS - NEGATIVOS


  Scenario: Buscar usuário com ID inexistente
    Given que informo um ID de usuário inexistente
    When envio uma requisição GET para /usuarios/{id}
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Usuário não encontrado"


  Scenario: Buscar usuário com ID inválido
    Given que informo um ID de usuário inválido
    When envio uma requisição GET para /usuarios/{id}
    Then o sistema deve retornar status 400



  # ==================================================
  # PUT /usuarios/{id} - Atualização
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Atualizar usuário com sucesso
    Given que existe um usuário cadastrado com um ID válido
    And que possuo dados atualizados válidos
    When envio uma requisição PUT para /usuarios/{id}
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro alterado com sucesso"


  Scenario: Atualizar usuário alterando perfil para administrador
    Given que existe um usuário cadastrado como usuário comum
    And que possuo dados para torná-lo administrador
    When envio uma requisição PUT para /usuarios/{id}
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro alterado com sucesso"



  # CENÁRIOS - NEGÓCIO / REGRAS


  Scenario: Não permitir atualização com email já utilizado
    Given que existem dois usuários cadastrados com emails diferentes
    And que tento atualizar um usuário com email já utilizado
    When envio uma requisição PUT para /usuarios/{id}
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Este email já está sendo usado"



  # CENÁRIOS - COMPORTAMENTO DO SISTEMA


  Scenario: Atualizar usuário com ID inexistente deve realizar novo cadastro
    Given que informo um ID de usuário inexistente
    And que possuo dados válidos para cadastro
    When envio uma requisição PUT para /usuarios/{id}
    Then o sistema deve retornar status 201
    And deve exibir a mensagem "Cadastro realizado com sucesso"
    And deve retornar o id do novo usuário



  # CENÁRIOS - VALIDAÇÃO


  Scenario: Não permitir atualização com email inválido
    Given que possuo dados de usuário com email inválido
    When envio uma requisição PUT para /usuarios/{id}
    Then o sistema deve retornar status 400


  Scenario: Não permitir atualização com campos obrigatórios vazios
    Given que possuo dados de usuário com campos obrigatórios vazios
    When envio uma requisição PUT para /usuarios/{id}
    Then o sistema deve retornar status 400



  # CENÁRIOS - PAYLOAD INVÁLIDO


  Scenario: Não permitir atualização com corpo da requisição vazio
    Given que envio uma requisição PUT para /usuarios/{id} sem corpo
    When envio a requisição
    Then o sistema deve retornar status 400


  Scenario: Não permitir atualização com campos nulos
    Given que possuo dados de usuário com campos nulos
    When envio uma requisição PUT para /usuarios/{id}
    Then o sistema deve retornar status 400