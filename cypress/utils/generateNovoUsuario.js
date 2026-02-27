import { gerarNome } from './generateName';
import { gerarEmail } from './generateEmail';
import { gerarSenha } from './generatePassword';

export function gerarNovoUsuario(administrador = false) {
    return {
      nome: gerarNome(),
      email: gerarEmail(),
      password: gerarSenha(),
      administrador: administrador ? "true" : "false"
    };
  }