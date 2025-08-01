const express = require('express');
const router = express.Router();
const tutoriasController = require('../controllers/tutorias');
const verificarTutor = require('../middleware/verificarTutor');



// Ruta para obtener solicitudes (tutor)
router.get('/solicitudes', verificarTutor, tutoriasController.obtenerSolicitudes);

// Ruta para eliminar una solicitud
router.delete('/solicitudes/:id', verificarTutor, tutoriasController.eliminarSolicitud);

// Ruta para asignar una tutoría y enviar correo
router.post('/solicitudes/:id/asignar', verificarTutor, tutoriasController.asignarTutoria);

router.post('/solicitar', tutoriasController.crearSolicitud);

module.exports = router;
