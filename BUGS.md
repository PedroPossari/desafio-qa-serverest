### Bug: Campo de senha aceita qualquer quantidade de caracteres no endpoint POST /usuarios

**Severidade:** Alta  
*(pode comprometer a segurança do sistema e permitir senhas muito fracas ou muito longas)*

**Passos para reproduzir:**  
1. Fazer uma requisição POST `/usuarios` com uma senha de 1 caractere.  
2. Observar que a API aceita e cadastra o usuário.  
3. Fazer uma requisição POST `/usuarios` com uma senha de 300 caracteres.  
4. Observar que a API aceita e cadastra o usuário.  

**Comportamento esperado:**  
- A API deveria validar um **mínimo e máximo de caracteres** para o campo de senha, por exemplo, entre 8 e 64 caracteres.  
- Senhas fora desse intervalo deveriam retornar `400` com mensagem de validação clara: "senha deve ter entre X e Y caracteres".  

**Comportamento atual:**  
- Qualquer quantidade de caracteres é aceita no campo senha.  
- Não existe nenhuma validação mínima ou máxima, permitindo senhas muito curtas ou excessivamente longas.
- permitindo senhas muito simples

---

### Bug: Validação de ID de usuário não documentada no endpoint GET /usuarios/{id}

**Severidade:** Média  
*(pode gerar confusão para consumidores da API, pois o comportamento não está documentado)*

**Passos para reproduzir:**  
1. Fazer uma requisição GET `/usuarios/{id}` com ID menor que 16 caracteres.  
2. Observar que a API retorna `400` com mensagem de validação: "ID deve ter 16 caracteres".  
3. Fazer uma requisição GET `/usuarios/{id}` com ID de 16 caracteres que não existe.  
4. Observar que a API retorna `400` com mensagem: "usuário não encontrado".  

**Comportamento esperado:**  
- A documentação deveria informar que o ID do usuário deve ter **exatamente 16 caracteres**.  
- Idealmente, a API deveria diferenciar claramente erros de validação de erros de “usuário não encontrado”.  

**Comportamento atual:**  
- O requisito de 16 caracteres fica subentendido apenas pelo exemplo (`0uxuPY0cbmQhpEz1`), não está documentado.  
- IDs menores que 16 caracteres retornam `400` com mensagem de validação, mas não há aviso disso na documentação.  
- IDs de 16 caracteres não existentes retornam `400` com mensagem "usuário não encontrado".