const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 5000;

// Conexión con la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia con tu usuario de MySQL
  password: '', // Cambia con tu contraseña
  database: 'GESTION SALUD' // Nombre de la base de datos
});

// Middleware para parsear JSON
app.use(express.json());

// Ruta para insertar un paciente
app.post('/pacientes', (req, res) => {
  const { Nombre, Edad, Direccion, Telefono } = req.body;

  const query = 'INSERT INTO pacientes (Nombre, Edad, Direccion, Telefono) VALUES (?, ?, ?, ?)';
  
  connection.execute(query, [Nombre, Edad, Direccion, Telefono], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al insertar paciente', error: err });
    }
    res.status(200).json({ message: 'Paciente agregado correctamente', patientId: results.insertId });
  });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
