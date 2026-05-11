const pool = require('../db');

async function criar({ nome, email, senha_hash, tipo }) {
  const { rows } = await pool.query(
    `INSERT INTO usuarios (nome, email, senha_hash, tipo)
     VALUES ($1, $2, $3, $4)
     RETURNING id, nome, email, tipo, criado_em`,
    [nome, email, senha_hash, tipo]
  );
  return rows[0];
}

async function listarPersonals() {
  const { rows } = await pool.query(
    `SELECT id, nome, email, tipo, criado_em
     FROM usuarios
     WHERE tipo = 'personal'
     ORDER BY nome`
  );
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await pool.query(
    `SELECT id, nome, email, tipo, criado_em FROM usuarios WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}

module.exports = { criar, listarPersonals, buscarPorId };
