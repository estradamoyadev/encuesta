import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Formulario from './components/Formulario';
import Gracias from './components/Gracias'; // Asegúrate de crear este componente

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulario />} />
        <Route path="/gracias" element={<Gracias />} />
      </Routes>
    </Router>
  );
}

export default App;
