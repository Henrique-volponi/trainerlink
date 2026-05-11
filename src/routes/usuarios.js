const { Router } = require('express');
const ctrl = require('../controllers/usuariosController');

const router = Router();

router.post('/', ctrl.cadastrar);

module.exports = router;
