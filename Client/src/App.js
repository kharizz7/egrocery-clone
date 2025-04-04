import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import HouseCare from './components/categories/Housecare'
import PersonalCare from "./components/categories/Personalcare";
import Grocery from "./components/categories/Grocery";
import Miscellaneous from "./components/categories/Misscelaneous";
import HairCare from "./components/categories/Haircare";
import Footer from "./components/layout/Footer";
import Account from "./components/user/Account";
import Profile from "./components/user/Profile";
import ProductDetails from "./components/product/ProductDetails";
import { CartProvider } from "./context/cartcontext";

// import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <CartProvider>
       <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} /> {/* Public Route */}
        <Route path="/profile" element={<Profile />} />

        {/* Protected Routes */}
         
          <Route path="/housecare" element={<HouseCare />}/>
          <Route path="/haircare" element={<HairCare />}/>
          <Route path="/misscilenaous" element={<Miscellaneous />}/>
          <Route path="/personalcare" element={<PersonalCare />}/>
          <Route path="/grocery" element={<Grocery />}/>
          
        {/* <Route path="/products/:category/:id" element={<ProductDetails />} /> */}
        <Route path="/product/:productId" element={<ProductDetails />} />

       
      </Routes>
      <Footer />
    </Router>
    </CartProvider>
   
  );
}

export default App;
