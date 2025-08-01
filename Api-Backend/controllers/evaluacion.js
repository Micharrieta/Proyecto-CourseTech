const db = require('../db');

// Obtener preguntas + opciones de una evaluación
exports.obtenerPreguntas = (req, res) => {
  const idEvaluacion = req.params.id_evaluacion;

  const sql = `
  SELECT p.id_pregunta, p.texto AS texto_pregunta,
         o.id_opcion, o.texto AS texto_opcion
  FROM preguntas p
  JOIN opciones o ON p.id_pregunta = o.id_pregunta
  WHERE p.id_evaluacion = ?
`;



  db.query(sql, [idEvaluacion], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al cargar preguntas' });

    // Agrupar por pregunta
    const preguntasMap = {};
    results.forEach(row => {
      if (!preguntasMap[row.id_pregunta]) {
        preguntasMap[row.id_pregunta] = {
          id_pregunta: row.id_pregunta,
          texto: row.texto_pregunta,
          opciones: []
        };
      }
      preguntasMap[row.id_pregunta].opciones.push({
        id_opcion: row.id_opcion,
        texto: row.texto_opcion
      });
    });

    const preguntas = Object.values(preguntasMap);
    res.json(preguntas);
  });
};

// Guardar respuestas y calcular nota
exports.enviarRespuestas = (req, res) => {
  const { id_evaluacion, respuestas } = req.body;
  const id_usuario = req.user.id; // viene del middleware

  if (!Array.isArray(respuestas)) {
    return res.status(400).json({ error: 'Formato de respuestas inválido' });
  }

  let correctas = 0;
  let total = respuestas.length;

  // Verificar y guardar respuestas
  const verificarSQL = `SELECT es_correcta FROM opciones WHERE id_opcion = ? AND id_pregunta = ?`;

  const insertSQL = `INSERT INTO respuestas_usuario (id_usuario, id_pregunta, id_opcion) VALUES ?`;

  const respuestasInsert = [];




  const verificarTodas = respuestas.map(r => {
    return new Promise((resolve) => {
      db.query(verificarSQL, [r.id_opcion, r.id_pregunta], (err, rows) => {
        if (!err && rows.length && rows[0].es_correcta) correctas++;
        respuestasInsert.push([id_usuario, r.id_pregunta, r.id_opcion]);
        resolve();
      });
    });
  });

  

  Promise.all(verificarTodas).then(() => {
    db.query(insertSQL, [respuestasInsert], (err) => {
      
      if (err) return res.status(500).json({ error: 'Error guardando respuestas' });

      const puntaje = (correctas / total) * 100;
      db.query('INSERT INTO resultados (id_usuario, id_evaluacion, puntaje_obtenido) VALUES (?, ?, ?)',
        [id_usuario, id_evaluacion, puntaje],
        (err2) => {
          if (err2) return res.status(500).json({ error: 'Error guardando resultado' });
          res.json({ mensaje: 'Respuestas guardadas', puntaje });
        });
    });
  });
};


// Eliminar una pregunta y sus opciones
exports.eliminarPregunta = (req, res) => {
  const id = req.params.id;

  // Primero eliminar las opciones asociadas
  db.query('DELETE FROM opciones WHERE id_pregunta = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar opciones' });

    // Luego eliminar la pregunta
    db.query('DELETE FROM preguntas WHERE id_pregunta = ?', [id], (err2) => {
      if (err2) return res.status(500).json({ error: 'Error al eliminar pregunta' });
      res.json({ mensaje: 'Pregunta eliminada correctamente' });
    });
  });
};


exports.editarPregunta = (req, res) => {
  const id_pregunta = req.params.id;
  const { texto, opciones } = req.body;

  const updatePreguntaSQL = 'UPDATE preguntas SET texto = ? WHERE id_pregunta = ?';
  const updateOpcionSQL = 'UPDATE opciones SET texto = ?, es_correcta = ? WHERE id_opcion = ?';

  db.query(updatePreguntaSQL, [texto, id_pregunta], (err1) => {
    if (err1) return res.status(500).json({ error: 'Error actualizando pregunta' });

    const promesas = opciones.map(op =>
      new Promise((resolve, reject) => {
        db.query(updateOpcionSQL, [op.texto, op.es_correcta, op.id_opcion], (err2) => {
          if (err2) reject(err2);
          else resolve();
        });
      })
    );

    Promise.all(promesas)
      .then(() => res.json({ mensaje: 'Pregunta y opciones actualizadas' }))
      .catch(() => res.status(500).json({ error: 'Error actualizando opciones' }));
  });
};

