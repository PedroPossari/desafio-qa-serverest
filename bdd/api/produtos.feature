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


  # ==================================================
  # GET /produtos - Listagem
  # ==================================================


  # CENÁRIOS POSITIVOS


  Scenario: Listar todos os produtos com sucesso
    Given que existem produtos cadastrados no sistema
    When envio uma requisição GET para /produtos
    Then o sistema deve retornar status 200
    And deve retornar a lista de produtos
    And deve retornar a quantidade total de registros


  Scenario: Filtrar produtos por nome
    Given que existem produtos cadastrados com nomes diferentes
    When envio uma requisição GET para /produtos com filtro de nome
    Then o sistema deve retornar status 200
    And deve retornar apenas os produtos com o nome informado


  Scenario: Filtrar produtos por preço
    Given que existem produtos cadastrados com preços diferentes
    When envio uma requisição GET para /produtos com filtro de preço
    Then o sistema deve retornar status 200
    And deve retornar apenas os produtos com o preço informado


  Scenario: Filtrar produtos por descrição
    Given que existem produtos cadastrados com descrições diferentes
    When envio uma requisição GET para /produtos com filtro de descrição
    Then o sistema deve retornar status 200
    And deve retornar apenas os produtos com a descrição informada


  Scenario: Filtrar produtos por quantidade
    Given que existem produtos cadastrados com quantidades diferentes
    When envio uma requisição GET para /produtos com filtro de quantidade
    Then o sistema deve retornar status 200
    And deve retornar apenas os produtos com a quantidade informada



  # CENÁRIOS DE CONSULTA SEM RESULTADO


  Scenario: Buscar produtos com filtros inexistentes
    Given que não existem produtos com os dados informados
    When envio uma requisição GET para /produtos com filtros inválidos
    Then o sistema deve retornar status 200
    And deve retornar uma lista vazia



  # ==================================================
  # GET /produtos/{id} - Consulta por ID
  # ==================================================


  # CENÁRIOS POSITIVOS


  Scenario: Buscar produto por ID válido
    Given que existe um produto cadastrado com um ID válido
    When envio uma requisição GET para /produtos/{id}
    Then o sistema deve retornar status 200
    And deve retornar os dados do produto correspondente



  # CENÁRIOS NEGATIVOS


  Scenario: Buscar produto com ID inexistente
    Given que informo um ID de produto inexistente
    When envio uma requisição GET para /produtos/{id}
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Produto não encontrado"


  Scenario: Buscar produto com ID inválido
    Given que informo um ID de produto inválido
    When envio uma requisição GET para /produtos/{id}
    Then o sistema deve retornar status 400



  # ==================================================
  # PUT /produtos/{id} - Atualização
  # ==================================================


  # CENÁRIOS POSITIVOS


  Scenario: Atualizar produto com sucesso como administrador
    Given que estou autenticado como usuário administrador
    And que existe um produto cadastrado com um ID válido
    And que possuo dados atualizados válidos do produto
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro alterado com sucesso"



  # CENÁRIOS DE COMPORTAMENTO DO SISTEMA


  Scenario: Atualizar produto com ID inexistente deve realizar novo cadastro
    Given que estou autenticado como usuário administrador
    And que informo um ID de produto inexistente
    And que possuo dados válidos para cadastro
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 201
    And deve exibir a mensagem "Cadastro realizado com sucesso"
    And deve retornar o id do novo produto



  # CENÁRIOS DE NEGÓCIO


  Scenario: Não permitir atualização com nome já utilizado
    Given que estou autenticado como usuário administrador
    And que existem dois produtos cadastrados com nomes diferentes
    And que tento atualizar um produto com nome já utilizado
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Já existe produto com esse nome"



  # CENÁRIOS DE AUTORIZAÇÃO


  Scenario: Não permitir atualização sem token
    Given que não possuo token de autenticação
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 401
    And deve exibir mensagem de token inválido


  Scenario: Não permitir atualização com token inválido
    Given que possuo um token inválido
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 401
    And deve exibir mensagem de token inválido


  Scenario: Não permitir atualização com token expirado
    Given que possuo um token expirado
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 401
    And deve exibir mensagem de token inválido



  # CENÁRIOS DE PERMISSÃO


  Scenario: Não permitir atualização por usuário não administrador
    Given que estou autenticado como usuário não administrador
    And que existe um produto cadastrado
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 403
    And deve exibir a mensagem "Rota exclusiva para administradores"



  # CENÁRIOS DE VALIDAÇÃO


  Scenario: Não permitir atualização sem informar nome
    Given que possuo dados de produto sem o campo nome
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 400


  Scenario: Não permitir atualização com preço negativo
    Given que possuo dados de produto com preço negativo
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 400


  Scenario: Não permitir atualização com quantidade negativa
    Given que possuo dados de produto com quantidade negativa
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 400



  # CENÁRIOS DE PAYLOAD INVÁLIDO


  Scenario: Não permitir atualização com corpo vazio
    Given que envio uma requisição PUT para /produtos/{id} sem corpo
    When envio a requisição
    Then o sistema deve retornar status 400


  Scenario: Não permitir atualização com campos nulos
    Given que possuo dados de produto com campos nulos
    When envio uma requisição PUT para /produtos/{id}
    Then o sistema deve retornar status 400