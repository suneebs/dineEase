import Search from "./components/CarouselandSearch";
import MenuItems from "./components/MenuItems";
import Nav from "./components/Nav";
import { Button } from "./components/ui/button";
import menu from "@/assets/menu.png";

const App = () =>{
  return(
    <main className="relative">
      <Nav />
      <section className="flex justify-center pt-20">
          <img src={menu} height={200} width={200} alt="menu" srcset="" />
      </section>
      <section className="padding">
        <Search />
      </section>
      <section className="padding mt-20">
        <MenuItems />
      </section>

    </main>
  )
};
export default App;
