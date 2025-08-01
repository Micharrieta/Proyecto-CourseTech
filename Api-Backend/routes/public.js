const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/cursos', (req, res) => {
  const sql = 'SELECT * FROM cursos WHERE visible = 1';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener cursos' });
    res.json(results);
  });
});

module.exports = router;
