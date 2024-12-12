import React from "react";
import "./CartSidebar.css"
import { useCart } from "../../common/CartContext";
import CartItem from "../CartItem/CartItem";
import axios from "axios";

const CartSidebar = ( ) => {
    const { cart, getTotal, isCartOpen, closeCart, clearCart } = useCart();
    const formatPrice = (price) => {
        if (price > 0) {
            const isInteger = price % 1 === 0; 
            const formatter = new Intl.NumberFormat('es-AR', {
                style: 'currency',
                currency: 'ARS',
                minimumFractionDigits: isInteger ? 0 : 2,
                maximumFractionDigits: 2,
            });
            return formatter.format(price);
        } else {
            return "$ A convenir";
        }
    };
    const submitOrder = async () => {
        const userId = localStorage.getItem("userId");
        const simplifiedCart = cart.map(item => 
            { return { id_publicacion: item.id, cantidad: item.quantity, precio: item.price }; 
        });
        const precioTotal=getTotal();
        const precioTotalConDosDecimales = Number(precioTotal.toFixed(2));
        const formData = {
          id_usuario: userId,
          publicaciones: simplifiedCart,
          precio_total: precioTotalConDosDecimales
        };
        console.log(formData)
        try {
          await axios.post('http://localhost:5000/api/orden/crear', formData);
          console.log('Orden creada exitosamente.');
          clearCart();
        } catch (error) {
          console.error('Error al crear la orden:', error);
          alert('Hubo un error al crear la orden.');
        }
      };

    return (
        <>
        <div
                className={`cart-overlay ${isCartOpen ? "open" : ""}`}
                onClick={closeCart}
            ></div>
        <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
            <button className="closeBtn" onClick={closeCart}>
                <i className="icon-cancel"></i>
            </button>
            {cart.length === 0 ? (
                <div className="empty-cart-container">
                    <img className="empty-cart-img" src="src\components\CartSidebar\emptycart.png" alt="" />
                    <p className="empty-cart">El carrito está vacío</p>
                </div>
            ) : (
                <>
                    <div className="cart-items-container">
                        {cart.map((item) => (
                            <CartItem
                                key={item.id}
                                imagen={item.image}
                                nombre={item.title}
                                precioActual={item.price}
                                cantidad={item.quantity}
                                id={item.id}
                            />
                        ))}
                    </div>
                    <h3 className="cartTotalPrice">Total: {formatPrice(getTotal())}</h3>
                    <button className="clear-cart-btn" onClick={clearCart}>
                        Limpiar carrito
                    </button>
                    <button className="buy-cart-btn" onClick={submitOrder}>
                        Comprar ahora
                    </button>
                </>
            )}
        </div>
        </>
    );
};

export default CartSidebar;