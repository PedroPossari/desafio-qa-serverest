class UserHomePage {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      campoPesquisa: () => cy.get('[data-testid="pesquisar"]'),
      botaoPesquisar: () => cy.get('[data-testid="botaoPesquisar"]'),
      verCarrinhoButton: () => cy.get('[data-testid="listaProdutos"]'),
      adicionarNaListaButtons: () => cy.get('[data-testid="adicionarNaLista"]'),
      productDetailLinks: () => cy.get('[data-testid="product-detail-link"]')

    }
  
  
    // =========================
    // AÇÕES DE PESQUISA
    // =========================
  
    pesquisarProduto(nomeProduto) {
      this.elements.campoPesquisa().clear().type(nomeProduto)
      this.elements.botaoPesquisar().click()
    }
  
  
    // =========================
    // AÇÕES COM MÚLTIPLOS ELEMENTOS
    // =========================
  
    adicionarProdutoNaListaPorIndex(index) {
      this.elements.adicionarNaListaButtons().eq(index).click()
    }
  
    acessarDetalheProdutoPorIndex(index) {
      this.elements.productDetailLinks().eq(index).click()
    }
  
  
    // =========================
    // AÇÕES RÁPIDAS OPCIONAIS
    // =========================
  
    adicionarPrimeiroProdutoNaLista() {
      this.elements.adicionarNaListaButtons().first().click()
    }
  
    acessarPrimeiroProduto() {
      this.elements.productDetailLinks().first().click()
    }

    irParaCarrinho() {
        this.elements.verCarrinhoButton().click()
    }
  
  }
  
  export default new UserHomePage()