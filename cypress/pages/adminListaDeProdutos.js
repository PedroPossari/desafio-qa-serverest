class AdminListaDeProdutos {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      editarButtons: () => cy.contains('button', 'Editar'),
      excluirButtons: () => cy.contains('button', 'Excluir')
    }
  
  
    // =========================
    // SCROLL HORIZONTAL
    // =========================
  
    scrollHorizontal() {
      cy.get('body').scrollTo('right')
    }
  
  
    // =========================
    // AÇÕES POR INDEX
    // =========================
  
    clicarEditarPorIndex(index) {
      this.scrollHorizontal()
  
      this.elements.editarButtons()
        .eq(index)
        .scrollIntoView()
        .should('be.visible')
        .click()
    }
  
    clicarExcluirPorIndex(index) {
      this.scrollHorizontal()
  
      this.elements.excluirButtons()
        .eq(index)
        .scrollIntoView()
        .should('be.visible')
        .click()
    }
  
  
    clicarPrimeiroEditar() {
      this.clicarEditarPorIndex(0)
    }
  
    clicarPrimeiroExcluir() {
      this.clicarExcluirPorIndex(0)
    }
  
  }
  
  export default new AdminListaDeProdutos()