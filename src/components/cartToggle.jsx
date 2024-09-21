import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [isCartVisible, setIsCartVisible] = useState(false);

    const toggleCart = () => {
        setIsCartVisible((prev) => !prev);
    };

    return (
        <CartContext.Provider value={{ isCartVisible, toggleCart }}>
            {children}
        </CartContext.Provider>
    );
};
