# 📊 Resumo Geral de Bugs

| Criticidade | Front-end | Back-end | Total |
|-------------|------------|-----------|--------|
| **Crítica** | 1 | 1 | 2 |
| **Alta** | 7 | 1 | 8 |
| **Média** | 2 | 4 | 6 |
| **Baixa** | 0 | 0 | 0 |
| **Total** | 10 | 6| 16 |

---

# 🔴 Criticidade: Crítica

## 🔴 [Front-end] Bug Crítico: Controle de acesso inadequado na área administrativa (Broken Access Control)

**Severidade:** Crítica  
**Categoria:** Segurança – Autorização / Escalada de Privilégio  

---

### Passos para reproduzir

1. Realizar login com um usuário comum (não administrador).
2. Após login, alterar manualmente a URL para a rota da área administrativa (ex: `/admin`).
3. Acessar a página administrativa.
4. Navegar entre listagens (usuários e produtos).
5. Tentar executar ações administrativas.

---

### Comportamento esperado

- Rotas administrativas devem ser protegidas por verificação de role/permissão.
- Usuários comuns não devem:
  - Acessar interface administrativa.
  - Visualizar dados administrativos.
  - Executar qualquer ação restrita.
- O front-end deve possuir proteção de rota (Route Guard).
- O sistema deve bloquear o acesso visual e redirecionar ou exibir mensagem de acesso negado.

---

### Comportamento atual

- Usuário comum consegue acessar a página administrativa via manipulação de URL.
- Não há redirecionamento ou bloqueio no front-end.
- Não é exibida mensagem de acesso negado.
- É possível visualizar:
  - Listagem completa de usuários
  - Listagem completa de produtos

---

## 🔴 [Back-end] Bug Crítico: Controle de acesso inadequado na área administrativa (Broken Access Control)

**Severidade:** Crítica  
**Categoria:** Segurança – Autorização / Escalada de Privilégio  

---

### Passos para reproduzir

1. Realizar login com um usuário comum.
2. Tentar executar ações administrativas via requisições protegidas.

---

### Comportamento esperado

- O sistema deve retornar HTTP `403 Forbidden` para qualquer tentativa de acesso não autorizado.
- Validação de autorização deve ser consistente em todas as rotas administrativas.
- Usuários comuns não devem conseguir:
  - Criar usuários administradores.
  - Executar ações restritas.

---

### Comportamento atual

- Validação de autorização é parcial.
- Em testes anteriores, foi possível:
  - Acessar tela de cadastro de usuários.
  - Criar usuário com perfil administrador (escalada de privilégio).
- Em outras rotas (ex: cadastro de produto):
  - A API retorna erro informando que a rota é exclusiva para administradores.
- Existe inconsistência entre permissões de leitura e escrita.

---

# 🟠 Criticidade: Alta

## 🟠 [Back-end] Bug: Campo de senha aceita qualquer quantidade de caracteres no endpoint POST /usuarios

**Severidade:** Alta  

---

### Passos para reproduzir

1. Fazer uma requisição POST `/usuarios` com uma senha de 1 caractere.
2. Observar que a API aceita e cadastra o usuário.
3. Fazer uma requisição POST `/usuarios` com uma senha de 300 caracteres.
4. Observar que a API aceita e cadastra o usuário.

---

### Comportamento esperado

- A API deveria validar um **mínimo e máximo de caracteres** para o campo de senha, por exemplo, entre 8 e 64 caracteres.
- Senhas fora desse intervalo deveriam retornar `400` com mensagem de validação clara:
  > "senha deve ter entre X e Y caracteres".

---

### Comportamento atual

- Qualquer quantidade de caracteres é aceita no campo senha.
- Não existe nenhuma validação mínima ou máxima.
- Permite senhas muito curtas, excessivamente longas e muito simples.

---

## 🟠 [Front-end] Bug: Validação do formulário de cadastro não atualiza corretamente o estado dos campos após erro (Cadastro público)

**Severidade:** Alta  

---

### Passos para reproduzir

1. Acessar a tela de cadastro de usuário no sistema.
2. Preencher os campos **Nome** e **Email** corretamente.
3. Deixar o campo **Senha** em branco.
4. Clicar no botão "Cadastrar".
5. O sistema exibe mensagem informando que a senha é obrigatória.
6. Preencher o campo **Senha** com um valor válido.
7. Clicar novamente em "Cadastrar".

---

### Comportamento esperado

- Após corrigir apenas o campo inválido (Senha), o sistema deve reconhecer que os campos Nome e Email já estão preenchidos.
- O formulário deve permitir o envio normalmente sem exigir nova interação nos campos já válidos.
- A validação deve ocorrer com base nos valores atuais exibidos nos campos.

---

### Comportamento atual

- Mesmo com os campos Nome e Email visualmente preenchidos, o sistema passa a exibir mensagem informando que esses campos são obrigatórios.
- O formulário não reconhece os valores já digitados.
- O usuário é obrigado a interagir novamente com os campos (digitar qualquer caractere e apagar) para que o sistema reconheça que estão preenchidos.
- O problema ocorre independentemente da ordem de preenchimento dos campos.

