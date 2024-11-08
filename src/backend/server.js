const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Cambia si tienes una contraseña en MySQL
  database: 'GESTION SALUD'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middleware
app.use(cors());
app.use(express.json());

// Rutas para obtener datos
app.get('/Pacientes', (req, res) => {
  db.query('SELECT * FROM Pacientes', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});



// Ruta para actualizar pacientes
app.put('/Pacientes/:id', (req, res) => {
  const patientId = req.params.id;
  const { Nombre, Edad, Direccion, Telefono, Antecedentes_Medicos } = req.body;
 // Imprimir los datos recibidos para verificar que son correctos
  console.log('Datos para actualizar:', { Nombre, Edad, Direccion, Telefono,Antecedentes_Medicos, patientId }); 

  console.log('Datos recibidos para actualización:', req.body); // Depuración

  const query = 'UPDATE Pacientes SET Nombre = ?, Edad = ?, Direccion = ?, Telefono = ?, Antecedentes_Medicos = ? WHERE ID_Paciente = ?';
  
  db.query(query, [Nombre, Edad, Direccion, Telefono, Antecedentes_Medicos, patientId, ], (err, results) => {
    if (err) {
      console.error('Error al actualizar paciente:', err);
      return res.status(500).json({ message: 'Error al actualizar paciente', error: err });
    }
    
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
    
    res.status(200).json({ message: 'Paciente actualizado correctamente' });
  });
});






app.get('/medicos', (req, res) => {
  db.query('SELECT * FROM Medicos', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Ruta para agregar pacientes
app.post('/Pacientes', (req, res) => {
  const { Nombre, Edad, Direccion, Telefono } = req.body;

  const query = 'INSERT INTO pacientes (nombre, edad, direccion, telefono) VALUES (?, ?, ?, ?)';
  db.query(query, [Nombre, Edad, Direccion, Telefono], (err, results) => { // Cambio a db.query
    if (err) {
      console.error('Error al agregar paciente:', err);
      return res.status(500).json({ message: 'Error al agregar paciente', error: err });
    }
    res.status(200).json({ message: 'Paciente agregado correctamente', patientId: results.insertId });
  });
});



// Ruta para agregar citas
app.post('/citas', (req, res) => {
  const { ID_paciente, ID_medico, fecha } = req.body;
  const query = 'INSERT INTO citas (paciente_id, medico_id, fecha) VALUES (?, ?, ?)';
  db.query(query, [ID_paciente, ID_medico, fecha], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});




// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
