const { Router } = require('express');

const usuarios     = require('./usuarios');
const personals    = require('./personals');
const agendamentos = require('./agendamentos');
const treinos      = require('./treinos');

const router = Router();

router.use('/usuarios',     usuarios);
router.use('/personals',    personals);
router.use('/agendamentos', agendamentos);
router.use('/treinos',      treinos);

module.exports = router;
