import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import { useDrawer } from "./DrawerContext";

const MenuItems = ({ searchTerm, selectedCategory, selectedFoodType }) => {
  const { addItemToCart, removeItemFromCart, cartItems } = useDrawer();
  const [food, setFood] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const querySnapshot = await getDocs(collection(db, "menu"));
      const menuData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFood(menuData);
    };
    fetchMenuItems();
  }, []);

  const handleToggleCartItem = (item) => {
    const existingItem = cartItems.find((i) => i.name === item.name);
    if (existingItem) {
      removeItemFromCart(item.name);
    } else {
      addItemToCart(item);
    }
  };

  // Filter food items based on search term, selected category, and selected food type
  const filteredFood = food.filter((item) => {
    const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    
    // Adjusted logic for Veg/Non-Veg based on the `isVeg` boolean
    const matchesFoodType =
      selectedFoodType === "ALL" ||
      (selectedFoodType === "Veg" && item.isVeg === true) ||
      (selectedFoodType === "Non-Veg" && item.isVeg === false);

    return matchesSearchTerm && matchesCategory && matchesFoodType;
  });

  return (
    <div className="bg-slate-100 grid grid-cols-2 gap-8 pt-10 p-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {filteredFood.map((f) => (
        <Card key={f.id}>
          <CardHeader>
            <img src={f.imageUrl} alt={f.name} className="w-full h-32 object-cover" />
          </CardHeader>
          <CardContent>
            <CardTitle>{f.name}</CardTitle>
            <CardDescription>{f.description}</CardDescription>
            <CardDescription>
              <b>₹ {f.price}</b>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => handleToggleCartItem(f)}
              className="bg-green-400"
            >
              {cartItems.some((item) => item.name === f.name) ? "ADDED" : "ADD"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default MenuItems;
