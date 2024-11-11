import React, { useState } from 'react';
import axios from 'axios';
import './AddPatient.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos

const AddPatient = () => {
  const [Patient, setPatient] = useState({
    ID_Paciente: '',
    Nombre: '',
    Edad: '',
    Genero: '',
    Direccion: '',
    Numero_Contacto: '',
    Antecedentes_Medicos: '',
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
        toast.success('Paciente agregado correctamente', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        
        // Limpiar los campos del formulario después de guardar el paciente
        setPatient({
          ID_Paciente: '',
          Nombre: '',
          Edad: '',
          Genero: '',
          Direccion: '',
          Numero_Contacto: '',
          Antecedentes_Medicos: '',
          Telefono: ''
        });
      })
      .catch((error) => {
        console.error('Error al agregar paciente:', error);
        toast.error('Hubo un error al agregar al paciente', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      });
  };

  return (
    <div className="add-patient-container">
      <h2>Agregar Paciente</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="ID_Paciente" 
          value={Patient.ID_Paciente} 
          onChange={handleChange} 
          placeholder="ID del Paciente" 
        />

        <input 
          type="text" 
          name="Nombre"  
          value={Patient.Nombre} 
          onChange={handleChange} 
          placeholder="Nombre" 
        />
        <input 
          type="number" 
          name="Edad"  
          value={Patient.Edad} 
          onChange={handleChange} 
          placeholder="Edad" 
        />
        <input 
          type="text" 
          name="Genero"  
          value={Patient.Genero} 
          onChange={handleChange} 
          placeholder="Género" 
        />
        <input 
          type="text" 
          name="Direccion"  
          value={Patient.Direccion} 
          onChange={handleChange} 
          placeholder="Dirección" 
        />
        <input 
          type="text" 
          name="Telefono"  
          value={Patient.Telefono} 
          onChange={handleChange} 
          placeholder="Teléfono" 
        />
        <input 
          type="text" 
          name="Numero_Contacto"  
          value={Patient.Numero_Contacto} 
          onChange={handleChange} 
          placeholder="Número de Contacto" 
        />
        <input 
          type="text" 
          name="Antecedentes_Medicos"  
          value={Patient.Antecedentes_Medicos} 
          onChange={handleChange} 
          placeholder="Antecedentes Médicos" 
        />
        
        <button type="submit">Agregar Paciente</button>
      </form>
      {/* Contenedor para las notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default AddPatient;
