const db = require('../db');
const nodemailer = require('nodemailer');
const fecha = new Date();
require('dotenv').config();

exports.crearSolicitud = (req, res) => {
  const { nombres, apellidos, email, celular, id_curso, mensaje, fecha } = req.body;
  const sql = `INSERT INTO solicitudes_tutoria (nombres, apellidos, email, celular, id_curso, mensaje, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [nombres, apellidos, email, celular, id_curso, mensaje, fecha], err => {
    if (err) return res.status(500).json({ error: 'Error al guardar solicitud' });
    res.json({ mensaje: 'Solicitud enviada correctamente' });
  });
};

exports.obtenerSolicitudes = (req, res) => {
  db.query(`
    SELECT s.*, c.titulo AS nombre_curso 
    FROM solicitudes_tutoria s 
    JOIN cursos c ON s.id_curso = c.id_curso 
    ORDER BY s.fecha DESC
  `, (err, results) => {

    if (err) return res.status(500).json({ error: 'Error al obtener solicitudes' });
    res.json(results);
  });
};

exports.eliminarSolicitud = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM solicitudes_tutoria WHERE id_solicitud = ?', [id], err => {
    if (err) return res.status(500).json({ error: 'Error al eliminar solicitud' });
    res.json({ mensaje: 'Solicitud eliminada' });
  });
};

exports.asignarTutoria = (req, res) => {
  const id = req.params.id;
  const { fecha, hora, enlace } = req.body;

  // Obtener correo
  db.query('SELECT email, nombres FROM solicitudes_tutoria WHERE id_solicitud = ?', [id], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Solicitud no encontrada' });

    const { email, nombres } = results[0];

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: 'Asignación de tutorías',
      to: email,
      subject: 'Tutoría Asignada',
      text: `Hola ${nombres}, tu tutoría fue asignada para el día ${fecha} a las ${hora}. Puedes unirte mediante el siguiente enlace: ${enlace}`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ error: 'Error al enviar correo' });

      db.query('UPDATE solicitudes_tutoria SET asignada = 1 WHERE id_solicitud = ?', [id], err => {
        if (err) return res.status(500).json({ error: 'Error al actualizar solicitud' });
        res.json({ mensaje: 'Tutoría asignada y correo enviado' });
      });
    });
  });
};

