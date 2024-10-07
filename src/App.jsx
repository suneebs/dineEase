import Search from "./components/CarouselandSearch";
import VaulDrawer from "./components/Drawer";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import MenuItems from "./components/MenuItems";
import Nav from "./components/Nav";
import { Button } from "./components/ui/button";
import menu from "@/assets/menu.png";
import { DrawerProvider } from './components/DrawerContext';

const App = () =>{
  return(
    <main className="relative">
      <DrawerProvider>

      <Nav />
      <VaulDrawer />
      </DrawerProvider>
      <section className="flex justify-center pt-20">
      <Layout />
      </section>
      <section className="padding">
        <Search />
      </section>
      <section className="padding mt-20">
      <DrawerProvider>
        <VaulDrawer />
        <MenuItems />
      </DrawerProvider>
      </section>
      <section className="bg-black flex justify-center">
        <Footer />
      </section>
    </main>
  )
};
export default App;
