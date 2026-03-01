class ListaDoCarrinhoPage {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      paginaInicialButton: () => cy.get('[data-testid="paginaInicial"]'),
      adicionarCarrinhoButton: () => cy.get('[data-testid="adicionar carrinho"]'),
      limparListaButton: () => cy.get('[data-testid="limparLista"]'),
      diminuirQuantidadeButtons: () => cy.get('[data-testid="product-decrease-quantity"]'),
      aumentarQuantidadeButtons: () => cy.get('[data-testid="product-increase-quantity"]'),
      nomeDoProduto: () => cy.get('[data-testid="shopping-cart-product-name"]')
      
    }
  
  
    // =========================
    // AÇÕES SIMPLES
    // =========================
  
    voltarParaPaginaInicial() {
      this.elements.paginaInicialButton().click()
    }
  
    adicionarTudoAoCarrinho() {
      this.elements.adicionarCarrinhoButton().click()
    }
  
    limparLista() {
      this.elements.limparListaButton().click()
    }
  
  
    // =========================
    // AÇÕES COM MÚLTIPLOS PRODUTOS
    // =========================
  
    diminuirQuantidadePorIndex(index) {
      this.elements.diminuirQuantidadeButtons().eq(index).click()
    }
  
    aumentarQuantidadePorIndex(index) {
      this.elements.aumentarQuantidadeButtons().eq(index).click()
    }
  
    diminuirPrimeiroProduto() {
      this.elements.diminuirQuantidadeButtons().first().click()
    }
  
    aumentarPrimeiroProduto() {
      this.elements.aumentarQuantidadeButtons().first().click()
    }
  
  }
  
  export default new ListaDoCarrinhoPage()