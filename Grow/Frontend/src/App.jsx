import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes/Routes'

import { Link } from 'react-router-dom'; // Importa Link

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
      
      {/* Usando Link para navegar a la página de perfil */}
      <Link to="/perfil">
        <button type="button" className="btn btn-success"> Botón de Usuario Perfil </button>
      </Link>
      
      
    </>
  )
}

export default App
