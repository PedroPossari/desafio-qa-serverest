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