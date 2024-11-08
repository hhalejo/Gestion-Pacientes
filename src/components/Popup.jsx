import React from 'react';

const Popup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>¡Este es un Popup!</h2>
        <p>Contenido del popup...</p>
        <button onClick={onClose}>Salir</button> {/* Botón para cerrar el popup */}
      </div>
    </div>
  );
};

export default Popup;