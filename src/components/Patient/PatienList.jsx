import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatienList.css';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null); // Paciente seleccionado para mostrar detalles
  const [isEditing, setIsEditing] = useState(false); // Estado para controlar si se está editando

  useEffect(() => {
    axios.get('http://localhost:5000/pacientes')
      .then((response) => {
        console.log("Datos obtenidos:", response.data);
        setPatients(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener pacientes:', error);
      });
  }, []);

  const handlePatientClick = (patient) => {
    console.log("Paciente seleccionado:", patient); // Verificar que contiene ID_Paciente
    setSelectedPatient(patient);
    setIsEditing(false); // Resetear la edición cuando se selecciona un nuevo paciente
  };

  // Filtra los pacientes según el término de búsqueda
  const filteredPatients = patients.filter(patient =>
    patient.Nombre && patient.Nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = () => {
    setIsEditing(true); // Activar el modo de edición
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedPatient({
      ...selectedPatient,
      [name]: value,
    });
  };



  const handleSaveClick = () => {
    if (!selectedPatient || !selectedPatient.ID_Paciente) {
      console.error("ID del paciente no encontrado o es indefinido");
      return;
    }
  
    const patientId = selectedPatient.ID_Paciente;
  
    // Actualizamos todos los datos relevantes
    const updatedData = {
      Nombre: selectedPatient.Nombre,
      Edad: selectedPatient.Edad,
      Direccion: selectedPatient.Direccion, 
      Telefono: selectedPatient.Telefono,   
      Antecedentes_Medicos: selectedPatient.Antecedentes_Medicos,  
    };
  
    // Realizar el PUT
    axios.put(`http://localhost:5000/Pacientes/${patientId}`, updatedData)
      .then(response => {
        console.log('Paciente actualizado:', response.data);
        alert('Paciente actualizado correctamente');
        // Si es necesario, actualiza la lista de pacientes para reflejar los cambios
        // Puedes hacer un nuevo GET o actualizar el estado local (setPatients)
      })
      .catch(error => {
        console.error('Error al actualizar paciente:', error);
        alert('Error al actualizar paciente: ' + error.message);
      });
  };

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

      {/* Contenedor de detalles del paciente */}
      {selectedPatient && (
        <div className="patient-details">
          <h2>Detalles del Paciente</h2>

          {/* Mostrar datos en modo de solo lectura o editable */}

          <div>
            <strong>ID:</strong>
            {isEditing ? (
              <input
                type="text"
                name="ID_Paciente"
                value={selectedPatient.ID_Paciente || ''}
                onChange={handleChange}
              />
            ) : (
              <p>{selectedPatient.ID_Paciente}</p>
            )}
          </div>




          <div>
            <strong>Nombre:</strong>
            {isEditing ? (
              <input
                type="text"
                name="Nombre"
                value={selectedPatient.Nombre || ''}
                onChange={handleChange}
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
                value={selectedPatient.Edad || ''}
                onChange={handleChange}
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
                value={selectedPatient.Direccion || ''}
                onChange={handleChange}
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
                value={selectedPatient.Telefono || ''}
                onChange={handleChange}
              />
            ) : (
              <p>{selectedPatient.telefono}</p>
            )}
          </div>

          {/* Mostrar el botón de editar o guardar */}
          <div>
            {!isEditing ? (
              <button onClick={handleEditClick}>Editar</button>
            ) : (
              <button onClick={handleSaveClick}>Guardar cambios</button>
            )}
          </div>

          <div>
            <strong>Antecedentes médicos:</strong>
            {isEditing ? (
              <textarea
                name="Antecedentes_Medicos"
                value={selectedPatient.Antecedentes_Medicos || ''}
                onChange={handleChange}
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
        </div>
      )}
    </div>
  );
};

export default PatientList;
