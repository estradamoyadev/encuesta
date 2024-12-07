import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Gracias() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Obtener el nombre del usuario desde los datos que pasamos al redirigir
  const { nombre } = location.state || {}; // Usamos 'location.state' para obtener los datos enviados
  
  // Función para regresar al formulario
  const handleRegresar = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Gracias, {nombre}!</h1>
      <p>Canjea tu promoción.</p>
      <img className="qr" src="../public/qr.png" alt="QR Promo" /> {/* Cambia la ruta con la imagen del QR */}
      <br />
      <button onClick={handleRegresar}>Regresar</button>
    </div>
  );
}

export default Gracias;
