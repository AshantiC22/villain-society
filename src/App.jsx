import { BrowserRouter, Router } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Router>
        <route path="/" element={<Home />} />
        <route path="/about" element={<About />} />
        <route path="/collections" element={<Collections />} />
        <route path="/contact" element={<Contact />} />
      </Router>
    </BrowserRouter>
  );
}

export default App;
