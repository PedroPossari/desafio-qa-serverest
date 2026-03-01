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
  
  
    clicarEditarPorNome(nome) {
      cy.contains('td', nome)
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Editar').click()
        })
    }
    
    clicarExcluirPorNome(nome) {
      cy.contains('td', nome)
        .parent('tr')
        .within(() => {
          cy.contains('button', 'Excluir').click()
        })
    }

    encontrarProdutoPorNome(nome, preco) {
      cy.contains(nome).scrollIntoView()
      cy.contains(preco.toString()).scrollIntoView()
    }
  
  }
  
  export default new AdminListaDeProdutos()