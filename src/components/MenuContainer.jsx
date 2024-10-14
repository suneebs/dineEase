import React, { useState } from 'react';
import Search from './CarouselandSearch';
import MenuItems from './MenuItems';
import { CarouselSpacing } from './Carousel';
import FoodTypeFilter from './FoodTypeFilter';

const MenuContainer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [selectedFoodType, setSelectedFoodType] = useState("ALL");

    return (
        <div>
            <section className=''>
            <Search setSearchTerm={setSearchTerm} />
            </section>
            <section>
            <CarouselSpacing setSelectedCategory={setSelectedCategory} />
            </section>
            <section>
            <FoodTypeFilter setSelectedFoodType={setSelectedFoodType} />
            </section>
            <section className='mt-20'>
            <MenuItems searchTerm={searchTerm} selectedCategory={selectedCategory}
            selectedFoodType={selectedFoodType} />
            </section>
        </div>
    );
};

export default MenuContainer;
