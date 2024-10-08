import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import logo from "@/assets/logo.jpg";
import { Button } from './ui/button';
import { useDrawer } from './DrawerContext';
import { useState } from 'react';

const MenuItems = () => {
    const { addItemToCart, removeItemFromCart, openDrawer } = useDrawer();
    
    const food = [
        { id: 1, title: 'Chicken Biriyani', rate: 100 },
        { id: 2, title: 'Chilly chicken', rate: 80 },
        { id: 3, title: 'Fried rice', rate: 140 },
        { id: 4, title: 'Dragon Chicken', rate: 230 },
        { id: 5, title: 'Pepper Chicken', rate: 200 },
        { id: 6, title: 'Meals', rate: 100 },
        { id: 7, title: 'Porotta', rate: 10 },
        { id: 8, title: 'Mandi', rate: 320 }
    ];

    const [addedItems, setAddedItems] = useState(new Set());

    const handleToggleCartItem = (item) => {
        if (addedItems.has(item.id)) {
            // If the item is already in the cart, remove it
            removeItemFromCart(item.id);
            setAddedItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(item.id);
                return newSet;
            });
        } else {
            // If the item is not in the cart, add it
            addItemToCart(item);
            setAddedItems(prev => new Set(prev).add(item.id));
        }
    };

    return (
        <div className="bg-slate-100 grid grid-cols-2 gap-8 pt-10 p-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {
                food.map(f => (
                    <Card key={f.id}>
                        <CardHeader>
                            <img src={logo} alt="logo" />
                        </CardHeader>
                        <CardContent>
                            <CardTitle>
                                {f.title}
                            </CardTitle>
                            <CardDescription>
                                <b>₹ {f.rate}</b>
                            </CardDescription>
                        </CardContent>
                        <CardFooter className='flex justify-end'>
                            <Button 
                                
                                onClick={() => {
                                    handleToggleCartItem(f);
                                }
                            }
                            className='bg-green-400'
                            >
                                {addedItems.has(f.id) ? 'ADDED' : 'ADD'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))
            }
        </div>
    );
}

export default MenuItems;
