import { useState } from "react";
import { Products } from "./components/Products";
import { products as initialProducts } from "./Mocks/products.json";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { IS_DEVELOPEMENT } from "./config.js";
import { useFilters } from "./hooks/useFilters";
import { Cart } from "./components/Cart.jsx";
import { CartProvider } from "./context/cart";

function App() {

  const [products] = useState(initialProducts);


  const {filterProducts} = useFilters();


  const filteredProducts = filterProducts(products);

  

  return (
    <>
    <CartProvider>

      <Header />

      <Cart/>
      
      <Products products={filteredProducts} />
     {IS_DEVELOPEMENT &&  <Footer/>}
     </CartProvider>
    </>
  );
}

export default App;
