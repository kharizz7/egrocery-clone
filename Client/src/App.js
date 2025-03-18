import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Babycare from "./components/Babycare";
import Bakery from "./components/Bakery";
import FoodGrains from "./components/Foodgrains"; 
import Beauty from "./components/Beauty";
import Snacks from "./components/Snacks";
import Beverages from "./components/Beverages";
import Gourmet from "./components/Gourmet"; 
import Household from "./components/Household";
import Footer from "./components/Footer";
import Account from "./components/Account";
import Profile from "./components/Profile"
// import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} /> {/* Public Route */}
        <Route path="/profile" element={<Profile />} />

        {/* Protected Routes */}
        
          <Route path="/babycare" element={<Babycare />} />
          <Route path="/bakery" element={<Bakery />} />
          <Route path="/foodgrains" element={<FoodGrains />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/snacks" element={<Snacks />} />
          <Route path="/beverages" element={<Beverages />} />
          <Route path="/gourmets" element={<Gourmet />} />
          <Route path="/household" element={<Household />} />
       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
