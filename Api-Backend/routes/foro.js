const express = require('express');
const router = express.Router();
const foroController = require('../controllers/foro');
const verificarToken = require('../middleware/verificarToken');

// Obtener mensajes del foro por curso
router.get('/curso/:idCurso', verificarToken, foroController.obtenerMensajes);

// Enviar nuevo mensaje al foro de un curso
router.post('/curso/:idCurso/mensaje', verificarToken, foroController.agregarMensaje);

module.exports = router;
