const { Router } = require('express');
const ctrl = require('../controllers/agendamentosController');

const router = Router();

router.post('/', ctrl.criar);
router.get('/', ctrl.listar);
router.get('/:id', ctrl.buscarPorId);
router.patch('/:id/status', ctrl.atualizarStatus);

module.exports = router;
