Feature: Funcionalidades da Lista de Compras via Front-end


  # ==================================================
  # TELA DE LISTA DE COMPRAS - USUÁRIO COMUM
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Aumentar a quantidade de um produto na lista de compras
    Given que estou autenticado como usuário comum
    And que possuo um produto adicionado na lista de compras
    And que estou na tela de lista de compras
    When clico na opção de aumentar a quantidade do produto
    Then o sistema deve incrementar a quantidade do produto na lista
    And devo visualizar a quantidade atualizada


  Scenario: Diminuir a quantidade de um produto na lista de compras
    Given que estou autenticado como usuário comum
    And que possuo um produto com quantidade maior que um na lista de compras
    And que estou na tela de lista de compras
    When clico na opção de diminuir a quantidade do produto
    Then o sistema deve reduzir a quantidade do produto na lista
    And devo visualizar a quantidade atualizada


  Scenario: Limpar a lista de compras com sucesso
    Given que estou autenticado como usuário comum
    And que possuo produtos adicionados na lista de compras
    And que estou na tela de lista de compras
    When clico na opção de limpar a lista
    Then o sistema deve remover todos os produtos da lista
    And devo visualizar a lista de compras vazia


  Scenario: Adicionar produtos da lista de compras ao carrinho
    Given que estou autenticado como usuário comum
    And que possuo produtos adicionados na lista de compras
    And que estou na tela de lista de compras
    When clico na opção de adicionar ao carrinho
    Then o sistema deve adicionar os produtos ao carrinho
    And devo visualizar os produtos no carrinho de compras


  Scenario: Retornar para a home pela lista de compras e adicionar novo produto
    Given que estou autenticado como usuário comum
    And que possuo um produto adicionado na lista de compras
    And que estou na tela de lista de compras
    When clico na opção de página inicial
    And sou redirecionado para a tela home
    And clico em adicionar à lista em um produto disponível
    Then o sistema deve adicionar o produto à lista de compras
    And devo visualizar o produto na lista


  Scenario: Adicionar produto repetido à lista deve incrementar quantidade
    Given que estou autenticado como usuário comum
    And que possuo um produto adicionado na lista de compras
    And que estou na tela home
    When clico em adicionar à lista no mesmo produto já existente
    Then o sistema deve incrementar a quantidade do produto na lista
    And devo visualizar a quantidade atualizada na lista de compras


  Scenario: Adicionar produto diferente à lista deve criar novo item
    Given que estou autenticado como usuário comum
    And que possuo um produto adicionado na lista de compras
    And que estou na tela home
    When clico em adicionar à lista em um produto diferente
    Then o sistema deve adicionar um novo item à lista de compras
    And devo visualizar ambos os produtos na lista