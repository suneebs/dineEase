import VaulDrawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import MenuContainer from "@/components/MenuContainer";
import Nav from "@/components/Nav";
import { DrawerProvider } from '@/components/DrawerContext';
import menu from "@/assets/menu.png";

const MenuPage = () => {
  return (
    <DrawerProvider>
      <main className="relative flex flex-col min-h-screen">
        <Nav />
        <VaulDrawer />
        
        <section className="flex justify-center pt-20">
          <img src={menu} height={200} width={200} alt="menu" />
        </section>
        
        {/* <section className="padding">
          <Search />
        </section> */}
        
        <section className="flex-grow padding">
          <MenuContainer />
        </section>
        
        <footer className="bg-black flex justify-center mt-auto w-full">
          <Footer />
        </footer>
      </main>
    </DrawerProvider>
  );
};

export default MenuPage;
