class ProdutoPage {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      adicionarNaSacolaButton: () => cy.get('[data-testid="adicionarNaLista"]'),
      verCarrinhoButton: () => cy.get('[data-testid="shopping-cart-button"]'),
      voltarHomeButton: () => cy.get('[data-testid="voltarHome"]')
    }
  
  
    // =========================
    // AÇÕES
    // =========================
  
    adicionarNaSacola() {
      this.elements.adicionarNaSacolaButton().click()
    }
  
    irParaCarrinho() {
      this.elements.verCarrinhoButton().click()
    }
  
    voltarParaHome() {
      this.elements.voltarHomeButton().click()
    }
  
  }
  
  export default new ProdutoPage()