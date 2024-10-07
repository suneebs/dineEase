import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import logo from "@/assets/logo.jpg";
import { Button } from './ui/button';
import { Rat } from 'lucide-react';
import { useDrawer } from './DrawerContext';
const MenuItems = () => {
    const { addItemToCart, openDrawer } = useDrawer(); // Get addItemToCart and openDrawer from context

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

    const handleAddToCart = (item) => {
        addItemToCart(item);
        openDrawer();
    };

    return(
        <div className="bg-slate-100 grid grid-cols-2 gap-8 pt-10 p-9 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {
                food.map(f => (
                    <Card key={f.id}>
                        <CardHeader>
                            <img src={logo} alt="logo" />
                        </CardHeader>
                        <CardContent>
                            {/* <img src={logo}  alt="logo" /> */}
                            <CardTitle>
                                    {f.title}
                                </CardTitle>
                                <CardDescription>
                                    <b>₹ {f.rate}</b>
                                </CardDescription>
                        </CardContent>
                        <CardFooter className='flex justify-end'>
                            <Button className='bg-green-400' onClick={() => handleAddToCart(f)}>ADD</Button>
                        </CardFooter>
                    </Card>
                ))
                
            }
        </div>
    )
}

export default MenuItems;