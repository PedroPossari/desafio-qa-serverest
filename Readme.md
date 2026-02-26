# Projeto de Automação QA - Serverest

## 📌 Objetivo

Este projeto foi desenvolvido como parte de um desafio técnico para a vaga de Analista de Qualidade de Software Pleno.

O objetivo é validar o módulo de cadastro de usuários de um e-commerce fictício, cobrindo:

- Testes automatizados de Front-end
- Testes automatizados de API
- Definição de cenários em BDD
- Registro de bugs encontrados
- Boas práticas de organização e manutenção

---

## 🌐 Sistema Testado

- Aplicação: Serverest  
- URL Front-end: https://front.serverest.dev/
- URL API : https://serverest.dev/

---

## 📊 Estratégia de Testes

Foram priorizados:

- Fluxos principais
- Validações obrigatórias de campos
- Testes negativos (dados inválidos e campos obrigatórios)
- Validação de status code e estrutura de resposta da API
- Independência entre cenários para evitar dependência de estado

---

## 🛠️ Tecnologias Utilizadas

- Cypress
- JavaScript
- Node.js
- Faker (geração de dados)
- Gherkin (BDD)

---

## 📁 Arquitetura do Projeto

A estrutura do projeto foi organizada de forma modular, separando responsabilidades por camadas:
```bash
desafio-qa-serverest/
│
├── README.md
├── BUGS.md
├── package.json
├── cypress.config.js
│
├── bdd/
│   └── cadastro.feature
│
└── cypress/
    ├── e2e/
    │ ├── web/
    │ │ └── cadastro.cy.js
    │ └── api/
    │   └── clientes.cy.js
    │
    ├── pages/
    │   └── CadastroPage.js
    │
    ├── services/
    │   └── clientesService.js
    │
    ├── fixtures/
    │   └── user.json
    │
    ├── factories/
    │   └── userFactory.js
    │
    ├── utils/
    │   └── helpers.js
    │
    └── support/
        ├── commands.js
        └── e2e.js
```

Essa arquitetura visa facilitar a manutenção, escalabilidade e reutilização de código.

---

## 📂 Descrição das Pastas

### 📁 `bdd/`
Contém os cenários escritos em Gherkin (BDD).

Utilizado para documentar os fluxos de negócio antes da automação.

Exemplo:
- `cadastro.feature`

---

### 📁 `cypress/e2e/web/`
Contém os testes automatizados de Front-end.

Aqui estão os cenários que validam a interface do usuário.

Exemplo:
- `cadastro.cy.js`

---

### 📁 `cypress/e2e/api/`
Contém os testes automatizados da API.

Valida os endpoints de cadastro e consulta de usuários.

Exemplo:
- `clientes.cy.js`

---

### 📁 `cypress/pages/`
Implementa o padrão Page Object Model.

Responsável por centralizar:

- Seletores
- Ações
- Interações com a interface

Exemplo:
- `CadastroPage.js`

---

### 📁 `cypress/services/`
Camada responsável por centralizar as requisições à API.

Evita duplicação de código nos testes.

Exemplo:
- `clientesService.js`

---

### 📁 `cypress/fixtures/`
Contém massas de dados estáticas.

Utilizada para armazenar dados reutilizáveis em formato JSON.

Exemplo:
- `user.json`

---

### 📁 `cypress/factories/`
Responsável pela geração de dados dinâmicos.

Utiliza Faker e funções auxiliares para evitar dados fixos.

Exemplo:
- `userFactory.js`

---

### 📁 `cypress/utils/`
Contém funções utilitárias reutilizáveis.

Inclui validações, formatações e helpers genéricos.

Exemplo:
- `helpers.js`

---

### 📁 `cypress/support/`
Contém configurações globais do Cypress.

Responsável por:

- Comandos customizados
- Setup global
- Configurações iniciais

Arquivos:
- `commands.js`
- `e2e.js`

---

## 🧪 Onde Encontrar os Casos de Teste

### Testes Web

cypress/e2e/web/

### Testes de API

cypress/e2e/api/

### Cenários BDD

bdd/cadastro.feature


---

## ▶️ Como Executar o Projeto

### Pré-requisitos

- Node.js instalado
- npm ou yarn

---

### Instalar Dependências

```bash
npm install
```
---
Executar Testes com Interface
```bash
npx cypress open
```
---
Executar Testes em Modo Headless
```bash
npx cypress run
```
---
## 🐞 Registro de Bugs

Os bugs identificados durante a execução dos testes estão documentados no arquivo:
```bash
BUGS.md
```
Cada bug contém:
- Título
- Severidade
- Passos para reprodução
- Resultado esperado
- Resultado atual
---
## 📐 Decisões Técnicas
As principais decisões tomadas neste projeto foram:
- Utilização do Cypress para testes Web e API, visando simplicidade e padronização
- Implementação do padrão Page Object Model
- Separação por camadas (tests, pages, services, utils)
- Uso de factories para geração de massa dinâmica
- Manutenção de BDD como documentação funcional
- Organização focada em escalabilidade e manutenção
---
## 👤 Autor

- Nome: Pedro Aparecido Possari
- Contato: pedropossari2@gmail.com
- LinkedIn: https://www.linkedin.com/in/pedro-possari/