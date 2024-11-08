// PatientList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatienList.css';
import Treatments from '../Treatment/TreatmentList'; // Importa el componente Treatments

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [updatedPatient, setUpdatedPatient] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/pacientes')
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener pacientes:', error);
      });
  }, []);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setIsEditing(false);
    setUpdatedPatient(patient); // Rellenar el formulario de edición con los datos actuales
  };

  const handleEditClick = () => {
    setIsEditing(true); // Cambiar a modo de edición
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPatient(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    axios.put(`http://localhost:5000/pacientes/${selectedPatient.ID_Paciente}`, updatedPatient)
      .then(response => {
        setSelectedPatient(updatedPatient); // Actualizar los datos del paciente
        setIsEditing(false);
        alert('Paciente actualizado correctamente');
      })
      .catch(error => {
        console.error('Error al actualizar paciente:', error);
        alert('Error al actualizar paciente');
      });
  };

  const filteredPatients = patients.filter(patient =>
    patient.Nombre && patient.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="patient-list-container">
      <div className="patient-list">
        <h2>Lista de Pacientes</h2>
        <input
          type="text"
          placeholder="Buscar paciente por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <ul>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <li
                key={patient.ID_Paciente || index}
                className="patient-item"
                onClick={() => handlePatientClick(patient)}
              >
                <div>
                  <strong>{patient.Nombre || "Nombre no disponible"}</strong>
                </div>
              </li>
            ))
          ) : (
            <li>No se encontraron pacientes.</li>
          )}
        </ul>
      </div>

      {selectedPatient && (
        <div className="patient-details">
          <h2>Detalles del Paciente</h2>

          <div>
            <strong>Nombre:</strong>
            {isEditing ? (
              <input
                type="text"
                name="Nombre"
                value={updatedPatient.Nombre || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{selectedPatient.Nombre}</p>
            )}
          </div>

          <div>
            <strong>Edad:</strong>
            {isEditing ? (
              <input
                type="number"
                name="Edad"
                value={updatedPatient.Edad || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{selectedPatient.Edad} años</p>
            )}
          </div>

          <div>
            <strong>Dirección:</strong>
            {isEditing ? (
              <input
                type="text"
                name="Direccion"
                value={updatedPatient.Direccion || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{selectedPatient.Direccion}</p>
            )}
          </div>

          <div>
            <strong>Teléfono:</strong>
            {isEditing ? (
              <input
                type="text"
                name="Telefono"
                value={updatedPatient.Telefono || ''}
                onChange={handleInputChange}
              />
            ) : (
              <p>{selectedPatient.Telefono}</p>
            )}
          </div>

          <div>
            <strong>Antecedentes médicos:</strong>
            {isEditing ? (
              <textarea
                name="Antecedentes_Medicos"
                value={updatedPatient.Antecedentes_Medicos || ''}
                onChange={handleInputChange}
                rows={6}
                className="large-input"
              />
            ) : (
              <textarea
                value={selectedPatient.Antecedentes_Medicos || ''}
                readOnly
                rows={6}
                className="large-input"
              />
            )}
          </div>

          {/* Botón de editar o guardar */}
          <div>
            {isEditing ? (
              <button onClick={handleSaveClick}>Guardar cambios</button>
            ) : (
              <button onClick={handleEditClick}>Editar paciente</button>
            )}
          </div>

          {/* Usar el componente Treatments y pasar el ID del paciente */}
          <Treatments patientId={selectedPatient.ID_Paciente} />
        </div>
      )}
    </div>
  );
};

export default PatientList;
