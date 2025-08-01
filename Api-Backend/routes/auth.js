const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/usuario', authController.obtenerUsuario);
router.post('/solicitar-recuperacion', authController.solicitarRecuperacion);
router.post('/restablecer', authController.restablecerContrasena);


module.exports = router;
