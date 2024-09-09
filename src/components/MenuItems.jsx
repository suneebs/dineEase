import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const MenuItems = () => {
    const food = [
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
        <div className="bg-black grid grid-cols-3 gap-8 pt-10 p-9">
            {
                food.map(f => (
                    <Card key={f.id}>
                        <CardHeader>
                            <div>
                                <CardTitle>
                                    {f.title}
                                </CardTitle>
                                <CardDescription>
                                    {f.time} mins
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p>{f.description}</p>
                        </CardContent>
                        <CardFooter>
                            <button>View</button>
                        </CardFooter>
                    </Card>
                ))
                
            }
        </div>
    )
}

export default MenuItems;