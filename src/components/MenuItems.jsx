import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import logo from "@/assets/logo.jpg";
import { Button } from './ui/button';
import { useCart } from './cartToggle';

const MenuItems = () => {

    const { addToCart } = useCart(); // Get the addToCart function

    const food = [
        {
            id:1,
            title:'Chicken Biriyani',
            time:23,
            description:"This is one",
            rate:100,
        },
        {
            id:2,
            title:'Mutton Biriyani',
            time:23,
            description:"This is one",
            rate:180,
        },
        {
            id:3,
            title:'Beef Biriyani',
            time:23,
            description:"This is one",
            rate:140,
        },
        {
            id:4,
            title:'Chicken Noodles',
            time:23,
            description:"This is one",
            rate:80
        },
        {
            id:5,
            title:'Chicken Fried Rice',
            time:23,
            description:"This is one",
            rate:90,
        },
        {
            id:6,
            title:'Mandi',
            time:23,
            description:"This is one",
            rate:210
        },
        {
            id:7,
            title:'Shawarma',
            time:23,
            description:"This is one",
            rate:120
        },
        {
            id:8,
            title:'Dragon Chicken',
            time:23,
            description:"This is one",
            rate:150
        }
    ]

    const handleAddToCart = (item) => {
        addToCart(item); // Call the function to add item to the cart
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