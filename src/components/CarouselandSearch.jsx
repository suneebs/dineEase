import { Input } from "@/components/ui/input";
import { CarouselSpacing } from "./Carousel";

const Search = ({ setSearchTerm }) => {
    return (
        <div className="p-10 flex justify-center">
            <section className="w-full flex justify-center ">
                <div className="w-full">
                    <Input
                        className="placeholder:text-center"
                        type="text"
                        placeholder="Search your favourite dish"
                        onChange={(e) => setSearchTerm(e.target.value)} // Call the callback here
                    />
                </div>
                {/* <div className="pl-2">
                    <Button className="bg-white">
                        <img src={SearchIcon} width={20} height={20} alt="search" />
                    </Button>
                </div> */}
            </section>
            <section className=" mt-20 absolute w-full">
                <div className="">
                    <CarouselSpacing />
                </div>
            </section>
        </div>
    );
};

export default Search;
