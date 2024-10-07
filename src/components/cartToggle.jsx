import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [isCartVisible, setIsCartVisible] = useState(false);
    // Add to cart
    const [cart, setCart] = useState([]);
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const toggleCart = () => {
        setIsCartVisible((prev) => !prev);
    };

    return (
        <CartContext.Provider value={{ isCartVisible, toggleCart, cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
