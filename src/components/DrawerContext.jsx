
import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const addItemToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const itemCount = cartItems.length; // Count of items in the cart

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, cartItems, addItemToCart, itemCount  }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
