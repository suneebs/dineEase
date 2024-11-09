import VaulDrawer from "@/components/Drawer";
import Footer from "@/components/Footer";
import MenuContainer from "@/components/MenuContainer";
import Nav from "@/components/Nav";
import { DrawerProvider } from '@/components/DrawerContext';
import menu from "@/assets/caption.png";

const MenuPage = () => {
  return (
    <DrawerProvider>
      <main className="relative flex flex-col min-h-screen">
        <Nav />
        <VaulDrawer />
        
        <section className="flex justify-center pt-28 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 ">
          <img src={menu}  alt="menu" />
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
