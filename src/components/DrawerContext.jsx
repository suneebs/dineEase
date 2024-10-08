
import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
          // Increase quantity if the item is already in the cart
          return prevItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
      }
      return [...prevItems, { ...item, quantity: 1 }]; // Initialize quantity
  });
    
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
};

const increaseQuantity = (itemId) => {
  setCartItems((prevItems) =>
      prevItems.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
  );
};

const decreaseQuantity = (itemId) => {
  setCartItems((prevItems) =>
      prevItems.map(item =>
          item.id === itemId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
      )
  );
};

  const itemCount = cartItems.length; // Count of items in the cart

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, cartItems, addItemToCart, itemCount,removeItemFromCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
