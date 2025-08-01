const express = require('express');
const router = express.Router();
const evaluacionController = require('../controllers/evaluacion');
const verificarToken = require('../middleware/verificarToken');

// Obtener preguntas y opciones de una evaluación
router.get('/:id_evaluacion', verificarToken, evaluacionController.obtenerPreguntas);

// Enviar respuestas
router.post('/responder', verificarToken, evaluacionController.enviarRespuestas);

router.put('/preguntas/:id', evaluacionController.editarPregunta);

router.delete('/preguntas/:id', evaluacionController.eliminarPregunta);
module.exports = router;
