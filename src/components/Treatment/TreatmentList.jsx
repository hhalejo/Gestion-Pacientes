import React from 'react';
import './treatment.css';

function TreatmentList() {
  const treatments = [
    { id: 1, name: 'Tratamiento de hipertensión', patient: 'Juan Pérez' },
    { id: 2, name: 'Vacunación contra la gripe', patient: 'María Gómez' },
  ];

  return (
    <div className="treatment-list">
      <h2>Tratamientos</h2>
      <ul>
        {treatments.map(treatment => (
          <li key={treatment.id}>
            {treatment.name} para {treatment.patient}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TreatmentList;
