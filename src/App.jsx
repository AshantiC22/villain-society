import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collections from "./components/Collections";
import About from "./components/About";
import Contact from "./components/Contact";
import Admin from "./components/admin";
import NotFound from "./components/NotFound";
import LoadingScreen from "./components/LoadingScreen";
import ProductPage from "./components/ProductPage";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <CartProvider>
      <BrowserRouter>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
