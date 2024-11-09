import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './treatment.css'

const Treatments = ({ patientId }) => {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    setTreatments([]); 
  }, [patientId]);

  const fetchTreatments = () => {
    if (!patientId) return;

    axios.get(`http://localhost:5000/registro_tratamientos/${patientId}`)
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
        <div className='CardTratment'>
          <h3>Tratamientos del Paciente</h3>
          <ul>
            {treatments.map((treatment) => (
              <li key={treatment.ID_Tratamiento}>
                <div className="treatment-field"><strong>Tratamiento:</strong> {treatment.Nombre_Tratamiento}</div>
                <div className="treatment-field"><strong>Médico:</strong> {treatment.ID_Medico}</div>
                <div className="treatment-field"><strong>Descripción:</strong> {treatment.Descripcion}</div>
                <div className="treatment-field"><strong>Fecha Inicio:</strong> {treatment.Fecha_Inicio}</div>
                <div className="treatment-field"><strong>Fecha Fin:</strong> {treatment.Fecha_Fin}</div>
                <div className="treatment-field"><strong>Frecuencia:</strong> {treatment.Frecuencia}</div>
                <div className="treatment-field"><strong>Duración de la Sesión:</strong> {treatment.Duracion_Sesion}</div>
                <div className="treatment-field"><strong>Costo:</strong> ${treatment.Costo}</div>
                <div className="treatment-field"><strong>Notas:</strong> {treatment.Notas}</div>
                <div className="treatment-field"><strong>Estado:</strong> {treatment.Estado}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Treatments;
