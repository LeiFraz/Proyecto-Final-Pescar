import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import CompanyUserProfile from './pages/CompanyUserProfile/CompanyUserProfile.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <Router> {/* guardar aca las Rutas de las paginas para direccionar*/}
      <Routes>
        <Route path="/" element={<App />} /> {/* Ruta principal INDEX */}
        <Route path="/perfil" element={<CompanyUserProfile />} /> {/* Ruta PERFIL USUARIO*/}
      </Routes>
    </Router>
  </React.StrictMode>,
)
