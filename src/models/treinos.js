const pool = require('../db');

async function criar({ agendamento_id, peso_kg, observacoes }) {
  const { rows } = await pool.query(
    `INSERT INTO treinos (agendamento_id, peso_kg, observacoes)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [agendamento_id, peso_kg ?? null, observacoes ?? null]
  );
  return rows[0];
}

async function listarPorAluno(aluno_id) {
  const { rows } = await pool.query(
    `SELECT t.*, a.data_hora, a.personal_id, a.duracao_minutos
     FROM treinos t
     JOIN agendamentos a ON a.id = t.agendamento_id
     WHERE a.aluno_id = $1
     ORDER BY t.criado_em DESC`,
    [aluno_id]
  );
  return rows;
}

module.exports = { criar, listarPorAluno };
