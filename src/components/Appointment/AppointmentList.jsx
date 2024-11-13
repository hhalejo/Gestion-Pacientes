import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentList.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importar los estilos

const AsignarCita = () => {
  const [formData, setFormData] = useState({
    ID_Paciente: '',
    ID_Medico: '',
    Fecha: '',
    Hora: '',
    Motivo_Cita: '',
    Requiere_Tratamiento: false,
    ID_Tratamiento: '',
    Estado: '',
  });

  const [tratamientos, setTratamientos] = useState([]);  // Almacenamos los tratamientos disponibles

  // Llamada a la API para obtener los tratamientos disponibles
  useEffect(() => {
    axios.get('http://localhost:5000/Tratamientos')  // Endpoint para obtener los tratamientos
      .then(response => {
        console.log('Tratamientos obtenidos:', response.data);  // Verifica la respuesta en la consola
        // Verificar si los datos tienen la estructura correcta
        if (Array.isArray(response.data) && response.data.length > 0) {
          setTratamientos(response.data);  // Guardamos los tratamientos en el estado
        } else {
          console.error('No se encontraron tratamientos.');
        }
      })
      .catch(error => {
        console.error('Error al obtener tratamientos:', error);
      });
  }, []);  // Solo se ejecuta una vez cuando el componente se monta

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/citas_medicas', formData)
      .then(response => {
        
        toast.success('Paciente agregado correctamente', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setFormData({
          ID_Paciente: '',
          ID_Medico: '',
          Fecha: '',
          Hora: '',
          Motivo_Cita: '',
          Requiere_Tratamiento: false,
          ID_Tratamiento: '',
          Estado: '',
        });
      })
      .catch(error => {
        console.error('Error al asignar cita médica:', error);
        
        toast.error('Hubo un error al agregar al paciente', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

      });
      
      
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Asignar Cita Médica</h2>
      
      <div className="form-row">
        <div className="form-group">
          <label>ID Paciente:</label>
          <input type="text" name="ID_Paciente" value={formData.ID_Paciente} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>ID Médico:</label>
          <input type="text" name="ID_Medico" value={formData.ID_Medico} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>ID Tratamiento:</label>
          <select name="ID_Tratamiento" value={formData.ID_Tratamiento} onChange={handleChange} required>
            <option value="">Seleccione un tratamiento</option>
            {tratamientos.length > 0 ? (
              tratamientos.map((tratamiento) => (
                <option key={tratamiento.ID_Tratamiento} value={tratamiento.ID_Tratamiento}>
                  {tratamiento.Nombre_Tratamiento}
                </option>
              ))
            ) : (
              <option value="">Cargando tratamientos...</option>
            )}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Fecha:</label>
          <input type="date" name="Fecha" value={formData.Fecha} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Hora:</label>
          <input type="time" name="Hora" value={formData.Hora} onChange={handleChange} required />
        </div>
      </div>

      <div className="form-group">
        <label>Motivo de la Cita:</label>
        <textarea name="Motivo_Cita" value={formData.Motivo_Cita} onChange={handleChange} required />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>¿Requiere Tratamiento?</label>
          <input type="checkbox" name="Requiere_Tratamiento" checked={formData.Requiere_Tratamiento} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Estado:</label>
          <select name="Estado" value={formData.Estado} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Confirmada">Confirmada</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
      </div>
      
      <button type="submit">Asignar Cita</button>
    </form>
    
    

  );
  
  
  
};


export default AsignarCita;
