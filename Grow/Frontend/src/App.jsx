import './App.css'
import Home from './pages/home'

import { Link } from 'react-router-dom'; // Importa Link

function App() {

  return (
    <>
      <Home/>
      <div>
        <h1> GROW </h1>
      </div>
      <h1>Vite + React</h1>
      <button type="button" className='btn btn-success'> Boton de Bootstrap </button>
      
      {/* Usando Link para navegar a la página de perfil */}
      <Link to="/perfil">
        <button type="button" className="btn btn-success"> Botón de Usuario Perfil </button>
      </Link>
      
      
    </>
  )
}

export default App
