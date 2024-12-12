
import { BrowserRouter } from 'react-router-dom'
import { Routes } from './routes/Routes'
import { CartProvider } from "./common/CartContext";

function App() {

  return (
    <>
    <CartProvider>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
      </CartProvider>
      
    </>
  )
}

export default App
