const db = require('../db');

exports.obtenerUsuarios = (req, res) => {
  const sql = 'SELECT id_usuario, nombres, apellidos, celular, email, id_rol FROM usuarios WHERE id_rol != 1';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener usuarios' });
    res.json(results);
  });
};

exports.eliminarUsuario = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM usuarios WHERE id_usuario = ? AND id_rol != 1';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar usuario' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  });
};

exports.editarUsuario = (req, res) => {
  const id = req.params.id;
  const { nombres, apellidos, celular, email, id_rol } = req.body;

  const sql = `
    UPDATE usuarios 
    SET nombres = ?, apellidos = ?, celular = ?, email = ?, id_rol = ?
    WHERE id_usuario = ? AND id_rol != 1
  `;

  db.query(sql, [nombres, apellidos, celular, email, id_rol, id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar usuario' });
    res.json({ mensaje: 'Usuario actualizado correctamente' });
  });
};

// Obtener todos los cursos
exports.obtenerCursos = (req, res) => {
  const sql = 'SELECT id_curso, titulo, descripcion, visible FROM cursos';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener cursos' });
    res.json(results);
  });
};

// Cambiar visibilidad
exports.cambiarVisibilidadCurso = (req, res) => {
  const id = req.params.id;
  const sql = 'UPDATE cursos SET visible = NOT visible WHERE id_curso = ?';
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al cambiar visibilidad del curso' });
    res.json({ mensaje: 'Estado de visibilidad actualizado' });
  });
};


exports.agregarPregunta = (req, res) => {
  const { texto, opciones } = req.body; // opciones: [{ texto: '...', es_correcta: true }, ...]
  const id_evaluacion = req.params.id;

  db.query('INSERT INTO preguntas (id_evaluacion, texto) VALUES (?, ?)', [id_evaluacion, texto], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al insertar pregunta' });

    const id_pregunta = result.insertId;
    const valores = opciones.map(op => [id_pregunta, op.texto, op.es_correcta]);

    db.query('INSERT INTO opciones (id_pregunta, texto, es_correcta) VALUES ?', [valores], (err2) => {
      if (err2) return res.status(500).json({ error: 'Error al insertar opciones' });
      res.json({ mensaje: 'Pregunta agregada correctamente' });
    });
  });
};

exports.editarPregunta = (req, res) => {
  const id_pregunta = req.params.id;
  const { texto, opciones } = req.body;

  db.query('UPDATE preguntas SET texto = ? WHERE id_pregunta = ?', [texto, id_pregunta], (err) => {
    if (err) return res.status(500).json({ error: 'Error actualizando la pregunta' });

    // Actualiza las opciones
    const actualizaciones = opciones.map(op =>
      new Promise((resolve) => {
        db.query('UPDATE opciones SET texto = ?, es_correcta = ? WHERE id_opcion = ?',
          [op.texto, op.es_correcta, op.id_opcion], resolve);
      })
    );

    Promise.all(actualizaciones)
      .then(() => res.json({ mensaje: 'Pregunta y opciones actualizadas' }))
      .catch(() => res.status(500).json({ error: 'Error actualizando opciones' }));
  });
};

exports.obtenerPreguntaPorId = (req, res) => {
  const id = req.params.id;

  const preguntaSQL = 'SELECT texto FROM preguntas WHERE id_pregunta = ?';
  const opcionesSQL = 'SELECT id_opcion, texto, es_correcta FROM opciones WHERE id_pregunta = ?';

  db.query(preguntaSQL, [id], (err1, preguntaResult) => {
    if (err1 || preguntaResult.length === 0) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }

    const pregunta = {
      id_pregunta: id,
      texto: preguntaResult[0].texto,
      opciones: []
    };

    db.query(opcionesSQL, [id], (err2, opcionesResult) => {
      if (err2) return res.status(500).json({ error: 'Error al obtener opciones' });

      pregunta.opciones = opcionesResult;
      res.json(pregunta);
    });
  });
};

