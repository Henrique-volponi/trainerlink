const { Router } = require('express');
const ctrl = require('../controllers/treinosController');

const router = Router();

router.post('/', ctrl.criar);
router.get('/', ctrl.listarPorAluno);

module.exports = router;
