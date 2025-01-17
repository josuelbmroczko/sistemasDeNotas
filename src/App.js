import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css';
import PutNotasFiscais from './components/getNotas/NotasFiscais';
import PostNotaFiscal from './components/PostNotaFiscal/PostNotaFiscal';
import GerenciarNotas from './components/putDeleteNotas/GerenciarNotas';
import Home from './components/Home'; // Importa o componente Home

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> {/* Página de entrada */}
          <Route path="/novo" element={<PostNotaFiscal />} />
          <Route path="/GerenciarNotas" element={<GerenciarNotas />} />
          <Route path="/verNotas" element={<PutNotasFiscais />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
