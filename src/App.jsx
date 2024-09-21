import Search from "./components/CarouselandSearch";
import Footer from "./components/Footer";
import Layout from "./components/Layout";
import MenuItems from "./components/MenuItems";
import Nav from "./components/Nav";
import { Button } from "./components/ui/button";
import menu from "@/assets/menu.png";
import { CartProvider } from './components/cartToggle';

const App = () =>{
  return(
    <main className="relative">
      <CartProvider>

      <Nav />
      <section className="flex justify-center pt-20">
      <Layout />
      </section>
      </CartProvider>
      <section className="bg-black flex justify-center">
        <Footer />
      </section>
    </main>
  )
};
export default App;
