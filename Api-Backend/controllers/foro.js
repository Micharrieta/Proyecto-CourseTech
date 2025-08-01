const db = require('../db');

// Obtener mensajes de un curso
exports.obtenerMensajes = (req, res) => {
  const idCurso = req.params.idCurso;

  const sql = `
    SELECT m.id_mensaje, m.mensaje, m.fecha, u.nombres, u.apellidos
    FROM foros f
    JOIN mensajes_foro m ON f.id_foro = m.id_foro
    JOIN usuarios u ON u.id_usuario = m.id_usuario
    WHERE f.id_curso = ?
    ORDER BY m.fecha DESC
  `;

  db.query(sql, [idCurso], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener mensajes del foro' });
    res.json(results);
  });
};


// Enviar un mensaje al foro
exports.agregarMensaje = (req, res) => {
  const idCurso = req.params.idCurso;
  const { mensaje } = req.body;
  const id_usuario = req.user.id; // ← del token (middleware verificarToken)

  const buscarForoSQL = 'SELECT id_foro FROM foros WHERE id_curso = ?';
  db.query(buscarForoSQL, [idCurso], (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(400).json({ error: 'Foro no encontrado para este curso' });
    }

    const id_foro = rows[0].id_foro;

    const insertarSQL = `
      INSERT INTO mensajes_foro (id_foro, id_usuario, mensaje, fecha)
      VALUES (?, ?, ?, NOW())
    `;

    db.query(insertarSQL, [id_foro, id_usuario, mensaje], (err2) => {
      if (err2) return res.status(500).json({ error: 'Error al enviar el mensaje' });
      res.json({ mensaje: 'Mensaje enviado correctamente' });
    });
  });
};

