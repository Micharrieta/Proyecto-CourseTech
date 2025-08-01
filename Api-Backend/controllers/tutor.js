const db = require('../db');

// Obtener mensajes con datos del usuario por foro
exports.obtenerMensajesPorForo = (req, res) => {
  const idForo = req.params.idForo;

  const sql = `
    SELECT m.id_mensaje, u.id_usuario, u.nombres, u.apellidos, m.mensaje, m.fecha
    FROM mensajes_foro m
    JOIN foros f ON f.id_foro = m.id_foro
    JOIN usuarios u ON u.id_usuario = m.id_usuario
    WHERE m.id_foro = ?
    ORDER BY m.fecha DESC
  `;

  db.query(sql, [idForo], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener mensajes del foro' });
    }
    res.json(results);
  });
};

exports.eliminarMensaje = (req, res) => {
  const idMensaje = req.params.id;

  const sql = 'DELETE FROM mensajes_foro WHERE id_mensaje = ?';

  db.query(sql, [idMensaje], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar mensaje' });
    }
    res.json({ mensaje: 'Mensaje eliminado correctamente' });
  });
};

exports.obtenerEstadisticas = (req, res) => {
  const resultados = {
    totalSolicitudes: 0,
    totalAsignadas: 0,
    totalNasignadas: 0,
    solicitudesPorCurso: []
  };

  const queries = [
    {
      sql: 'SELECT COUNT(*) AS total_solicitudes FROM solicitudes_tutoria',
      callback: r => resultados.totalSolicitudes = r[0].total_solicitudes
    },
    {
      sql: 'SELECT COUNT(*) AS total_asignadas FROM solicitudes_tutoria WHERE asignada = 1',
      callback: r => resultados.totalAsignadas = r[0].total_asignadas
    },
    {
      sql: 'SELECT COUNT(*) AS total_nasignadas FROM solicitudes_tutoria WHERE asignada = 0',
      callback: r => resultados.totalNasignadas = r[0].total_nasignadas
    },
    {
      sql: `
        SELECT c.titulo AS curso, COUNT(*) AS total
        FROM solicitudes_tutoria s
        JOIN cursos c ON s.id_curso = c.id_curso
        GROUP BY c.id_curso
      `,
      callback: r => resultados.solicitudesPorCurso = r
    }

  ];

  let pendientes = queries.length;

  queries.forEach(({ sql, callback }) => {
    db.query(sql, (err, resQuery) => {
      if (err) {
        console.error('Error en consulta:', sql, '\n', err);
      } else {
        callback(resQuery);
      }

      pendientes--;
      if (pendientes === 0) {
        res.json(resultados);
      }
    });
  });
};


