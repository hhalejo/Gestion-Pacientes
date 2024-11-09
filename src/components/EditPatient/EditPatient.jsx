// EditPatient.js
import React, { useState } from 'react';
import axios from 'axios';
import './EditPatient.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPatient = ({ patient, onSave, onCancel }) => {
  const [updatedPatient, setUpdatedPatient] = useState({ ...patient });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPatient(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    axios.put(`http://localhost:5000/pacientes/${patient.ID_Paciente}`, updatedPatient)
      .then(response => {
        toast.success('Paciente actualizado correctamente', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      })
      .catch(error => {
        console.error('Error al actualizar paciente:', error);
        toast.error('Error al actualizar paciente', {
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
    <div className="patient-edit-container">
      <h3>Editar Paciente</h3>
      <form className="patient-edit-form">
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="Nombre"
            value={updatedPatient.Nombre || ''}
            onChange={handleInputChange}
            placeholder="Nombre del paciente"
          />
        </div>

        <div className="form-group">
          <label className='etiquetas'>Edad:</label>
          <input
            type="number"
            name="Edad"
            value={updatedPatient.Edad || ''}
            onChange={handleInputChange}
            placeholder="Edad del paciente"
          />
        </div>

        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="Direccion"
            value={updatedPatient.Direccion || ''}
            onChange={handleInputChange}
            placeholder="Dirección del paciente"
          />
        </div>

        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="Telefono"
            value={updatedPatient.Telefono || ''}
            onChange={handleInputChange}
            placeholder="Teléfono del paciente"
          />
        </div>

        <div className="form-group">
          <label>Antecedentes médicos:</label>
          <textarea
            name="Antecedentes_Medicos"
            value={updatedPatient.Antecedentes_Medicos || ''}
            onChange={handleInputChange}
            rows={6}
            placeholder="Antecedentes médicos del paciente"
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleSaveClick} className="save-btn">Guardar cambios</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancelar</button>
        </div>  
      </form>

      
      <ToastContainer />
    </div>
  );
};

export default EditPatient;
