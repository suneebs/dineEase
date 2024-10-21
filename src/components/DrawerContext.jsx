
import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);
  
  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);
  console.log("selectedSeat:", selectedSeat );
  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);
      if (existingItem) {
          // Increase quantity if the item is already in the cart
          return prevItems.map((i) =>
              i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
          );
      }
      return [...prevItems, { ...item, quantity: 1 }]; // Initialize quantity
  });
    
  };

  const removeItemFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.name !== itemId));
};

const increaseQuantity = (itemId) => {
  setCartItems((prevItems) =>
      prevItems.map(item =>
          item.name === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
  );
};

const decreaseQuantity = (itemId) => {
  setCartItems((prevItems) =>
      prevItems.map(item =>
          item.name === itemId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
      )
  );
};

const clearCart = () => {
  setCartItems([]);
};
  const itemCount = cartItems.length; // Count of items in the cart

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer, cartItems, addItemToCart, itemCount,removeItemFromCart, increaseQuantity, decreaseQuantity,clearCart,selectedSeat,setSelectedSeat }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => useContext(DrawerContext);
