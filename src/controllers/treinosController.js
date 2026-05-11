const Treinos = require('../models/treinos');
const Agendamentos = require('../models/agendamentos');

async function criar(req, res) {
  const { agendamento_id, peso_kg, observacoes } = req.body;

  if (!agendamento_id) {
    return res.status(400).json({ erro: 'agendamento_id é obrigatório' });
  }

  try {
    const agendamento = await Agendamentos.buscarPorId(agendamento_id);
    if (!agendamento) {
      return res.status(404).json({ erro: 'Agendamento não encontrado' });
    }
    if (agendamento.status !== 'concluido') {
      return res.status(422).json({ erro: 'Treino só pode ser registrado para agendamento com status concluido' });
    }

    const treino = await Treinos.criar({ agendamento_id, peso_kg, observacoes });
    return res.status(201).json(treino);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

async function listarPorAluno(req, res) {
  const { aluno_id } = req.query;

  if (!aluno_id) {
    return res.status(400).json({ erro: 'Query param aluno_id é obrigatório' });
  }

  try {
    const treinos = await Treinos.listarPorAluno(Number(aluno_id));
    return res.json(treinos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

module.exports = { criar, listarPorAluno };
