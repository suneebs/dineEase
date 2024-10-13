import React, { useState } from 'react';
import Search from './CarouselandSearch';
import MenuItems from './MenuItems';


const MenuContainer = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div>
            <section className=''>
            <Search setSearchTerm={setSearchTerm} />
            </section>
            <section className='mt-20'>
            <MenuItems searchTerm={searchTerm} />
            </section>
        </div>
    );
};

export default MenuContainer;
