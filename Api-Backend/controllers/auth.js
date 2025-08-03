const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

exports.register = async (req, res) => {
  const { nombres, apellidos, email, contrasena, genero, celular } = req.body;
  const id_rol = 3;

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const sql = 'INSERT INTO usuarios (nombres, apellidos, email, contrasena, genero, celular, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombres, apellidos, email, hashedPassword, genero, celular, id_rol], (err, result) => {
      if (err)
        return res.status(500).json({ error: 'Error al registrar usuario' });
      res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al procesar la contraseña' });
  }
};

exports.login = (req, res) => {
  const { email, contrasena } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    const usuario = results[0];
    const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!validPassword) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.id_rol },
      process.env.JWT_TOKEN,
      { expiresIn: '1d' }
    );

    res.json({ mensaje: 'Inicio de sesión exitoso', token });
  });
};

exports.obtenerUsuario = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const sql = 'SELECT nombres FROM usuarios WHERE id_usuario = ?';
    db.query(sql, [decoded.id], (err, results) => {
      if (err || results.length === 0) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json({ nombres: results[0].nombres });
    });
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

exports.solicitarRecuperacion = (req, res) => {
  const { email } = req.body;
  const sql = 'SELECT id_usuario FROM usuarios WHERE email = ?';

  db.query(sql, [email], (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'Correo no encontrado' });

    const usuario = results[0];
    const token = jwt.sign({ id: usuario.id_usuario }, process.env.JWT_TOKEN, { expiresIn: '15m' });
    const enlace = `http://${req.headers.host}/restablecer.html?token=${token}`;


    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: 'Recuperación Plataforma',
      to: email,
      subject: 'Recuperar contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="${enlace}">${enlace}</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json({ error: 'Error al enviar el correo' });
      res.json({ mensaje: 'Correo de recuperación enviado' });
    });
  });
};

exports.restablecerContrasena = async (req, res) => {
  const { token, nuevaContrasena } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    const sql = 'UPDATE usuarios SET contrasena = ? WHERE id_usuario = ?';

    db.query(sql, [hashedPassword, decoded.id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar contraseña' });
      res.json({ mensaje: 'Contraseña actualizada correctamente' });
    });
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
