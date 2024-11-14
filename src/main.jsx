import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import PruebaIndex from './pages/Publications/index.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    
    <div>
      <PruebaIndex />
    </div>
    
  </React.StrictMode>
)