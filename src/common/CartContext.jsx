import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Agregar al carrito
    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + product.quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity: product.quantity }];
        });
        setIsCartOpen(true);
    };

    // Eliminar del carrito
    const removeFromCart = (productId) => {
        setCart((prevCart) =>
            prevCart.filter((item) => item.id !== productId)
        );
    };

    // Calcular el total
    const getTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    const incrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decrementQuantity = (productId) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) } // No permite cantidad menor a 1
                    : item
            )
        );
    };

    // Limpiar el carrito
    const clearCart = () => {
        setCart([]); // Vacía el carrito
    };
    const closeCart = () => setIsCartOpen(false);
    const openCart = () => setIsCartOpen(true);
    // Valores compartidos en el contexto
    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                getTotal,
                isCartOpen,
                closeCart,
                openCart,
                clearCart,
                incrementQuantity,
                decrementQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
