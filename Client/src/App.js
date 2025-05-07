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
import WishList from './components/layout/wishlist';
import Orders from './components/layout/orders';
import Membership from './components/layout/membership';
import Recommendations from './components/layout/recommendation';
import ProductCategory from './components/layout/Productcategory'

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

          <Route path="/housecare" element={<HouseCare />} />
          <Route path="/haircare" element={<HairCare />} />
          <Route path="/misscilenaous" element={<Miscellaneous />} />
          <Route path="/Personal Care" element={<PersonalCare />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/buynow" element={<BuyNowModal/>} />
          <Route path="/confirmorder" element={<ConfirmOrderPage />} />
          <Route path="/addressform" element={<AddressForm />} />
          <Route path="/addAddress" element={<AddAddress />} />
          <Route path="/addmobile" element={<AddMobile />} />
          <Route path="/otpinput" element={<OtpInput />} />
          <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/:category" element={<ProductCategory />} />
        {/* <Route path="/category/:categoryName" element={<ProductCategory />} /> */}
        {/* <Route path="/:categoryName" element={<ProductCategory />} /> */}
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
