import React, { useState } from 'react';
import menu from "@/assets/menu.png";
import Search from "./CarouselandSearch";
import MenuItems from "./MenuItems";
import { useCart } from './cartToggle';
// import DrawerDemo  from './Drawer';
const Layout = () => {

    const { isCartVisible, toggleCart,cart } = useCart();

    return (
        <div className="flex">
            <main className={`w-full ${isCartVisible ? "mr-60 md:mr-80" : ""} max-w-full m-auto p-5 transition-all duration-300`}>
                <section className="flex justify-center">
                    <img src={menu} height={200} width={200} alt="menu" />
                </section>
                <section className="padding">
                  
                    <Search />
                </section>
                <section className="padding mt-20">
                    <MenuItems />
                </section>
            </main>
            <section className={`fixed top-0 right-0 bg-gray-800 shadow-2xl h-full w-60 md:w-80 grid grid-rows-[60px_1fr_60px] transform ${isCartVisible ? "translate-x-0" : "translate-x-full"} transition-transform duration-300`}>
                <div className="text-white text-center">CART</div>
                {/* Add cart content here */
                cart.length === 0 ? (
                    <div className='p-10 h-8 flex justify-center pt-72'>
                        <p className='text-white font-bold font-serif'>Order list is empty</p>
                    </div>
                ) : (
                    <div className='pt-10'>
                        
                        {cart.map((item, index) => (
                            <div className='bg-white m-1 p-3 rounded-2xl font-serif' key={index}>
                                {item.title} - ₹ {item.rate} {index}
                            </div>
                        ))}
                    </div>
                )}
                {/* <div className="flex justify-center items-center text-white">Your cart is empty</div>
                <div className="text-center text-white">Checkout</div> */}
            </section>
            
        </div>
    );
}

export default Layout;
