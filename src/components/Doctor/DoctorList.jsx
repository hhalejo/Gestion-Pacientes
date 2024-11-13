import React from 'react';
import './DoctorList.css';

function DoctorList() {
  const doctors = [
    
  ];

  return (
    <div className="doctor-list">
      <h2>Médicos</h2>
      <ul>
        {doctors.map(doctor => (
          <li key={doctor.id}>{doctor.name} - {doctor.specialty}</li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorList;
