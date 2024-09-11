import { Button } from "./ui/button";
import title from "@/assets/title-bg.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Nav = () => {
    return(
        <header className='padding-x py-5 absolute z-10 w-full bg-slate-200'>
      <nav className='flex justify-center items-center max-container font-serif '>
        DineEase
      </nav>
    </header>
    )
}

export default Nav;