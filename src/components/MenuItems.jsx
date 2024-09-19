import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import logo from "@/assets/logo.jpg";
import { Button } from './ui/button';
const MenuItems = () => {
    const food = [
        {
            id:1,
            title:'Chicken Biriyani',
            time:23,
            description:"This is one",

        },
        {
            id:2,
            title:'one',
            time:23,
            description:"This is one",

        },
        {
            id:3,
            title:'one',
            time:23,
            description:"This is one",

        },
        {
            id:4,
            title:'one',
            time:23,
            description:"This is one",

        },
        {
            id:1,
            title:'one',
            time:23,
            description:"This is one",

        },
        {
            id:2,
            title:'one',
            time:23,
            description:"This is one",

        },
        {
            id:3,
            title:'one',
            time:23,
            description:"This is one",

        },
        {
            id:4,
            title:'one',
            time:23,
            description:"This is one",

        }
    ]
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
                                    <b>₹ 100</b>
                                </CardDescription>
                        </CardContent>
                        <CardFooter className='flex justify-end'>
                            <Button className='bg-green-400'>ADD</Button>
                        </CardFooter>
                    </Card>
                ))
                
            }
        </div>
    )
}

export default MenuItems;