import React, { useState } from 'react';
import Search from './CarouselandSearch';
import MenuItems from './MenuItems';
import { CarouselSpacing } from './Carousel';


const MenuContainer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("ALL");

    return (
        <div>
            <section className=''>
            <Search setSearchTerm={setSearchTerm} />
            </section>
            <section>
            <CarouselSpacing setSelectedCategory={setSelectedCategory} />
            </section>
            <section className='mt-20'>
            <MenuItems searchTerm={searchTerm} selectedCategory={selectedCategory} />
            </section>
        </div>
    );
};

export default MenuContainer;
