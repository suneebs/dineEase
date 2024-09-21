import React, { useState } from 'react';
import menu from "@/assets/menu.png";
import Search from "./CarouselandSearch";
import MenuItems from "./MenuItems";
import { useCart } from './cartToggle';

const Layout = () => {

    const { isCartVisible, toggleCart } = useCart();

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
                {/* Add cart content here */}
                <div className="flex justify-center items-center text-white">Your cart is empty</div>
                <div className="text-center text-white">Checkout</div>
            </section>
        </div>
    );
}

export default Layout;
