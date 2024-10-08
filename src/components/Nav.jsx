import { Button } from "./ui/button";
import title from "@/assets/title-bg.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import icon from "@/assets/icons/dish.png";import React from 'react';
import { useDrawer } from './DrawerContext';

const Nav = () => {
  const { openDrawer, itemCount } = useDrawer();
    return(
      <nav className='flex padding-x py-5 fixed z-10 w-full bg-slate-200 justify-between items-center max-container font-serif mb-5 '>
        DineEase
        <div className="mr-14 rounded-full flex justify-center items-center relative w-10 h-10 bg-gray-100" onClick={openDrawer}>
        <img src={icon} className="w-10 cursor-pointer" alt="dish" />
        <span className="absolute top-2/3 right-1/2 text-white text-sm bg-red-500 w-5 h-5 rounded-full flex justify-center items-center">{itemCount}</span>
        </div>
      </nav>
    )
}

export default Nav;