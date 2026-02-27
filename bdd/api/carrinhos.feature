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



  # ==================================================
  # GET /carrinhos - Listagem
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Listar todos os carrinhos com sucesso
    Given que existem carrinhos cadastrados no sistema
    When envio uma requisição GET para /carrinhos
    Then o sistema deve retornar status 200
    And deve retornar a lista de carrinhos
    And deve retornar a quantidade total de registros


  Scenario: Filtrar carrinhos por usuário
    Given que existem carrinhos cadastrados para usuários diferentes
    When envio uma requisição GET para /carrinhos com filtro de idUsuario
    Then o sistema deve retornar status 200
    And deve retornar apenas os carrinhos do usuário informado


  Scenario: Filtrar carrinhos por preço total
    Given que existem carrinhos cadastrados com valores diferentes
    When envio uma requisição GET para /carrinhos com filtro de precoTotal
    Then o sistema deve retornar status 200
    And deve retornar apenas os carrinhos com o preço informado


  Scenario: Filtrar carrinhos por quantidade total
    Given que existem carrinhos cadastrados com quantidades diferentes
    When envio uma requisição GET para /carrinhos com filtro de quantidadeTotal
    Then o sistema deve retornar status 200
    And deve retornar apenas os carrinhos com a quantidade informada



  # CENÁRIOS - CONSULTA SEM RESULTADO


  Scenario: Buscar carrinhos com filtros inexistentes
    Given que não existem carrinhos com os dados informados
    When envio uma requisição GET para /carrinhos com filtros inválidos
    Then o sistema deve retornar status 200
    And deve retornar uma lista vazia



  # ==================================================
  # GET /carrinhos/{id} - Consulta por ID
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Buscar carrinho por ID válido
    Given que existe um carrinho cadastrado com um ID válido
    When envio uma requisição GET para /carrinhos/{id}
    Then o sistema deve retornar status 200
    And deve retornar os dados do carrinho correspondente



  # CENÁRIOS - NEGATIVOS


  Scenario: Buscar carrinho com ID inexistente
    Given que informo um ID de carrinho inexistente
    When envio uma requisição GET para /carrinhos/{id}
    Then o sistema deve retornar status 400
    And deve exibir a mensagem "Carrinho não encontrado"


  Scenario: Buscar carrinho com ID inválido
    Given que informo um ID de carrinho inválido
    When envio uma requisição GET para /carrinhos/{id}
    Then o sistema deve retornar status 400



  # ==================================================
  # DELETE /carrinhos/concluir-compra - Finalização
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Concluir compra com sucesso
    Given que estou autenticado com um usuário válido
    And que possuo um carrinho ativo cadastrado
    When envio uma requisição DELETE para /carrinhos/concluir-compra
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro excluído com sucesso"
    And o carrinho deve ser removido do sistema



  # CENÁRIOS - NEGÓCIO


  Scenario: Tentar concluir compra sem possuir carrinho
    Given que estou autenticado com um usuário sem carrinho ativo
    When envio uma requisição DELETE para /carrinhos/concluir-compra
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Não foi encontrado carrinho para esse usuário"



  # CENÁRIOS - AUTORIZAÇÃO


  Scenario: Não permitir concluir compra sem token
    Given que não possuo token de autenticação
    When envio uma requisição DELETE para /carrinhos/concluir-compra
    Then o sistema deve retornar status 401


  Scenario: Não permitir concluir compra com token inválido
    Given que possuo um token inválido
    When envio uma requisição DELETE para /carrinhos/concluir-compra
    Then o sistema deve retornar status 401


  Scenario: Não permitir concluir compra com token expirado
    Given que possuo um token expirado
    When envio uma requisição DELETE para /carrinhos/concluir-compra
    Then o sistema deve retornar status 401



  # ==================================================
  # DELETE /carrinhos/cancelar-compra - Cancelamento
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Cancelar compra com sucesso e retornar produtos ao estoque
    Given que estou autenticado com um usuário válido
    And que possuo um carrinho ativo cadastrado
    And que existem produtos reservados no carrinho
    When envio uma requisição DELETE para /carrinhos/cancelar-compra
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Registro excluído com sucesso"
    And os produtos devem retornar ao estoque
    And o carrinho deve ser removido do sistema



  # CENÁRIOS - NEGÓCIO


  Scenario: Tentar cancelar compra sem possuir carrinho
    Given que estou autenticado com um usuário sem carrinho ativo
    When envio uma requisição DELETE para /carrinhos/cancelar-compra
    Then o sistema deve retornar status 200
    And deve exibir a mensagem "Não foi encontrado carrinho para esse usuário"



  # CENÁRIOS - AUTORIZAÇÃO


  Scenario: Não permitir cancelar compra sem token
    Given que não possuo token de autenticação
    When envio uma requisição DELETE para /carrinhos/cancelar-compra
    Then o sistema deve retornar status 401


  Scenario: Não permitir cancelar compra com token inválido
    Given que possuo um token inválido
    When envio uma requisição DELETE para /carrinhos/cancelar-compra
    Then o sistema deve retornar status 401


  Scenario: Não permitir cancelar compra com token expirado
    Given que possuo um token expirado
    When envio uma requisição DELETE para /carrinhos/cancelar-compra
    Then o sistema deve retornar status 401