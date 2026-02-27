import { usuariosService } from '../services/usuarios.service';

export const deletarUsuariosPorPrefixo = (prefixo) => {
  return usuariosService.listarUsuarios(`?nome=${prefixo}`).then(res => {
    res.body.usuarios.forEach(u => {
      usuariosService.deletarUsuario(u._id).then(resDel => {
        cy.log(`Usuário fantasma ${u.nome} deletado: ${resDel.body.message}`);
      });
    });
  });
};