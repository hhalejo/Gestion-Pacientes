import React from 'react';
import './appointmentList.css';

function AppointmentList() {
  const appointments = [
    { id: 1, patient: 'Juan Pérez', doctor: 'Dr. Roberto García', date: '2024-11-10' },
    { id: 2, patient: 'María Gómez', doctor: 'Dra. Laura Mendoza', date: '2024-11-12' },
  ];

  return (
    <div className="appointment-list">
      <h2>Citas</h2>
      <ul>
        {appointments.map(appointment => (
          <li key={appointment.id}>
            {appointment.patient} con {appointment.doctor} el {appointment.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentList;
