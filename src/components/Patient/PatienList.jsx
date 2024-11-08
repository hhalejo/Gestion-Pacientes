import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatienList.css';
import Treatments from '../Treatment/TreatmentList';
import EditPatient from '../EditPatient/EditPatient';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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
  };

  // Modificación del filtrado para buscar por ID o por nombre
  const filteredPatients = patients.filter(patient => {
    const search = searchTerm.toLowerCase();
    return (
      (patient.ID_Paciente && patient.ID_Paciente.toString().includes(search)) || // Filtra por ID
      (patient.Nombre && patient.Nombre.toLowerCase().includes(search)) // Filtra por nombre
    );
  });

  return (
    <div className="patient-list-container">
      <div className="patient-list">
        <h2>Lista de Pacientes</h2>
        <input
          type="text"
          placeholder="Buscar por nombre o ID"
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
                  <p>{`ID: ${patient.ID_Paciente || "ID no disponible"}`}</p> 
                </div>
              </li>
            ))
          ) : (
            <li>No se encontraron pacientes.</li>
          )}
        </ul>
      </div>

      {selectedPatient && !isEditing && (
        <div className="patient-details">
          <h2>Detalles del Paciente</h2>

          <div>
            <strong>Nombre:</strong>
            <p>{selectedPatient.Nombre}</p>
          </div>

          <div>
            <strong>Edad:</strong>
            <p>{selectedPatient.Edad} años</p>
          </div>

          <div>
            <strong>Dirección:</strong>
            <p>{selectedPatient.Direccion}</p>
          </div>

          <div>
            <strong>Teléfono:</strong>
            <p>{selectedPatient.Telefono}</p>
          </div>

          <div>
            <strong>Antecedentes médicos:</strong>
            <textarea
              value={selectedPatient.Antecedentes_Medicos || ''}
              readOnly
              rows={6}
              className="large-input"
            />
          </div>

          {/* Botón de edición */}
          <button className="edit-btn" onClick={() => setIsEditing(true)}>Editar Paciente</button>

          {/* Usar el componente Treatments y pasar el ID del paciente */}
          <Treatments patientId={selectedPatient.ID_Paciente} />
        </div>
      )}

      {isEditing && selectedPatient && (
        <EditPatient
          patient={selectedPatient}
          onSave={(updatedPatient) => {
            setSelectedPatient(updatedPatient);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default PatientList;
