export const produtoFactory = {

    valido() {
      return {
        nome: `QA_Produto_${Date.now()}`,
        preco: 100,
        descricao: 'Produto de teste',
        quantidade: 10
      };
    },
  
    semNome() {
      const produto = this.valido();
      delete produto.nome;
      return produto;
    },
  
    precoNegativo() {
      return {
        ...this.valido(),
        preco: -1
      };
    }
  
  };