exports.eliminarPregunta = (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM preguntas WHERE id_pregunta = ?';

  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar pregunta' });
    res.json({ mensaje: 'Pregunta eliminada correctamente' });
  });
};

// Obtener estadísticas para el dashboard
exports.obtenerEstadisticas = (req, res) => {

  const resultados = {
    totalUsuarios: 0,
    totalCursos: 0,
    totalEvaluaciones: 0,
    totalPreguntas: 0,
    totalRespuestas: 0,
    promedioPuntajes: 0,
    usuariosRespondieron: 0,
    evaluacionMasRespondida: '',
    usuarioMasActivo: '',
    usuariosPorRol: [],
    preguntasPorEvaluacion: []
  };

  const queries = [
    {
      sql: 'SELECT COUNT(*) AS total FROM usuarios',
      callback: r => resultados.totalUsuarios = r[0].total
    },
    {
      sql: 'SELECT COUNT(*) AS total FROM cursos',
      callback: r => resultados.totalCursos = r[0].total
    },
    {
      sql: 'SELECT COUNT(*) AS total FROM evaluaciones',
      callback: r => resultados.totalEvaluaciones = r[0].total
    },
    {
      sql: 'SELECT COUNT(*) AS total FROM preguntas',
      callback: r => resultados.totalPreguntas = r[0].total
    },
    {
      sql: 'SELECT COUNT(*) AS total FROM resultados',
      callback: r => resultados.totalRespuestas = r[0].total
    },
    {
      sql: 'SELECT COUNT(DISTINCT id_usuario) AS total FROM resultados',
      callback: r => resultados.usuariosRespondieron = r[0].total
    },
    {
      sql: `
        SELECT e.titulo, COUNT(p.id_pregunta) AS totalPreguntas
        FROM evaluaciones e
        LEFT JOIN preguntas p ON e.id_evaluacion = p.id_evaluacion
        GROUP BY e.id_evaluacion
      `,
      callback: r => resultados.preguntasPorEvaluacion = r
    },
    {
      sql: 'SELECT AVG(puntaje_obtenido) AS promedio FROM resultados',
      callback: r => resultados.promedioPuntajes = parseFloat(r[0].promedio).toFixed(2)
    },
    {
      sql: `
        SELECT e.titulo, COUNT(r.id_resultado) AS total_respuestas
        FROM resultados r
        JOIN evaluaciones e ON e.id_evaluacion = r.id_evaluacion
        GROUP BY r.id_evaluacion
        ORDER BY total_respuestas DESC
        LIMIT 1
      `,
      callback: r => resultados.evaluacionMasRespondida = r.length ? r[0].titulo : 'Sin datos'
    },
    {
      sql: `
          SELECT u.nombres, u.apellidos, COUNT(r.id_resultado) AS total_intentos
          FROM resultados r
          JOIN usuarios u ON u.id_usuario = r.id_usuario
          GROUP BY r.id_usuario
          ORDER BY total_intentos DESC
          LIMIT 1;
        `,
        callback: r => resultados.usuarioMasActivo = r[0]
          ? `${r[0].nombres} ${r[0].apellidos} (${r[0].total_intentos} intentos)`
          : 'Sin datos'
    },
    {
      sql: `
        SELECT r.nombre_rol AS rol, COUNT(u.id_usuario) AS total
        FROM roles r
        LEFT JOIN usuarios u ON u.id_rol = r.id_rol
        GROUP BY r.id_rol
      `,
      callback: r => resultados.usuariosPorRol = r
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

// Eliminar un mensaje específico
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

exports.transformarEnTutor = (req, res) => {
  const id = req.params.id;

  const sql = `
    UPDATE usuarios 
    SET id_rol = 2
    WHERE id_usuario = ? AND id_rol != 1
  `;

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al cambiar el rol del usuario' });
    res.json({ mensaje: 'Usuario convertido a tutor correctamente' });
  });
};



