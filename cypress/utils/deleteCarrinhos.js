import { usuariosService } from '../services/usuarios.service';
import { loginService } from '../services/login.service';
import { carrinhoService } from '../services/carrinhos.service';

export const deletarCarrinhosPorPrefixoUsuario = (prefixo) => {

  return usuariosService
    .listarUsuarios(`?nome=${prefixo}`)
    .then(res => {

      const usuarios = res.body.usuarios;

      if (!usuarios || usuarios.length === 0) {
        cy.log('Nenhum usuário encontrado para limpar carrinhos');
        return;
      }

      usuarios.forEach(usuario => {

        // Faz login do usuário
        loginService
          .realizarLogin({
            email: usuario.email,
            password: usuario.password
          })
          .then(resLogin => {

            if (!resLogin.body.authorization) {
              cy.log(`Falha no login: ${usuario.email}`);
              return;
            }

            const token = resLogin.body.authorization;

            // Cancela o carrinho
            carrinhoService
              .cancelarCompra(token)
              .then(resCancel => {

                cy.log(
                  `Carrinho do usuário ${usuario.nome} removido: ${resCancel.body.message}`
                );

              });

          });

      });

    });

};