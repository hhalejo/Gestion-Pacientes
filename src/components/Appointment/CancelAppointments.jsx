import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CancelAppointments.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CitaList = () => {
  const [citas, setCitas] = useState([]);
  const [editingCita, setEditingCita] = useState(null);
  const [newFecha, setNewFecha] = useState('');
  const [newHora, setNewHora] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCitas, setFilteredCitas] = useState([]);
  const [confirmDeleteCita, setConfirmDeleteCita] = useState(null); // Nueva variable para el modal de confirmación

  // Función para cargar todas las citas
  const fetchCitas = () => {
    axios.get('http://localhost:5000/Citas_Medicas')
      .then(response => {
        setCitas(response.data);
        setFilteredCitas(response.data);
      })
      .catch(error => {
        console.error('Error al cargar citas:', error);
        toast.error('No se pudieron cargar las citas.');
      });
  };

  // Cargar las citas al inicio
  useEffect(() => {
    fetchCitas();
  }, []);

  // Eliminar una cita
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/Citas_Medicas/${id}`)
      .then(() => {
        toast.success('Cita eliminada correctamente');
        fetchCitas(); // Actualizar la lista de citas
      })
      .catch(error => {
        console.error('Error al eliminar la cita:', error);
        toast.error('No se pudo eliminar la cita');
      });
  };

  // Función para abrir el modal de confirmación de eliminación
  const openConfirmDeleteModal = (id) => {
    setConfirmDeleteCita(id); // Guardar el ID de la cita a eliminar
  };

  // Confirmar o cancelar la eliminación
  const confirmDelete = () => {
    if (confirmDeleteCita) {
      handleDelete(confirmDeleteCita);
      setConfirmDeleteCita(null); // Cerrar el modal después de eliminar
    }
  };

  const cancelDelete = () => {
    setConfirmDeleteCita(null); // Cerrar el modal sin eliminar
  };

  // Abrir el modal para editar la cita
  const openEditModal = (cita) => {
    setEditingCita(cita.ID_Cita);
    setNewFecha(cita.Fecha);
    setNewHora(cita.Hora);
  };

  // Actualizar cita
  const handleUpdate = () => {
    if (!newFecha || !newHora) {
      toast.error('Por favor, ingresa una nueva fecha y hora.');
      return;
    }

    axios.put(`http://localhost:5000/Citas_Medicas/${editingCita}`, {
      Fecha: newFecha,
      Hora: newHora,
    })
      .then(() => {
        toast.success('Cita actualizada correctamente');
        setEditingCita(null);
        fetchCitas(); // Actualizar la lista de citas
      })
      .catch(error => {
        console.error('Error al actualizar la cita:', error);
        toast.error('No se pudo actualizar la cita');
      });
  };

  // Filtrar citas por búsqueda
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      setFilteredCitas(citas);
    } else {
      const filtered = citas.filter(cita => {
        return (
          cita.ID_Cita.toString().includes(e.target.value) ||
          cita.Motivo_Cita.toLowerCase().includes(e.target.value.toLowerCase()) ||
          cita.ID_Paciente.toString().includes(e.target.value)
        );
      });
      setFilteredCitas(filtered);
    }
  };

  return (
    <div className="cita-list-container">
      <h2>Lista de Citas</h2>

      {/* Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar cita por ID, Motivo o ID Paciente"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Contenedor de tarjetas de citas */}
      <div className="cita-card-container">
        {filteredCitas.map((cita) => (
          <div key={cita.ID_Cita} className="cita-card">
            <h3>Cita ID: {cita.ID_Cita}</h3>
            <p><strong>ID Paciente:</strong> {cita.ID_Paciente}</p>
            <p><strong>ID Médico:</strong> {cita.ID_Medico}</p>
            <p><strong>Fecha:</strong> {cita.Fecha}</p>
            <p><strong>Hora:</strong> {cita.Hora}</p>
            <p><strong>Motivo:</strong> {cita.Motivo_Cita}</p>
            <p><strong>Tratamiento Requerido:</strong> {cita.Requiere_Tratamiento ? 'Sí' : 'No'}</p>
            <p><strong>ID Tratamiento:</strong> {cita.ID_Tratamiento}</p>
            <p><strong>Estado:</strong> {cita.Estado}</p>
            <div className="cita-actions">
              <button onClick={() => openConfirmDeleteModal(cita.ID_Cita)}>Eliminar</button>
              <button onClick={() => openEditModal(cita)}>Reasignar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de confirmación de eliminación */}
      {confirmDeleteCita && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Está seguro de que desea eliminar esta cita?</h3>
            <button onClick={confirmDelete}>Sí, eliminar</button>
            <button onClick={cancelDelete}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Modal de reasignación */}
      {editingCita && (
        <div className="modal">
          <div className="modal-content">
            <h3>Reasignar Fecha y Hora</h3>
            <label>Fecha:</label>
            <input
              type="date"
              value={newFecha}
              onChange={(e) => setNewFecha(e.target.value)}
            />
            <label>Hora:</label>
            <input
              type="time"
              value={newHora}
              onChange={(e) => setNewHora(e.target.value)}
            />
            <button onClick={handleUpdate}>Guardar Cambios</button>
            <button onClick={() => setEditingCita(null)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* Contenedor de notificaciones */}
      <ToastContainer />
    </div>
  );
};

export default CitaList;
