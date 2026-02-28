Feature: Login de usuários via Front-end


  # ==================================================
  # TELA DE LOGIN
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Realizar login com usuário comum e acessar homepage padrão
    Given que acesso a tela de login
    And que possuo um usuário comum cadastrado no sistema
    And que informo email e senha válidos do usuário comum
    When clico no botão de login
    Then o sistema deve autenticar o usuário com sucesso
    And devo ser redirecionado para a homepage do usuário comum
    And devo visualizar funcionalidades disponíveis para usuário comum


  Scenario: Realizar login com usuário administrador e acessar homepage administrativa
    Given que acesso a tela de login
    And que possuo um usuário administrador cadastrado no sistema
    And que informo email e senha válidos do usuário administrador
    When clico no botão de login
    Then o sistema deve autenticar o usuário com sucesso
    And devo ser redirecionado para a homepage do administrador
    And devo visualizar funcionalidades administrativas

  # ==================================================
  # LOGOUT
  # ==================================================


  # CENÁRIOS - POSITIVOS


  Scenario: Realizar logout com sucesso
    Given que estou autenticado no sistema
    And que estou em qualquer tela da aplicação
    When clico na opção de logout
    Then o sistema deve encerrar a sessão do usuário
    And devo ser redirecionado para a tela de login