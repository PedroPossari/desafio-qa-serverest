class AdminRegistroDeProduto {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      nomeInput: () => cy.get('[data-testid="nome"]'),
      precoInput: () => cy.get('[data-testid="preco"]'),
      descricaoInput: () => cy.get('[data-testid="descricao"]'),
      quantityInput: () => cy.get('[data-testid="quantity"]'),
      imagemInput: () => cy.get('[data-testid="imagem"]'),
      cadastrarProdutoButton: () => cy.get('[data-testid="cadastarProdutos"]')
    }
  
  
    // =========================
    // AÇÕES
    // =========================
  
    preencherNome(nome) {
      this.elements.nomeInput().clear().type(nome)
    }
  
    preencherPreco(preco) {
      this.elements.precoInput().clear().type(preco.toString())
    }
  
    preencherDescricao(descricao) {
      this.elements.descricaoInput().clear().type(descricao)
    }
  
    preencherQuantidade(quantity) {
      this.elements.quantityInput().clear().type(quantity.toString())
    }
  
    preencherImagem(urlImagem) {
      // Mesmo não funcionando na API, deixamos preparado
      this.elements.imagemInput().clear().type(urlImagem)
    }
  
    clicarCadastrarProduto() {
      this.elements.cadastrarProdutoButton().click()
    }
  
  
    // =========================
    // AÇÃO COMPLETA
    // =========================
  
    cadastrarProduto({
      nome,
      preco,
      descricao,
      quantity,
      imagem = ''
    }) {
      this.preencherNome(nome)
      this.preencherPreco(preco)
      this.preencherDescricao(descricao)
      this.preencherQuantidade(quantity)
  
      if (imagem) {
        this.preencherImagem(imagem)
      }
  
      this.clicarCadastrarProduto()
    }
  
  }
  
  export default new AdminRegistroDeProduto()