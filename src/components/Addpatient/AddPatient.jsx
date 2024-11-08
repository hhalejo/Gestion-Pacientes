import React, { useState } from 'react';
import axios from 'axios';


const AddPatient = () => {
  const [Patient, setPatient] = useState({
    Nombre: '',
    Edad: '',
    Direccion: '',
    Telefono: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/pacientes', Patient)
      .then((response) => {
        alert('Paciente agregado correctamente');
      })
      .catch((error) => {
        console.error('Error al agregar paciente:', error);
        alert('Hubo un error al agregar al paciente');
      });
  };

  return (
    <div>
      <h2>Agregar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="Nombre"  // Usamos 'Nombre' con la primera letra en mayúscula
          value={Patient.Nombre} 
          onChange={handleChange} 
          placeholder="Nombre" 
        />
        <input 
          type="number" 
          name="Edad"  // Usamos 'Edad' con la primera letra en mayúscula
          value={Patient.Edad} 
          onChange={handleChange} 
          placeholder="Edad" 
        />
        <input 
          type="text" 
          name="Direccion"  // Usamos 'Direccion' con la primera letra en mayúscula
          value={Patient.Direccion} 
          onChange={handleChange} 
          placeholder="Dirección" 
        />
        <input 
          type="text" 
          name="Telefono"  // Usamos 'Telefono' con la primera letra en mayúscula
          value={Patient.Telefono} 
          onChange={handleChange} 
          placeholder="Teléfono" 
        />
        <button type="submit">Agregar Paciente</button>
      </form>
    </div>
  );
};

export default AddPatient;
