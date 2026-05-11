const { Router } = require('express');
const { listarPersonals } = require('../controllers/usuariosController');

const router = Router();

router.get('/', listarPersonals);

module.exports = router;
