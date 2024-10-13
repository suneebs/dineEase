// src/components/UploadMenu.js
import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase'; // Adjust the path to your firebase.js file

const UploadMenu = () => {
  const foodItems = [
    {
      "name": "Chicken Shawarma",
      "isVeg": false,
      "price": 310,
      "description": "Juicy, marinated chicken wrapped in pita bread with fresh veggies and creamy garlic sauce.",
      "category": "Starters"
    },
    {
      "name": "Baked Chicken Meatballs",
      "isVeg": false,
      "price": 410,
      "description": "Savory chicken meatballs baked to perfection, served with a flavorful sauce.",
      "category": "Starters"
    },
    {
      "name": "Masala Rub Chicken Wings",
      "isVeg": false,
      "price": 320,
      "description": "Crispy chicken wings marinated in a fragrant masala rub, served with a spicy dipping sauce.",
      "category": "Starters"
    },
    {
      "name": "Barbecue Sauce Chicken Wings",
      "isVeg": false,
      "price": 350,
      "description": "Tender chicken wings glazed with smoky barbecue sauce, perfect for any occasion.",
      "category": "Starters"
    },
    {
      "name": "Beiruti Hummus",
      "isVeg": true,
      "price": 320,
      "description": "Creamy chickpea dip blended with tahini, garlic, and lemon, served with pita bread.",
      "category": "Starters"
    },
    {
      "name": "Falafel Shawarma",
      "isVeg": true,
      "price": 240,
      "description": "Crispy falafel balls wrapped in pita with fresh vegetables and tahini sauce.",
      "category": "Starters"
    },
    {
      "name": "Butter Garlic Mushrooms",
      "isVeg": true,
      "price": 320,
      "description": "Sautéed mushrooms in a rich butter and garlic sauce, garnished with fresh herbs.",
      "category": "Starters"
    },
    {
      "name": "Sizzling Bloom Bread",
      "isVeg": true,
      "price": 320,
      "description": "A delightful bread dish baked until golden, served with a sizzling garlic butter sauce.",
      "category": "Starters"
    },
    {
      "name": "Patatas Bravas",
      "isVeg": true,
      "price": 230,
      "description": "Crispy potatoes served with a spicy tomato sauce and aioli.",
      "category": "Starters"
    },
    {
      "name": "Home Style Cheese Chilli Toast",
      "isVeg": true,
      "price": 320,
      "description": "Toasted bread topped with melted cheese and spicy chili flakes for a flavorful snack.",
      "category": "Starters"
    },
    {
      "name": "Mint Lemonade",
      "isVeg": true,
      "price": 190,
      "description": "A refreshing drink made with fresh mint leaves and zesty lemon.",
      "category": "Juices"
    },
    {
      "name": "Country Lemonade",
      "isVeg": true,
      "price": 190,
      "description": "Classic homemade lemonade with a hint of mint and a touch of sweetness.",
      "category": "Juices"
    },
    {
      "name": "Frozen Lemonade",
      "isVeg": true,
      "price": 190,
      "description": "A refreshing slushy drink made with lemonade and ice, perfect for hot days.",
      "category": "Juices"
    },
    {
      "name": "Peach Iced Tea",
      "isVeg": true,
      "price": 190,
      "description": "Chilled iced tea infused with sweet peach flavor, perfect for a hot day.",
      "category": "Beverages"
    },
    {
      "name": "Lemon Iced Tea",
      "isVeg": true,
      "price": 180,
      "description": "Refreshing iced tea with a splash of lemon for a tangy twist.",
      "category": "Beverages"
    },
    {
      "name": "Lemon Grass & Mint Iced Tea",
      "isVeg": true,
      "price": 210,
      "description": "Chilled iced tea infused with lemongrass and mint for a refreshing flavor.",
      "category": "Beverages"
    },
    {
      "name": "Special Pizza",
      "isVeg": true,
      "price": 470,
      "description": "A delicious pizza topped with a medley of fresh vegetables and cheese.",
      "category": "Main"
    },
    {
      "name": "Margherita Pizza",
      "isVeg": true,
      "price": 350,
      "description": "Classic pizza topped with fresh tomatoes, mozzarella cheese, and basil.",
      "category": "Main"
    },
    {
      "name": "Funghi Pizza",
      "isVeg": true,
      "price": 560,
      "description": "Mushroom lovers’ delight with a generous amount of sautéed mushrooms and cheese.",
      "category": "Main"
    },
    {
      "name": "Bbq Cottage Cheese Pizza",
      "isVeg": true,
      "price": 540,
      "description": "Pizza topped with tangy BBQ sauce, cottage cheese, and fresh vegetables.",
      "category": "Main"
    },
    {
      "name": "Corn & Jalapeno Pizza",
      "isVeg": true,
      "price": 450,
      "description": "Spicy pizza featuring sweet corn and jalapeños for a kick.",
      "category": "Main"
    },
    {
      "name": "Four Cheese Pizza",
      "isVeg": true,
      "price": 560,
      "description": "A rich and cheesy pizza made with four different types of cheese.",
      "category": "Main"
    },
    {
      "name": "Fiama Pizza",
      "isVeg": true,
      "price": 390,
      "description": "A delightful pizza topped with a mix of fiery spices and cheese.",
      "category": "Main"
    },
    {
      "name": "Bbq Chicken Pizza",
      "isVeg": false,
      "price": 600,
      "description": "Delicious BBQ chicken pizza topped with red onions and cilantro.",
      "category": "Main"
    },
    {
      "name": "Pepperoni Pizza",
      "isVeg": false,
      "price": 700,
      "description": "Classic pepperoni pizza with a crispy crust and rich tomato sauce.",
      "category": "Main"
    },
    {
      "name": "The Pizza From Punjab",
      "isVeg": false,
      "price": 550,
      "description": "A fusion pizza topped with Punjabi spices and ingredients.",
      "category": "Main"
    },
    {
      "name": "The Veggie One",
      "isVeg": true,
      "price": 350,
      "description": "A hearty vegetarian pizza loaded with seasonal vegetables.",
      "category": "Main"
    },
    {
      "name": "Sloppy Bbq Cottage Cheese Burger",
      "isVeg": true,
      "price": 360,
      "description": "Juicy cottage cheese burger smothered in BBQ sauce and topped with fresh veggies.",
      "category": "Burgers"
    },
    {
      "name": "Mexican Burger",
      "isVeg": true,
      "price": 480,
      "description": "Spicy burger made with a zesty blend of Mexican flavors and toppings.",
      "category": "Burgers"
    },
    {
      "name": "Crunchy Cracker Cottage Cheese Burger",
      "isVeg": true,
      "price": 380,
      "description": "A crunchy cottage cheese burger with crispy cracker bits for added texture.",
      "category": "Burgers"
    },
    {
      "name": "Sloppy Joe Chicken Burger",
      "isVeg": false,
      "price": 400,
      "description": "A hearty chicken burger topped with a tangy sauce and served with fries.",
      "category": "Burgers"
    },
    {
      "name": "All American Burger",
      "isVeg": false,
      "price": 520,
      "description": "Classic American burger served with cheese, lettuce, and tomato.",
      "category": "Burgers"
    },
    {
      "name": "Fire Cracker Chicken Burger",
      "isVeg": false,
      "price": 410,
      "description": "Spicy chicken burger with jalapeños and fiery sauce for a kick.",
      "category": "Burgers"
    },
    {
      "name": "Bombay Grill Sandwich",
      "isVeg": true,
      "price": 320,
      "description": "A spicy grilled sandwich filled with fresh vegetables and herbs.",
      "category": "Sandwiches"
    },
    {
      "name": "Buffalo Chicken Sandwich",
      "isVeg": false,
      "price": 390,
      "description": "Spicy buffalo chicken sandwich served with crispy lettuce and sauce.",
      "category": "Sandwiches"
    },
    {
      "name": "Crusty Mac N Cheese",
      "isVeg": true,
      "price": 425,
      "description": "Creamy macaroni baked with cheese until golden and bubbly.",
      "category": "Main"
    },
    {
      "name": "Indian Style Pasta",
      "isVeg": true,
      "price": 480,
      "description": "Pasta cooked with Indian spices and vegetables for a flavorful twist.",
      "category": "Main"
    },
    {
      "name": "Gnocchi in Creamy Sauce",
      "isVeg": true,
      "price": 560,
      "description": "Delicious gnocchi in a rich and creamy sauce, garnished with fresh herbs.",
      "category": "Main"
    },
    {
      "name": "Loaded Nachos",
      "isVeg": true,
      "price": 420,
      "description": "Crispy nachos topped with cheese, jalapeños, and fresh salsa.",
      "category": "Starters"
    },
    {
      "name": "Steamed Rice",
      "isVeg": true,
      "price": 150,
      "description": "Fluffy steamed rice, a perfect accompaniment to any dish.",
      "category": "Sides"
    },
    {
      "name": "Fried Rice",
      "isVeg": true,
      "price": 250,
      "description": "Delicious fried rice stir-fried with vegetables and spices.",
      "category": "Sides"
    },
    {
      "name": "Cheesy Garlic Bread",
      "isVeg": true,
      "price": 250,
      "description": "Bread topped with melted cheese and garlic, baked until golden.",
      "category": "Sides"
    },
    {
      "name": "French Fries",
      "isVeg": true,
      "price": 210,
      "description": "Crispy golden fries, served with ketchup.",
      "category": "Sides"
    },
    {
      "name": "Wedges",
      "isVeg": true,
      "price": 230,
      "description": "Crispy potato wedges served with a tangy dip.",
      "category": "Sides"
    },
    {
      "name": "Mixed Veggies",
      "isVeg": true,
      "price": 230,
      "description": "A healthy mix of seasonal vegetables, steamed to perfection.",
      "category": "Sides"
    },
    {
      "name": "Cheesy Veggie Sandwich",
      "isVeg": true,
      "price": 300,
      "description": "A delicious sandwich filled with cheese and seasonal veggies.",
      "category": "Sandwiches"
    },
    {
      "name": "Grilled Chicken Sandwich",
      "isVeg": false,
      "price": 400,
      "description": "Grilled chicken sandwich served with lettuce and mayo.",
      "category": "Sandwiches"
    },
    {
      "name": "Grilled Cheese Sandwich",
      "isVeg": true,
      "price": 290,
      "description": "Classic grilled cheese sandwich served with a side of soup.",
      "category": "Sandwiches"
    },
    {
      "name": "Veggie Quesadilla",
      "isVeg": true,
      "price": 380,
      "description": "A tortilla filled with cheese and veggies, grilled to perfection.",
      "category": "Main"
    },
    {
      "name": "Chicken Quesadilla",
      "isVeg": false,
      "price": 460,
      "description": "A tortilla filled with grilled chicken and cheese, served with salsa.",
      "category": "Main"
    }
  ];
  

    const uploadMenuToFirestore = async () => {
        const menuCollection = collection(db, 'menu'); // 'menu' is the Firestore collection name
        try {
            for (const item of foodItems) {
                await addDoc(menuCollection, item);
            }
            console.log('Menu items successfully uploaded to Firestore!');
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div>
            <button 
                onClick={uploadMenuToFirestore} 
                className="bg-blue-500 text-white p-3 rounded"
            >
                Upload Menu to Firestore
            </button>
        </div>
    );
};

export default UploadMenu;
