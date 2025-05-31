const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const router = express.Router();

const app = express();
const port = 5000;

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3307,
  database: 'gestion_salud'
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



app.get('/Pacientes/:id', async (req, res) => {
  try {
    const pacienteId = req.params.id;
    const paciente = await Pacientes.findOne({ where: { ID_Paciente: pacienteId } });

    if (paciente) {
      return res.json(paciente); // Retorna los datos del paciente si existe
    } else {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error al verificar paciente', error });
  }
});



app.get('/Pacientes', (req, res) => {
  db.query('SELECT * FROM Pacientes', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener los Pacientes', error: err });
    } else {
      res.json(results);
    }
  });
});




// Ruta para actualizar pacientes
app.put('/Pacientes/:id', (req, res) => {
  const tratmentId = req.params.id;
  const { Nombre, Edad, Direccion, Telefono, Antecedentes_Medicos } = req.body;
 
  console.log('Datos para actualizar:', { Nombre, Edad, Direccion, Telefono,Antecedentes_Medicos, tratmentId }); 

  console.log('Datos recibidos para actualización:', req.body); // Depuración

  const query = 'UPDATE Pacientes SET Nombre = ?, Edad = ?, Direccion = ?, Telefono = ?, Antecedentes_Medicos = ? WHERE ID_Paciente = ?';
  
  db.query(query, [Nombre, Edad, Direccion, Telefono, Antecedentes_Medicos, tratmentId, ], (err, results) => {
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
  const {ID_Paciente, Nombre, Edad, Genero, Direccion, Numero_Contacto, Antecedentes_Medicos, Telefono } = req.body;

  const query = 'INSERT INTO pacientes (id_paciente, nombre, edad, genero, direccion, telefono, numero_contacto, antecedentes_medicos) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [ID_Paciente, Nombre, Edad, Genero, Direccion, Telefono, Numero_Contacto, Antecedentes_Medicos], (err, results) => {
    if (err) {
      console.error('Error al agregar paciente:', err);
      return res.status(500).json({ message: 'Error al agregar paciente', error: err });
    }
    res.status(200).json({ message: 'Paciente agregado correctamente', tratmentId: results.insertId });
  });
});




app.get('/registro_tratamientos/:tratmentId', (req, res) => {
  const tratmentId = req.params.tratmentId;
  
  const query = `
    SELECT 
      rt.ID_Tratamiento, 
      t.Nombre_Tratamiento,
      rt.ID_Paciente,
      rt.ID_Medico, 
      t.Descripcion_Tratamiento, 
      rt.Fecha_Inicio, 
      rt.Fecha_Fin, 
      rt.Frecuencia, 
      rt.Duracion_Sesion, 
      rt.Costo, 
      rt.Notas, 
      rt.Estado
    FROM Registro_Tratamientos rt
    JOIN Tratamientos t ON rt.ID_Tratamiento = t.ID_Tratamiento
    WHERE rt.ID_Paciente = ?
  `;
  
  db.query(query, [tratmentId], (err, results) => {
    if (err) {
      console.error('Error al obtener tratamientos:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    } else {
      res.json(results); // Envío de los resultados
    }
  });
});



app.get('/Tratamientos', (req, res) => {
  db.query('SELECT * FROM Tratamientos', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener los tratamientos', error: err });
    } else {
      res.json(results);
    }
  });
});


// Endpoint para registrar un tratamiento
app.post('/Registro_Tratamientos', (req, res) => {
  const { ID_Tratamiento, ID_Paciente, ID_Medico, Fecha_Inicio, Fecha_Fin, Frecuencia, Duracion_Sesion, Costo, Notas, Estado } = req.body;

  const sql = `
      INSERT INTO Registro_Tratamientos (ID_Tratamiento, ID_Paciente, ID_Medico, Fecha_Inicio, Fecha_Fin, Frecuencia, Duracion_Sesion, Costo, Notas, Estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [ID_Tratamiento, ID_Paciente, ID_Medico, Fecha_Inicio, Fecha_Fin, Frecuencia, Duracion_Sesion, Costo, Notas, Estado];

  db.query(sql, values, (error, result) => {
      if (error) {
          console.error('Error en la inserción: ', error);
          return res.status(500).send('Error en el registro');
      }
      res.status(200).send('Registro exitoso');
  });
});

//obtener lista de citas
app.get('/Citas_Medicas', (req, res) => {
  db.query('SELECT * FROM Citas_Medicas', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error al obtener las citas ', error: err });
    } else {
      res.json(results);
    }
  });
});


//Cancelar Citas Medicas
app.put('/Citas_Medicas/:id', (req, res) => {
  const id = req.params.id;
  const nuevoEstado = req.body.Estado;

  const query = `UPDATE Citas_Medicas SET Estado = ? WHERE ID_Cita = ?`;
  
  db.query(query, [nuevoEstado, id], (error, results) => {
    if (error) {
      console.error('Error al actualizar el estado de la cita:', error);
      res.status(500).send('Error en el servidor');
    } else {
      res.send('Cita cancelada correctamente');
    }
  });
});

//Actualizar cita
app.put('/Citas_Medicas/:id', (req, res) => {
  const { id } = req.params;
  const { Fecha, Hora } = req.body;
  const Estado = req.body.Estado;

  // Realizar la consulta SQL para actualizar la cita en la base de datos
  const query = `UPDATE Citas_Medicas SET Fecha = ?, Hora = ?, Estado = ? WHERE ID_Cita = ?`;
  db.query(query, [Fecha, Hora, Estado, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar la cita:', err);
      res.status(500).send('Error al actualizar la cita');
    } else {
      res.send('Cita actualizada correctamente');
    }
  });
});

app.post('/Citas_Medicas', (req, res) => {
  const { ID_Paciente,	ID_Medico,	Fecha,	Hora,	Motivo_Cita,	Requiere_Tratamiento,	ID_Tratamiento,	Estado } = req.body;

  const sql = `
      INSERT INTO Citas_Medicas (ID_Paciente,	ID_Medico,	Fecha,	Hora,	Motivo_Cita,	Requiere_Tratamiento,	ID_Tratamiento,	Estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [ID_Paciente,	ID_Medico,	Fecha,	Hora,	Motivo_Cita,	Requiere_Tratamiento,	ID_Tratamiento,	Estado];

  db.query(sql, values, (error, result) => {
      if (error) {
          console.error('Error en la insercion de cita medica: ', error);
          return res.status(500).send('Error en el registro de cita medica');
      }
      res.status(200).send('Registro exitoso de la cita medica');
  });
});


//En esta linea se inicia el servidor
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
