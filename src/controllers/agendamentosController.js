const Agendamentos = require('../models/agendamentos');
const Usuarios = require('../models/usuarios');

const STATUS_VALIDOS = ['confirmado', 'recusado', 'concluido'];

async function criar(req, res) {
  const { aluno_id, personal_id, data_hora, duracao_minutos } = req.body;

  if (!aluno_id || !personal_id || !data_hora || !duracao_minutos) {
    return res.status(400).json({ erro: 'aluno_id, personal_id, data_hora e duracao_minutos são obrigatórios' });
  }

  try {
    const aluno = await Usuarios.buscarPorId(aluno_id);
    if (!aluno || aluno.tipo !== 'aluno') {
      return res.status(422).json({ erro: 'aluno_id não corresponde a um aluno válido' });
    }

    const personal = await Usuarios.buscarPorId(personal_id);
    if (!personal || personal.tipo !== 'personal') {
      return res.status(422).json({ erro: 'personal_id não corresponde a um personal válido' });
    }

    const agendamento = await Agendamentos.criar({ aluno_id, personal_id, data_hora, duracao_minutos });
    return res.status(201).json(agendamento);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

async function listar(req, res) {
  const { aluno_id, personal_id } = req.query;

  try {
    const agendamentos = await Agendamentos.listar({
      aluno_id: aluno_id ? Number(aluno_id) : undefined,
      personal_id: personal_id ? Number(personal_id) : undefined,
    });
    return res.json(agendamentos);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

async function buscarPorId(req, res) {
  const id = Number(req.params.id);

  try {
    const agendamento = await Agendamentos.buscarPorId(id);
    if (!agendamento) return res.status(404).json({ erro: 'Agendamento não encontrado' });
    return res.json(agendamento);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

async function atualizarStatus(req, res) {
  const id = Number(req.params.id);
  const { status, personal_id } = req.body;

  if (!status) {
    return res.status(400).json({ erro: 'status é obrigatório' });
  }
  if (!STATUS_VALIDOS.includes(status)) {
    return res.status(400).json({ erro: `status deve ser um de: ${STATUS_VALIDOS.join(', ')}` });
  }

  try {
    const agendamento = await Agendamentos.atualizarStatus(id, { status, personal_id });
    if (!agendamento) return res.status(404).json({ erro: 'Agendamento não encontrado' });
    return res.json(agendamento);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: 'Erro interno' });
  }
}

module.exports = { criar, listar, buscarPorId, atualizarStatus };
