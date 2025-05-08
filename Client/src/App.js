// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import HouseCare from "./components/categories/Housecare";
import PersonalCare from "./components/categories/Personalcare";
import Grocery from "./components/categories/Grocery";
import Miscellaneous from "./components/categories/Misscelaneous";
import HairCare from "./components/categories/Haircare";
import Footer from "./pages/Footer";
import Account from "./components/user/Account";
import Profile from "./components/user/Profile";
import ProductDetails from "./components/product/ProductDetails";
import { CartProvider } from "./context/cartcontext";
import ProtectedRoute from "./components/ProtectedRoute";
import BuyNowModal from "./components/layout/Buynow";
import ConfirmOrderPage from "./components/layout/confirmOrder";
import AddressForm from "./components/layout/AddressForm";
import AddAddress from "./components/layout/AddAddress";
import AddMobile from "./components/user/AddMobile"
import OtpInput from "./components/user/OtpInput";
import WishList from './pages/wishlist';
import Orders from './components/layout/orders';
import Membership from './pages/membership';
import Recommendations from './pages/recommendation';


function App() {
  return (
    <CartProvider>
      <div className="bg-gray-200 ">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<Account />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* category Lists */}
          <Route path="/Household" element={<HouseCare />} />
          <Route path="/Hair Care" element={<HairCare />} />
          <Route path="/Miscellaneous" element={<Miscellaneous />} />
          <Route path="/Personal Care" element={<PersonalCare />} />
          <Route path="/Grocery" element={<Grocery />} />
          {/* End */}

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/buynow" element={<BuyNowModal/>} />
          <Route path="/confirmorder" element={<ConfirmOrderPage />} />
          <Route path="/addressform" element={<AddressForm />} />
          <Route path="/addAddress" element={<AddAddress />} />
          <Route path="/addmobile" element={<AddMobile />} />
          <Route path="/otpinput" element={<OtpInput />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/recommendations" element={<Recommendations />} />
        

        </Routes>
        <Footer />
      </Router>
      </div>
    </CartProvider>
  );
}

export default App;
