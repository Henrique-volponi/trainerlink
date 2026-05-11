const pool = require('../db');

async function criar({ aluno_id, personal_id, data_hora, duracao_minutos }) {
  const { rows } = await pool.query(
    `INSERT INTO agendamentos (aluno_id, personal_id, data_hora, duracao_minutos)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [aluno_id, personal_id, data_hora, duracao_minutos]
  );
  return rows[0];
}

async function listar({ aluno_id, personal_id } = {}) {
  const params = [];
  let where = '';

  if (aluno_id) {
    params.push(aluno_id);
    where += ` AND aluno_id = $${params.length}`;
  }
  if (personal_id) {
    params.push(personal_id);
    where += ` AND personal_id = $${params.length}`;
  }

  const { rows } = await pool.query(
    `SELECT * FROM agendamentos WHERE 1=1${where} ORDER BY data_hora DESC`,
    params
  );
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await pool.query(
    `SELECT * FROM agendamentos WHERE id = $1`,
    [id]
  );
  return rows[0] || null;
}

async function atualizarStatus(id, { status, personal_id }) {
  const params = [id, status];
  const sets = ['status = $2'];

  if (personal_id !== undefined) {
    params.push(personal_id);
    sets.push(`personal_id = $${params.length}`);
  }

  const { rows } = await pool.query(
    `UPDATE agendamentos SET ${sets.join(', ')} WHERE id = $1 RETURNING *`,
    params
  );
  return rows[0] || null;
}

module.exports = { criar, listar, buscarPorId, atualizarStatus };
