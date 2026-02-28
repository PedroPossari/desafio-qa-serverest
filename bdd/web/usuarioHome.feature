Feature: Funcionalidades da Home do Usuário Comum via Front-end


  # ==================================================
  # TELA HOME - USUÁRIO COMUM
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Pesquisar produto com sucesso pela barra de busca
    Given que estou autenticado como usuário comum
    And que estou na tela home do usuário comum
    And que existem produtos cadastrados no sistema
    When informo o nome de um produto válido no campo de pesquisa
    And clico no botão de buscar
    Then o sistema deve exibir a lista de produtos correspondentes à pesquisa
    And devo visualizar o produto pesquisado na tela


  Scenario: Acessar detalhes do produto pela home
    Given que estou autenticado como usuário comum
    And que estou na tela home do usuário comum
    And que existe um produto disponível para visualização
    When clico na opção de detalhes do produto
    Then devo ser redirecionado para a tela de detalhes do produto
    And devo visualizar as informações completas do produto


  Scenario: Adicionar produto à lista de compras pela home
    Given que estou autenticado como usuário comum
    And que estou na tela home do usuário comum
    And que existe um produto disponível para compra
    When clico na opção de adicionar à lista de compras
    Then o sistema deve adicionar o produto à lista
    And devo ser redirecionado para a tela de lista de compras
    And devo visualizar o produto adicionado na lista


  Scenario: Acessar lista de compras pelo ícone do carrinho
    Given que estou autenticado como usuário comum
    And que estou na tela home do usuário comum
    And que possuo produtos adicionados na lista de compras
    When clico no ícone do carrinho
    Then devo ser redirecionado para a tela de lista de compras
    And devo visualizar os produtos adicionados