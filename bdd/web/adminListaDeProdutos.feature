Feature: Gerenciamento de Produtos pelo Administrador via Front-end


  # ==================================================
  # TELA DE LISTAGEM DE PRODUTOS - ADMINISTRADOR
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Acessar tela de edição de produto pela listagem
    Given que estou autenticado como usuário administrador
    And que estou na tela de listagem de produtos
    And que existe ao menos um produto cadastrado no sistema
    When clico na opção de editar produto
    Then devo ser redirecionado para a tela de edição de produto
    And devo visualizar os dados do produto selecionado


  Scenario: Excluir produto com sucesso pela listagem
    Given que estou autenticado como usuário administrador
    And que estou na tela de listagem de produtos
    And que existe ao menos um produto cadastrado no sistema
    When clico na opção de excluir produto
    Then o sistema deve remover o produto selecionado
    And deve exibir a mensagem "Registro excluído com sucesso"
    And o produto não deve mais aparecer na lista