---

## 🟠 [Front-end] Bug: Validação inconsistente no cadastro de usuário (Fluxo administrador)

**Severidade:** Alta  

---

### Passos para reproduzir

1. Acessar o sistema com perfil administrador.
2. Navegar até a seção de cadastro de usuário.
3. Preencher os campos:
   - Nome → preenchido corretamente
   - E-mail → preenchido corretamente
4. Deixar o campo Senha em branco.
5. Clicar em "Cadastrar".
6. O sistema exibe mensagem informando que a senha é obrigatória.
7. Preencher o campo Senha.
8. Clicar novamente em "Cadastrar".

---

### Comportamento esperado

- Após preencher a senha, o sistema deve reconhecer que todos os campos obrigatórios estão válidos.
- A requisição de cadastro deve ser enviada normalmente.
- Nenhum erro deve ser exibido para campos já preenchidos corretamente.

---

### Comportamento atual

- Após preencher a senha, o sistema passa a exibir mensagens informando que:
  - Nome é obrigatório
  - E-mail é obrigatório
- Mesmo com ambos já preenchidos.
- Para que o sistema reconheça os valores, é necessário interagir manualmente nos campos.
- Indica falha de controle de estado no formulário.

---

## 🟠 [Front-end] Bug: Não é possível remover produto individualmente do carrinho

**Severidade:** Alta  

---

### Passos para reproduzir

1. Acessar o sistema logado com um usuário válido.
2. Adicionar um produto ao carrinho.
3. Navegar até a lista de compras (carrinho).
4. Clicar repetidamente no botão de diminuir (-) até tentar zerar a quantidade.

---

### Comportamento esperado

- Ao reduzir a quantidade até zero, o produto deveria ser removido automaticamente do carrinho.
- Alternativamente, deveria existir botão explícito de remoção do item.
- O usuário deve conseguir remover um item específico sem precisar excluir o carrinho inteiro.

---

### Comportamento atual

- O botão de diminuir (-) não remove o produto ao chegar em zero.
- Não existe opção para remover item individualmente.
- Para remover um produto, é necessário excluir toda a lista de compras.

---

## 🟠 [Front-end] Bug: Carrinho permite adicionar quantidade superior ao estoque disponível

**Severidade:** Alta  

---

### Passos para reproduzir

1. Cadastrar ou identificar um produto com quantidade limitada em estoque (ex: 10 unidades).
2. Adicionar o produto ao carrinho.
3. Clicar repetidamente no botão de aumentar (+) quantidade.
4. Ultrapassar o limite de estoque (ex: definir 50 unidades).

---

### Comportamento esperado

- O sistema deve impedir que a quantidade no carrinho ultrapasse o estoque disponível.
- O botão de aumentar (+) deve ser desabilitado ao atingir o limite.
- Alternativamente, deve exibir mensagem informando que não há quantidade suficiente em estoque.

---

### Comportamento atual

- O sistema permite aumentar a quantidade acima do valor disponível em estoque.
- Não há bloqueio, validação visual ou mensagem de erro.

---

## 🟠 [Front-end] Bug: Nome de usuário excessivamente longo quebra layout da tela de listagem

**Severidade:** Alta  

---

### Passos para reproduzir

1. Acessar a tela de cadastro de usuário.
2. Cadastrar um usuário com nome superior a 255 caracteres.
3. Acessar a tela de listagem de usuários.

---

### Comportamento esperado

- O sistema deve possuir limite máximo de caracteres para o campo Nome.
- A listagem deve truncar textos longos ou aplicar quebra de linha controlada.
- A tabela não deve ultrapassar o limite horizontal da tela.

---

### Comportamento atual

- O sistema permite cadastro de nome com tamanho excessivo.
- A tabela se estende além da largura da tela.
- É gerado scroll horizontal excessivo.

---

## 🟠 [Front-end] Bug: Botão "Editar" na listagem de usuários não executa nenhuma ação

**Severidade:** Alta  

---

### Passos para reproduzir

1. Acessar o sistema com perfil administrador.
2. Navegar até a tela de listagem de usuários.
3. Clicar no botão "Editar".
4. Abrir a aba Network do navegador.

---

### Comportamento esperado

- O sistema deve redirecionar para tela de edição ou abrir formulário.
- Deve ser disparada requisição correspondente.

---

### Comportamento atual

- Ao clicar no botão "Editar", nenhuma ação ocorre.
- Não há redirecionamento.
- Nenhuma requisição é disparada.

---

## 🟠 [Front-end] Bug: Botão "Editar" na listagem de produtos não executa nenhuma ação

**Severidade:** Alta  

---

### Passos para reproduzir

1. Acessar o sistema com perfil administrador.
2. Navegar até a tela de listagem de produtos.
3. Clicar no botão "Editar".
4. Abrir a aba Network do navegador.

