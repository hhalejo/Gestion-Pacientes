import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './treatment_form.css';
import { validatePatient } from '../Patient/PatienList';

const TratamientosList = () => {
  const [tratamientos, setTratamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('id');
  const [selectedTratamiento, setSelectedTratamiento] = useState(null); // Tratamiento seleccionado
  const [patientId, setPatientId] = useState('');
  const [formData, setFormData] = useState({
    ID_Paciente: '',
    ID_Medico: '',
    Fecha_Inicio: '',
    Fecha_Fin: '',
    Frecuencia: '',
    Duracion_Sesion: '',
    Costo: '',
    Notas: '',
    Estado: 'Activo'
  });
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  useEffect(() => {
    axios.get('http://localhost:5000/Tratamientos')
      .then((response) => {
        setTratamientos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTreatmentSelect = (tratamiento) => {
    console.log("Tratamiento seleccionado: ", tratamiento); // Verifica que se está seleccionando correctamente
    setSelectedTratamiento(tratamiento); // Guardamos el tratamiento seleccionado
    openModal(); // Abrir el modal cuando se seleccione un tratamiento
  };

  const openModal = () => {
    setIsModalOpen(true); // Abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Cerrar el modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar si el paciente existe
    const isPatientValid = await validatePatient(patientId);
    if (!isPatientValid) {
      alert('El paciente no existe.');
      return;
    }

    // Verificar que se haya seleccionado un tratamiento
    if (!selectedTratamiento) {
      alert('Debe seleccionar un tratamiento.');
      return;
    }

    // Verificar el ID_Tratamiento antes de la solicitud
    console.log("ID_Tratamiento seleccionada: ", selectedTratamiento.ID_Tratamiento);

    // Enviar la solicitud con el ID del tratamiento seleccionado
    axios.post('http://localhost:5000/Registro_Tratamientos', {
      ID_Tratamiento: selectedTratamiento.ID_Tratamiento,  // Aquí pasamos el ID del tratamiento
      ID_Paciente: formData.ID_Paciente,
      ID_Medico: formData.ID_Medico,
      Fecha_Inicio: formData.Fecha_Inicio,
      Fecha_Fin: formData.Fecha_Fin,
      Frecuencia: formData.Frecuencia,
      Duracion_Sesion: formData.Duracion_Sesion,
      Costo: formData.Costo,
      Notas: formData.Notas,
      Estado: formData.Estado
    })
    .then((response) => {
      alert('Registro de tratamiento guardado exitosamente');
      console.log('Respuesta del servidor:', response.data);
      setFormData({
        ID_Paciente: '',
        ID_Medico: '',
        Fecha_Inicio: '',
        Fecha_Fin: '',
        Frecuencia: '',
        Duracion_Sesion: '',
        Costo: '',
        Notas: '',
        Estado: 'Activo'
      });
      setSelectedTratamiento(null);
      closeModal(); // Cerrar el modal después de enviar el formulario
    })
    .catch((error) => {
      console.error('Error al guardar el registro:', error.response ? error.response.data : error.message);
      alert('Error al guardar el registro');
    });
  };

  const filteredTratamientos = tratamientos.filter((tratamiento) => {
    if (searchBy === 'id') {
      return tratamiento.ID_Tratamiento.toString().includes(searchTerm.trim());
    }
    if (searchBy === 'name') {
      return tratamiento.Nombre_Tratamiento.toLowerCase().includes(searchTerm.trim().toLowerCase());
    }
    return true;
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <span>Cargando tratamientos...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        Error al cargar los tratamientos: {error.message}
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">Lista de Tratamientos</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder={`Buscar por ${searchBy === 'id' ? 'ID' : 'Nombre'}`}
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <select onChange={(e) => setSearchBy(e.target.value)} value={searchBy} className="search-select">
          <option value="id">ID</option>
          <option value="name">Nombre</option>
        </select>
      </div>

      <ul className="tratamiento-list">
        {filteredTratamientos.map((tratamiento) => (
          <li
            key={tratamiento.ID_Tratamiento}
            className={`tratamiento-button ${selectedTratamiento?.ID_Tratamiento === tratamiento.ID_Tratamiento ? 'selected' : ''}`}
            onClick={() => handleTreatmentSelect(tratamiento)}
          >
            {tratamiento.Nombre_Tratamiento}
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeModal}>&times;</button>
            <h2>Registrar Tratamiento</h2>
            <form onSubmit={handleSubmit} className="form">
              <label>
                ID Paciente:
                <input
                  type="text"
                  name="ID_Paciente"
                  value={formData.ID_Paciente}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                ID Médico:
                <input
                  type="number"
                  name="ID_Medico"
                  value={formData.ID_Medico}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Fecha de Inicio:
                <input
                  type="date"
                  name="Fecha_Inicio"
                  value={formData.Fecha_Inicio}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Fecha de Fin:
                <input
                  type="date"
                  name="Fecha_Fin"
                  value={formData.Fecha_Fin}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Frecuencia (por semana):
                <input
                  type="number"
                  name="Frecuencia"
                  value={formData.Frecuencia}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Duración de Sesión (minutos):
                <input
                  type="number"
                  name="Duracion_Sesion"
                  value={formData.Duracion_Sesion}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Costo:
                <input
                  type="number"
                  name="Costo"
                  value={formData.Costo}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Notas:
                <textarea
                  name="Notas"
                  value={formData.Notas}
                  onChange={handleInputChange}
                />
              </label>

              <button type="submit" className="submit-btn">Registrar Tratamiento</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TratamientosList;
