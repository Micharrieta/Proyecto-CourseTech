const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

const crearTutor = async () => {
  const hashedPassword = await bcrypt.hash('tutor123', 10);

  const sql = 'INSERT INTO usuarios (nombres, apellidos, email, contrasena, genero, id_rol) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(
    sql,
    ['Tutor', 'Principal', 'tutor@plataforma.com', hashedPassword, 'Otro', 2],
    (err) => {
      if (err) {
        console.error('❌ Error al insertar tutor', err.sqlMessage);
      } else {
        console.log('✅ Tutor creado correctamente');
      }
      db.end();
    }
  );
};

crearTutor();
