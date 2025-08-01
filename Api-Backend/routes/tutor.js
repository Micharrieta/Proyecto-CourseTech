const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutor');
const verificarTutor = require('../middleware/verificarTutor');

router.get('/foros/:idForo/mensajes', verificarTutor, tutorController.obtenerMensajesPorForo);
router.delete('/foros/mensajes/:id', verificarTutor, tutorController.eliminarMensaje);
router.get('/estadisticas', verificarTutor, tutorController.obtenerEstadisticas);

module.exports = router;
