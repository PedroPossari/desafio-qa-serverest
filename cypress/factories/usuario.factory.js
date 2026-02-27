import { gerarEmail } from '../utils/generateEmail';
import { gerarSenha } from '../utils/generatePassword';
import { gerarNome } from '../utils/generateName';


export const usuarioFactory = {

  usuarioValido(administrador = "false") {
    return {
      nome: gerarNome(),
      email: gerarEmail(),
      password: gerarSenha(),
      administrador
    };
  },

  usuarioAdmin() {
    return this.usuarioValido("true");
  },

  usuarioComum() {
    return this.usuarioValido("false");
  },

  usuarioEmailInvalidoSemArroba() {
    return {
      ...this.usuarioComum(),
      email: 'emailinvalido.com'
    };
  },

  usuarioEmailInvalidoSemDominio() {
    return {
      ...this.usuarioComum(),
      email: 'email@'
    };
  },

  usuarioEmailVazio() {
    return {
      ...this.usuarioComum(),
      email: ''
    };
  },

  usuarioCamposNulos() {
    return {
      nome: null,
      email: null,
      password: null,
      administrador: null
    };
  },

  usuarioCamposVazios() {
    return {
      nome: '',
      email: '',
      password: '',
      administrador: ''
    };
  },

  usuarioSemNome() {
    const { nome, ...resto } = this.usuarioComum();
    return resto;
  },

  usuarioSemSenha() {
    const { password, ...resto } = this.usuarioComum();
    return resto;
  },

  usuarioSemAdmin() {
    const { administrador, ...resto } = this.usuarioComum();
    return resto;
  },

  usuarioSenhaCurta() {
    return {
      ...this.usuarioComum(),
      password: '123'
    };
  },

  usuarioSenhaLonga(tamanho = 300) {
    return {
      ...this.usuarioComum(),
      password: 'a'.repeat(tamanho)
    };
  },

  usuarioAdminInvalido() {
    return {
      ...this.usuarioComum(),
      administrador: 'invalido'
    };
  }
};