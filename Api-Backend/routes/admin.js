const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const verificarAdmin = require('../middleware/verificarAdmin');



// Obtener usuarios
router.get('/usuarios', verificarAdmin, adminController.obtenerUsuarios);


router.delete('/usuarios/:id', verificarAdmin, adminController.eliminarUsuario);
router.put('/usuarios/:id', verificarAdmin, adminController.editarUsuario);
router.get('/cursos', verificarAdmin, adminController.obtenerCursos);
router.put('/cursos/:id/visibilidad', verificarAdmin, adminController.cambiarVisibilidadCurso);
router.post('/evaluaciones/:id/preguntas', adminController.agregarPregunta);
router.put('/preguntas/:id', adminController.editarPregunta);

//Editar y eliminaar preguntas de evaluaciones
router.get('/preguntas/:id', verificarAdmin, adminController.obtenerPreguntaPorId);
router.delete('/preguntas/:id', verificarAdmin, adminController.eliminarPregunta);

//Ver estadisticas
router.get('/estadisticas', verificarAdmin, adminController.obtenerEstadisticas);

// Ver mensajes de un foro específico
router.get('/foros/:idForo/mensajes', verificarAdmin, adminController.obtenerMensajesPorForo);


// Eliminar mensaje de un foro
router.delete('/foros/mensajes/:id', verificarAdmin, adminController.eliminarMensaje);

router.put('/usuarios/:id/tutor', verificarAdmin, adminController.transformarEnTutor);


// Más rutas aquí...

module.exports = router;
