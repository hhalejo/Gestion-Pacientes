// Treatments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Treatments = ({ patientId }) => {
  const [treatments, setTreatments] = useState([]);

  // Este efecto se ejecuta cuando cambia el patientId
  useEffect(() => {
    setTreatments([]); // Limpiar tratamientos cuando cambia el paciente
  }, [patientId]);

  const fetchTreatments = () => {
    if (!patientId) return;

    axios.get(`http://localhost:5000/tratamientos/${patientId}`)
      .then(response => {
        console.log("Tratamientos obtenidos:", response.data);
        setTreatments(response.data);
      })
      .catch(error => {
        console.error('Error al obtener tratamientos:', error);
        alert('Error al obtener tratamientos');
      });
  };

  return (
    <div className="treatment-details">
      <button onClick={fetchTreatments}>Mostrar Tratamientos</button>
      
      {treatments.length > 0 && (
        <div>
          <h3>Tratamientos del Paciente</h3>
          <ul>
            {treatments.map((treatment) => (
              <li key={treatment.ID_Tratamiento}>
                <strong>Tratamiento:</strong> {treatment.Nombre_Tratamiento} <br />
                <strong>Medico:</strong> {treatment.ID_Medico} <br />
                <strong>Descripción:</strong> {treatment.Descripcion} <br />
                <strong>Fecha Inicio:</strong> {treatment.Fecha_Inicio} <br />
                <strong>Fecha Fin:</strong> {treatment.Fecha_Fin} <br />
                <strong>Frecuencia:</strong> {treatment.Frecuencia} <br />
                <strong>Duración de la Sesión:</strong> {treatment.Duracion_Sesion} <br />
                <strong>Costo:</strong> ${treatment.Costo} <br />
                <strong>Notas:</strong> {treatment.Notas} <br />
                <strong>Estado:</strong> {treatment.Estado} <br />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Treatments;