---

### Comportamento esperado

- O sistema deve redirecionar para tela de edição do produto ou abrir formulário correspondente.
- Deve ser disparada requisição apropriada.

---

### Comportamento atual

- Ao clicar no botão "Editar", nenhuma ação ocorre.
- Nenhuma requisição é disparada.
- Botão implementado apenas visualmente.

---

# 🟡 Criticidade: Média

## 🟡 [Back-end] Bug: Validação de ID de usuário não documentada no endpoint GET /usuarios/{id}

**Severidade:** Média  

---

### Passos para reproduzir

1. Fazer requisição GET `/usuarios/{id}` com ID menor que 16 caracteres.
2. Fazer requisição com ID de 16 caracteres inexistente.

---

### Comportamento esperado

- Documentação deve informar que o ID deve ter exatamente 16 caracteres.
- A API deveria diferenciar claramente erro de validação e usuário não encontrado (`404`).

---

### Comportamento atual

- IDs menores que 16 caracteres retornam `400`.
- IDs de 16 caracteres inexistentes retornam `400` com mensagem "usuário não encontrado".
- Regra não está documentada.

---

## 🟡 [Front-end] Bug: Campo de imagem marcado como obrigatório no cadastro de produto, mas não é validado nem suportado pela API

**Severidade:** Média  

---

### Passos para reproduzir

1. Acessar o sistema com perfil administrador.
2. Navegar até a tela de cadastro de produtos.
3. Observar campo **Imagem** marcado com asterisco (*).
4. Preencher demais campos obrigatórios.
5. Deixar imagem em branco.
6. Clicar em "Cadastrar".

---

### Comportamento esperado

- Se obrigatório, deve impedir cadastro sem imagem.
- Caso API não suporte, campo não deveria existir.

---

### Comportamento atual

- Cadastro é permitido mesmo sem imagem.
- Endpoint `POST /produtos` não possui campo correspondente no payload.

---

## 🟡 [Back-end] Bug: Campo "Nome" no cadastro de usuário não possui limite máximo de caracteres

**Severidade:** Média  

---

### Passos para reproduzir

1. Enviar nome com mais de 255 caracteres no cadastro.
2. Concluir cadastro.

---

### Comportamento esperado

- Sistema deve definir limite máximo.
- Ao ultrapassar, retornar erro de validação.

---

### Comportamento atual

- Campo aceita tamanho excessivo.
- Nenhuma validação aplicada.

---

## 🟡 [Back-end] Bug: Campo "Nome" no cadastro de Produto não possui limite máximo de caracteres

**Severidade:** Média  

---

### Passos para reproduzir

1. Enviar nome com mais de 255 caracteres no cadastro.
2. Concluir cadastro.

---

### Comportamento esperado

- Sistema deve definir limite máximo.
- Ao ultrapassar, retornar erro de validação.

---

### Comportamento atual

- Campo aceita tamanho excessivo.
- Nenhuma validação aplicada.

---

---

## 🟡 [Back-end] Bug: Campo "Descrição" no cadastro de Produto não possui limite máximo de caracteres

**Severidade:** Média  

---

### Passos para reproduzir

1. Enviar Descrição com mais de 255 caracteres no cadastro.
2. Concluir cadastro.

---

### Comportamento esperado

- Sistema deve definir limite máximo.
- Ao ultrapassar, retornar erro de validação.

---

### Comportamento atual

- Campo aceita tamanho excessivo.
- Nenhuma validação aplicada.

---

## 🟡 [Front-end] Bug: Token expirado não redireciona para login e exibe mensagem técnica ao usuário

**Severidade:** Média  

---

### Passos para reproduzir

1. Realizar login.
2. Aguardar expiração do token.
3. Tentar cadastrar produto.

---

### Comportamento esperado

- Ao detectar HTTP 401:
  - Invalidar sessão.
  - Redirecionar automaticamente para login.
  - Exibir mensagem amigável:
    > "Sua sessão expirou. Por favor, realize login novamente."

---

### Comportamento atual

- Sistema exibe mensagem técnica:
  > "Token de acesso ausente, inválido ou expirado ou o usuário do token não existe mais."
- Usuário permanece na tela atual.
- Não ocorre redirecionamento automático.

---

# 🔵 Melhoria

## 🔵 [Front-end] Melhoria: Ausência de campo de busca nas listagens de usuários e produtos (perfil administrador)

**Tipo:** Melhoria / Usabilidade  
**Prioridade sugerida:** Média  

---

### Descrição

Na visão de administrador, as telas de listagem de usuários e produtos não possuem campo de busca ou filtro visível no front-end.

---

### Cenário observado

- Todos os registros são exibidos diretamente.
- Não existe campo de pesquisa por nome, email ou produto.
- Localização depende de scroll manual.

---

### Sugestão

- Implementar campo de busca no front-end.
- Integrar com filtros da API (caso existam).
- Permitir pesquisa por atributos relevantes.