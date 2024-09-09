import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { SearchIcon } from "@/assets/icons"
import { CarouselSpacing } from "./Carousel"


const Search = () =>{
    return(
        <div className="p-10 flex justify-center">
            <section className="w-full flex justify-center ">
            <div className="w-full">
                <Input className="placeholder:text-center" type="text" placeholder="Search your favourite dish" />
            </div>
            <div className="pl-2">
                <Button className="bg-white">
                    <img src={SearchIcon} width={20} height={20} alt="search" srcset="" />
                </Button >
            </div>
            </section>
            <section className=" mt-20 absolute w-full">
                <div className="">
                    <CarouselSpacing />
                </div>
            </section>
            <section className="flex justify-center absolute w-full mt-10 ">
                <h1>MENU OPTIONS</h1>
            </section>
        </div>
        
    )
}

export default Search