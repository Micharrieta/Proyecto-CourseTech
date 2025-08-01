const express = require('express');
const cors = require('cors');
const publicRoutes = require('./routes/public');

const verificarToken = require('./middleware/verificarToken');  


require('./db');
// Importa la conexión a la base de datos y las rutas
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const evaluacionRoutes = require('./routes/evaluacion');
const foroRoutes = require('./routes/foro');
const rutasTutor = require('./routes/tutor');
const rutasTutorias = require('./routes/tutorias');
const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/evaluaciones', verificarToken, evaluacionRoutes);
app.use('/api/foros', foroRoutes);
app.use('/api/tutor', rutasTutor);
app.use('/api/tutorias', rutasTutorias);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});