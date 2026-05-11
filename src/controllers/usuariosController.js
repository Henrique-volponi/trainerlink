const Usuarios = require('../models/usuarios');

async function cadastrar(req, res) {
  const { nome, email, senha_hash, tipo } = req.body;

  if (!nome || !email || !senha_hash || !tipo) {
    return res.status(400).json({ erro: 'nome, email, senha_hash e tipo são obrigatórios' });
  }
  if (!['aluno', 'personal'].includes(tipo)) {
    return res.status(400).json({ erro: "tipo deve ser 'aluno' ou 'personal'" });
  }

  try {
    const usuario = await Usuarios.criar({ nome, email, senha_hash, tipo });
    return res.status(201).json(usuario);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ erro: 'Email já cadastrado' });
    }
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

async function listarPersonals(req, res) {
  try {
    const personals = await Usuarios.listarPersonals();
    return res.json(personals);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

module.exports = { cadastrar, listarPersonals };
