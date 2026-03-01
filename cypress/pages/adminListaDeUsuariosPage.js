class AdminListaDeUsuariosPage {

    // =========================
    // MAPEAMENTO DOS ELEMENTOS
    // =========================
  
    elements = {
      editarButtons: () => cy.contains('button', 'Editar'),
      excluirButtons: () => cy.contains('button', 'Excluir')
    }
  
  
    // =========================
    // MÉTODO PARA SCROLL HORIZONTAL
    // =========================
  
    scrollHorizontal() {
      cy.get('body').scrollTo('right')
    }
  
  
    // =========================
    // AÇÕES COM MÚLTIPLOS BOTÕES
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
    
    encontrarUsuarioPorNome(nome, email) {
      cy.contains(nome).scrollIntoView()
      cy.contains(email).scrollIntoView()
    }
    
  }
  
  export default new AdminListaDeUsuariosPage()