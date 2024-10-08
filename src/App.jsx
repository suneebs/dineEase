import Search from "./components/CarouselandSearch";
import VaulDrawer from "./components/Drawer";
import Footer from "./components/Footer";
import MenuItems from "./components/MenuItems";
import Nav from "./components/Nav";
import { DrawerProvider } from './components/DrawerContext';
import menu from "@/assets/menu.png";

const App = () => {
  return (
    <DrawerProvider>
      <main className="relative">
        <Nav />
        <VaulDrawer />
        
        <section className="flex justify-center pt-20">
          <img src={menu} height={200} width={200} alt="menu" />
        </section>
        
        <section className="padding">
          <Search />
        </section>
        
        <section className="padding mt-20">
          <MenuItems />
        </section>
        
        <section className="bg-black flex justify-center">
          <Footer />
        </section>
      </main>
    </DrawerProvider>
  );
};

export default App;
