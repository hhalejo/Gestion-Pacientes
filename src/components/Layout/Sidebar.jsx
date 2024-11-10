import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCalendarCheck, FaStethoscope, FaMedkit } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const [showPatients, setShowPatients] = useState(false);  // Estado para mostrar/ocultar la lista de pacientes

  const togglePatients = () => {
    setShowPatients(!showPatients);  // Cambia el estado cuando se hace clic en "Pacientes"
  };

  return (
    <div className="sidebar">
      <h2>Gestión de Salud</h2>
      <nav>
        <ul>
          {/* Enlace principal de Pacientes que despliega el sub-enlace */}
          <li>
            <Link to="#" onClick={togglePatients}>
              <FaUser /> Pacientes
            </Link>
            {/* Condición para mostrar el sub-enlace de lista de pacientes */}
            {showPatients && (
              <ul className="sub-menu">
                <li><Link to="/patients">Lista de Pacientes</Link></li>
                <li><Link to="/add-patient">Agregar Paciente</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/doctors"><FaStethoscope /> Médicos</Link></li>
          <li><Link to="/appointments"><FaCalendarCheck /> Citas</Link></li>
          <li><Link to="/Treatments"><FaMedkit /> Tratamientos </Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;