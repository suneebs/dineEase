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
          "description": "Juicy, marinated chicken wrapped in pita bread with fresh veggies and creamy garlic sauce."
        },
        {
          "name": "Baked Chicken Meatballs",
          "isVeg": false,
          "price": 410,
          "description": "Savory chicken meatballs baked to perfection, served with a flavorful sauce."
        },
        {
          "name": "Masala Rub Chicken Wings",
          "isVeg": false,
          "price": 320,
          "description": "Crispy chicken wings marinated in a fragrant masala rub, served with a spicy dipping sauce."
        },
        {
          "name": "Barbecue Sauce Chicken Wings",
          "isVeg": false,
          "price": 350,
          "description": "Tender chicken wings glazed with smoky barbecue sauce, perfect for any occasion."
        },
        {
          "name": "Beiruti Hummus",
          "isVeg": true,
          "price": 320,
          "description": "Creamy chickpea dip blended with tahini, garlic, and lemon, served with pita bread."
        },
        {
          "name": "Falafel Shawarma",
          "isVeg": true,
          "price": 240,
          "description": "Crispy falafel balls wrapped in pita with fresh vegetables and tahini sauce."
        },
        {
          "name": "Butter Garlic Mushrooms",
          "isVeg": true,
          "price": 320,
          "description": "Sautéed mushrooms in a rich butter and garlic sauce, garnished with fresh herbs."
        },
        {
          "name": "Sizzling Bloom Bread",
          "isVeg": true,
          "price": 320,
          "description": "A delightful bread dish baked until golden, served with a sizzling garlic butter sauce."
        },
        {
          "name": "Patatas Bravas",
          "isVeg": true,
          "price": 230,
          "description": "Crispy potatoes served with a spicy tomato sauce and aioli."
        },
        {
          "name": "Home Style Cheese Chilli Toast",
          "isVeg": true,
          "price": 320,
          "description": "Toasted bread topped with melted cheese and spicy chili flakes for a flavorful snack."
        },
        {
          "name": "Mint Lemonade",
          "isVeg": true,
          "price": 190,
          "description": "A refreshing drink made with fresh mint leaves and zesty lemon."
        },
        {
          "name": "Country Lemonade",
          "isVeg": true,
          "price": 190,
          "description": "Classic homemade lemonade with a hint of mint and a touch of sweetness."
        },
        {
          "name": "Frozen Lemonade",
          "isVeg": true,
          "price": 190,
          "description": "A refreshing slushy drink made with lemonade and ice, perfect for hot days."
        },
        {
          "name": "Peach Iced Tea",
          "isVeg": true,
          "price": 190,
          "description": "Chilled iced tea infused with sweet peach flavor, perfect for a hot day."
        },
        {
          "name": "Lemon Iced Tea",
          "isVeg": true,
          "price": 180,
          "description": "Refreshing iced tea with a splash of lemon for a tangy twist."
        },
        {
          "name": "Lemon Grass & Mint Iced Tea",
          "isVeg": true,
          "price": 210,
          "description": "Chilled iced tea infused with lemongrass and mint for a refreshing flavor."
        },
        {
          "name": "Special Pizza",
          "isVeg": true,
          "price": 470,
          "description": "A delicious pizza topped with a medley of fresh vegetables and cheese."
        },
        {
          "name": "Margherita Pizza",
          "isVeg": true,
          "price": 350,
          "description": "Classic pizza topped with fresh tomatoes, mozzarella cheese, and basil."
        },
        {
          "name": "Funghi Pizza",
          "isVeg": true,
          "price": 560,
          "description": "Mushroom lovers’ delight with a generous amount of sautéed mushrooms and cheese."
        },
        {
          "name": "Bbq Cottage Cheese Pizza",
          "isVeg": true,
          "price": 540,
          "description": "Pizza topped with tangy BBQ sauce, cottage cheese, and fresh vegetables."
        },
        {
          "name": "Corn & Jalapeno Pizza",
          "isVeg": true,
          "price": 450,
          "description": "Spicy pizza featuring sweet corn and jalapeños for a kick."
        },
        {
          "name": "Four Cheese Pizza",
          "isVeg": true,
          "price": 560,
          "description": "A rich and cheesy pizza made with four different types of cheese."
        },
        {
          "name": "Fiama Pizza",
          "isVeg": true,
          "price": 390,
          "description": "A delightful pizza topped with a mix of fiery spices and cheese."
        },
        {
          "name": "Bbq Chicken Pizza",
          "isVeg": false,
          "price": 600,
          "description": "Delicious BBQ chicken pizza topped with red onions and cilantro."
        },
        {
          "name": "Pepperoni Pizza",
          "isVeg": false,
          "price": 700,
          "description": "Classic pepperoni pizza with a crispy crust and rich tomato sauce."
        },
        {
          "name": "The Pizza From Punjab",
          "isVeg": false,
          "price": 550,
          "description": "A fusion pizza topped with Punjabi spices and ingredients."
        },
        {
          "name": "The Veggie One",
          "isVeg": true,
          "price": 350,
          "description": "A hearty vegetarian pizza loaded with seasonal vegetables."
        },
        {
          "name": "Sloppy Bbq Cottage Cheese Burger",
          "isVeg": true,
          "price": 360,
          "description": "Juicy cottage cheese burger smothered in BBQ sauce and topped with fresh veggies."
        },
        {
          "name": "Mexican Burger",
          "isVeg": true,
          "price": 480,
          "description": "Spicy burger made with a zesty blend of Mexican flavors and toppings."
        },
        {
          "name": "Crunchy Cracker Cottage Cheese Burger",
          "isVeg": true,
          "price": 380,
          "description": "A crunchy cottage cheese burger with crispy cracker bits for added texture."
        },
        {
          "name": "Sloppy Joe Chicken Burger",
          "isVeg": false,
          "price": 400,
          "description": "A hearty chicken burger topped with a tangy sauce and served with fries."
        },
        {
          "name": "All American Burger",
          "isVeg": false,
          "price": 520,
          "description": "Classic American burger served with cheese, lettuce, and tomato."
        },
        {
          "name": "Fire Cracker Chicken Burger",
          "isVeg": false,
          "price": 410,
          "description": "Spicy chicken burger with jalapeños and fiery sauce for a kick."
        },
        {
          "name": "Bombay Grill Sandwich",
          "isVeg": true,
          "price": 320,
          "description": "A spicy grilled sandwich filled with fresh vegetables and herbs."
        },
        {
          "name": "Buffalo Chicken Sandwich",
          "isVeg": false,
          "price": 390,
          "description": "Spicy buffalo chicken sandwich served with crispy lettuce and sauce."
        },
        {
          "name": "Crusty Mac N Cheese",
          "isVeg": true,
          "price": 425,
          "description": "Creamy macaroni baked with a crusty cheese topping, a comforting classic."
        },
        {
          "name": "Spaghetti Agli O Olio",
          "isVeg": true,
          "price": 400,
          "description": "Classic Italian pasta sautéed in garlic and olive oil, garnished with parsley."
        },
        {
          "name": "Pesto Basilico",
          "isVeg": true,
          "price": 390,
          "description": "Pasta tossed in a fragrant basil pesto sauce for a fresh flavor."
        },
        {
          "name": "Penne Arabiata",
          "isVeg": true,
          "price": 360,
          "description": "Penne pasta served in a spicy tomato sauce, perfect for heat lovers."
        },
        {
          "name": "Vegetable Lasagna",
          "isVeg": true,
          "price": 420,
          "description": "Layers of pasta with seasonal vegetables and a creamy sauce, baked to perfection."
        },
        {
          "name": "Sundried Tomato Risotto",
          "isVeg": true,
          "price": 410,
          "description": "Creamy risotto cooked with sundried tomatoes and fresh herbs."
        },
        {
          "name": "Four Cheese Rigatoni",
          "isVeg": true,
          "price": 460,
          "description": "Rigatoni pasta enveloped in a rich sauce made with four different cheeses."
        },
        {
          "name": "Wild Mushroom Risotto",
          "isVeg": true,
          "price": 410,
          "description": "Creamy risotto with a mix of wild mushrooms and herbs for a rich flavor."
        },
        {
          "name": "Home Style Grilled Chicken",
          "isVeg": false,
          "price": 490,
          "description": "Grilled chicken breast marinated with spices and served with sides."
        },
        {
          "name": "Shepherd's Pie",
          "isVeg": false,
          "price": 750,
          "description": "Hearty meat pie topped with mashed potatoes and baked until golden."
        },
        {
          "name": "Roast Chicken",
          "isVeg": false,
          "price": 560,
          "description": "Succulent roast chicken seasoned with herbs, served with roasted vegetables."
        },
        {
          "name": "Spaghetti Meat Balls",
          "isVeg": false,
          "price": 410,
          "description": "Classic spaghetti served with meatballs in rich tomato sauce."
        },
        {
          "name": "Rajma Chawal",
          "isVeg": true,
          "price": 280,
          "description": "Comforting North Indian dish of kidney beans served with rice."
        },
        {
          "name": "Bibiji Ji Ki Achari Kichidi",
          "isVeg": true,
          "price": 210,
          "description": "Traditional rice and lentil dish flavored with pickling spices."
        },
        {
          "name": "Keema Pav",
          "isVeg": false,
          "price": 590,
          "description": "Spicy minced meat served with soft bread rolls."
        },
        {
          "name": "Butter Chicken",
          "isVeg": false,
          "price": 450,
          "description": "Creamy and rich chicken curry served with naan or rice."
        },
        {
          "name": "Green Thai Curry",
          "isVeg": true,
          "price": 420,
          "description": "A fragrant curry made with green curry paste and fresh vegetables."
        },
        {
          "name": "Cappuccino",
          "isVeg": true,
          "price": 180,
          "description": "Rich espresso topped with steamed milk and a sprinkle of cocoa."
        },
        {
          "name": "Latte",
          "isVeg": true,
          "price": 170,
          "description": "Smooth espresso mixed with steamed milk for a creamy texture."
        },
        {
          "name": "Americano",
          "isVeg": true,
          "price": 150,
          "description": "Simple and strong coffee made by diluting espresso with hot water."
        },
        {
          "name": "Signature Hot Chocolate",
          "isVeg": true,
          "price": 280,
          "description": "Rich hot chocolate made with premium cocoa and topped with whipped cream."
        },
        {
          "name": "Hazelnut Hot Chocolate",
          "isVeg": true,
          "price": 300,
          "description": "Delicious hot chocolate infused with hazelnut flavor for a nutty twist."
        },
        {
          "name": "Extra Pita Bread",
          "isVeg": true,
          "price": 40,
          "description": "Freshly baked pita bread, perfect for dipping or wrapping."
        },
        {
          "name": "Extra Pav (1 Pav)",
          "isVeg": true,
          "price": 35,
          "description": "Soft Indian bread roll, great as an accompaniment."
        },
        {
          "name": "Extra Paratha (1 Piece)",
          "isVeg": true,
          "price": 60,
          "description": "Layered flatbread, crispy and flaky, perfect for pairing with curries."
        },
        {
          "name": "Nutrition Powerhouse Salad",
          "isVeg": true,
          "price": 400,
          "description": "A healthy salad loaded with a variety of fresh vegetables and proteins."
        },
        {
          "name": "Roasted Balsamic Beet & Orange Salad",
          "isVeg": true,
          "price": 340,
          "description": "A vibrant salad with roasted beets, oranges, and balsamic dressing."
        },
        {
          "name": "Greek Salad",
          "isVeg": true,
          "price": 340,
          "description": "Fresh salad with cucumbers, tomatoes, olives, and feta cheese."
        },
        {
          "name": "Chicken Caesar Salad",
          "isVeg": false,
          "price": 430,
          "description": "Classic Caesar salad topped with grilled chicken and croutons."
        },
        {
          "name": "Hot Skillet Cherry Apple Pie",
          "isVeg": true,
          "price": 410,
          "description": "Warm cherry apple pie served in a skillet with a scoop of ice cream."
        },
        {
          "name": "Biscuit Cake",
          "isVeg": true,
          "price": 310,
          "description": "Soft and moist biscuit cake layered with cream and fruit."
        },
        {
          "name": "Salted Caramel Cheese Cake",
          "isVeg": false,
          "price": 280,
          "description": "Creamy cheesecake topped with a rich salted caramel sauce."
        },
        {
          "name": "Gooey Chocolate Decadence",
          "isVeg": false,
          "price": 280,
          "description": "Rich chocolate cake that is ooey-gooey and utterly indulgent."
        },
        {
          "name": "Mud Cake",
          "isVeg": false,
          "price": 260,
          "description": "Dense and rich chocolate mud cake, perfect for chocolate lovers."
        },
        {
          "name": "Garlic Bread",
          "isVeg": true,
          "price": 190,
          "description": "Toasted bread with garlic butter and herbs, a classic side."
        },
        {
          "name": "Masala Fries",
          "isVeg": true,
          "price": 220,
          "description": "Crispy fries tossed in a blend of spices for an extra kick."
        }
      ]

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
