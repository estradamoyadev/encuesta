import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar para navegar a la página de agradecimiento

function Formulario() {
  const [formData, setFormData] = useState({
    ticket: '',
    nombre: '',
    calificacion: '',
    comentario: '',
  });

  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate(); // Usamos navigate para redirigir después de enviar el formulario

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const nuevosErrores = {};
    // Validación del número de ticket
    if (!formData.ticket) {
      nuevosErrores.ticket = 'El número de ticket es obligatorio.';
    } else if (!/^\d+$/.test(formData.ticket)) {
      nuevosErrores.ticket = 'Solo se permiten números.';
    }
    // Validación del nombre del cliente
    if (!formData.nombre) {
        nuevosErrores.nombre = 'El nombre del cliente es obligatorio.';
      } else if (!/^[a-zA-Z\s]+$/.test(formData.nombre)) {
        nuevosErrores.nombre = 'El nombre solo puede contener letras y espacios.';
      }
      
    // Validación de la calificación
    if (!formData.calificacion) {
      nuevosErrores.calificacion = 'La calificación es obligatoria.';
    } else if (!/^[1-9]$|^10$/.test(formData.calificacion)) {
      nuevosErrores.calificacion = 'La calificación debe ser un número entre 1 y 10.';
    }
    // Validación del comentario
    if (!formData.comentario) {
      nuevosErrores.comentario = 'El comentario es obligatorio.';
    }
    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nuevosErrores = validateForm();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
    } else {
      setErrores({});
      try {
        // Enviar los datos al backend PHP
        const response = await fetch('http://localhost/backend/submit.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        // Verificar la respuesta cruda antes de intentar parsearla
        const responseText = await response.text();
        console.log(responseText); // Imprimir la respuesta cruda
  
        const result = JSON.parse(responseText); // Usar JSON.parse en lugar de response.json()
        
        if (result.success) {
          setMensaje('Formulario enviado correctamente');
          setFormData({
            ticket: '',
            nombre: '',
            calificacion: '',
            comentario: '',
          });
          // Redirigir a la página de agradecimiento
          navigate('/gracias', { state: { nombre: formData.nombre } }); // Pasar el nombre del usuario
        } else {
          setMensaje('Hubo un error al enviar el formulario: ' + result.message);
        }
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
        setMensaje('Error al enviar el formulario');
      }
    }
  };

  return (
   <div>
    <h1>Valora nuestro servicio</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label>Número de ticket:</label>
        <input
          type="text"
          name="ticket"
          value={formData.ticket}
          onChange={handleChange}
          placeholder="Ingresa el número de ticket"
        />
        {errores.ticket && <p style={{ color: 'red' }}>{errores.ticket}</p>}
      </div>
      <div>
        <label>Nombre del cliente:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ingresa el nombre del cliente"
        />
        {errores.nombre && <p style={{ color: 'red' }}>{errores.nombre}</p>}
      </div>
      <div>
        <label>Calificación (1-10):</label>
        <input
          type="number"
          name="calificacion"
          value={formData.calificacion}
          onChange={handleChange}
          placeholder="Ingresa la calificación"
          min="1"
          max="10"
        />
        {errores.calificacion && <p style={{ color: 'red' }}>{errores.calificacion}</p>}
      </div>
      <div>
        <label>Comentario:</label>
        <textarea
          name="comentario"
          value={formData.comentario}
          onChange={handleChange}
          placeholder="Escribe un comentario"
        ></textarea>
        {errores.comentario && <p style={{ color: 'red' }}>{errores.comentario}</p>}
      </div>
      <button type="submit">Enviar</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
    </div>
  );
}

export default Formulario;
