Feature: Funcionalidades da Tela de Detalhes do Produto via Front-end


  # ==================================================
  # TELA DE DETALHES DO PRODUTO - USUÁRIO COMUM
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Adicionar produto à lista de compras pela tela de detalhes
    Given que estou autenticado como usuário comum
    And que estou na tela de detalhes de um produto
    When clico na opção de adicionar à lista de compras
    Then o sistema deve adicionar o produto à lista
    And devo ser redirecionado para a tela de lista de compras
    And devo visualizar o produto adicionado na lista


  Scenario: Voltar para a home a partir da tela de detalhes do produto
    Given que estou autenticado como usuário comum
    And que estou na tela de detalhes de um produto
    When clico na opção de voltar
    Then devo ser redirecionado para a tela home do usuário comum
    And devo visualizar a listagem de produtos disponíveis


  Scenario: Acessar lista de compras pelo ícone do carrinho na tela de detalhes
    Given que estou autenticado como usuário comum
    And que estou na tela de detalhes de um produto
    When clico no ícone do carrinho
    Then devo ser redirecionado para a tela de lista de compras
    And devo visualizar os produtos adicionados