import { produtosService } from '../services/produtos.service';
import { gerarAuthTokens } from './generateAuthTokens';

export const deletarProdutosPorPrefixo = (prefixo) => {
  return gerarAuthTokens().then(({ admin }) => {
    const token = admin.token;


    return produtosService.listar(`?nome=${prefixo}`).then(res => {
      const produtos = res.body.produtos || [];

      if (produtos.length === 0) {
        return;
      }

      produtos.forEach(p => {
        produtosService.deletar(p._id, token).then(resDel => {
          cy.log(`Produto ${p.nome} deletado: ${resDel.body.message}`);
        });
      });
    });
  });
};