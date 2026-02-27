import { gerarNovoUsuario } from '../utils/generateNovoUsuario';
import { gerarEmail } from '../utils/generateEmail';
import { gerarSenha } from '../utils/generatePassword';
import { usuariosService } from '../services/usuarios.service';

export const loginFactory = {

    criarUsuario(tipo = "comum") {
        const administrador = tipo === "admin";
        const usuario = gerarNovoUsuario(administrador);
      
        return usuariosService.criarUsuario(usuario).then(res => ({
          email: usuario.email,
          password: usuario.password,
          _id: res.body._id
        }));
      },
  
  usuarioSenhaIncorreta(usuario) {
    return { email: usuario.email, password: "senhaErrada123" };
  },

  usuarioEmailInexistente() {
    return { email: gerarEmail(), password: gerarSenha() };
  },

  usuarioEmailVazio(usuario) {
    return { email: "", password: usuario.password };
  },

  usuarioSenhaVazia(usuario) {
    return { email: usuario.email, password: "" };
  },

  usuarioCorpoVazio() {
    return {};
  },

  usuarioEmailInvalidoFormato(usuario) {
    return { email: "emailinvalido", password: usuario.password };
  },

  usuarioEmailNumero(usuario) {
    return { email: 123456, password: usuario.password };
  },

  usuarioSenhaNumero(usuario) {
    return { email: usuario.email, password: 12345678 };
  },

  usuarioCamposNulos() {
    return { email: null, password: null };
  }
};

  