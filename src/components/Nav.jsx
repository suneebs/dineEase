import React, { useState } from 'react';
import { Button } from "./ui/button";
import title from "@/assets/title-bg.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import icon from "@/assets/icons/dish.png";
import bill from "@/assets/icons/bill-icon.png";
import { useDrawer } from './DrawerContext';
import IconBill from './IconBill';

const Nav = () => {
  const { openDrawer, itemCount } = useDrawer();
  const [isIconBillOpen, setIconBillOpen] = useState(false);

  const openIconBill = () => setIconBillOpen(true);
  const closeIconBill = () => setIconBillOpen(false);

  return (
    <nav className='flex padding-x py-5 fixed z-10 w-full bg-slate-200 justify-between items-center max-container font-serif mb-5'>
      <div className='font-extrabold ml-10'>
         DineEase
      </div>
      <div className="flex mr-10">
        <div className="mr-14 rounded-full flex justify-center items-center relative w-10 h-10 bg-gray-100">
          <img src={icon} className="w-10 cursor-pointer" alt="dish" onClick={openDrawer}/>
          <span className="absolute top-2/3 right-1/2 text-white text-sm bg-red-500 w-5 h-5 rounded-full flex justify-center items-center">
            {itemCount}
          </span>
        </div>
        <div onClick={openIconBill} className="cursor-pointer ">
          <img src={bill} alt="bill" className="w-10" />
        </div>
      </div>
      <IconBill isOpen={isIconBillOpen} onClose={closeIconBill} />
    </nav>
  );
};

export default Nav;
