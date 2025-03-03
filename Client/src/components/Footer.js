import React from 'react';
import { Link } from "react-router-dom";

const socialLinks = [
  { id: 1, name: "Facebook", url: "https://www.facebook.com/", icon: "https://cdn-icons-png.flaticon.com/512/733/733547.png" },
  { id: 2, name: "Twitter", url: "https://twitter.com/", icon: "https://cdn-icons-png.flaticon.com/512/733/733579.png" },
  { id: 3, name: "Instagram", url: "https://www.instagram.com/", icon: "https://cdn-icons-png.flaticon.com/512/733/733558.png" },
  { id: 4, name: "LinkedIn", url: "https://www.linkedin.com/", icon: "https://cdn-icons-png.flaticon.com/512/733/733561.png" },
  { id: 5, name: "YouTube", url: "https://www.youtube.com/", icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-4 py-10 px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-center md:text-left">
        {/* About Us */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Us</h2>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-gray-400">About Us</Link></li>
            <li><Link to="/terms" className="hover:text-gray-400">Terms of Use</Link></li>
            <li><Link to="/shop" className="hover:text-gray-400">Shop</Link></li>
            <li><Link to="/contact" className="hover:text-gray-400">Contact Us</Link></li>
            <li><Link to="/cart" className="hover:text-gray-400">Cart</Link></li>
            <li><Link to="/account" className="hover:text-gray-400">My Account</Link></li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Help</h2>
          <ul className="space-y-2">
            <li><Link to="/faq" className="hover:text-gray-400">FAQs</Link></li>
            <li><Link to="/support" className="hover:text-gray-400">Customer Support</Link></li>
            <li><Link to="/returns" className="hover:text-gray-400">Return Policy</Link></li>
          </ul>
        </div>

        {/* Consumer Policy */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Consumer Policy</h2>
          <ul className="space-y-2">
            <li><Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link></li>
            <li><Link to="/refunds" className="hover:text-gray-400">Refund Policy</Link></li>
            <li><Link to="/shipping" className="hover:text-gray-400">Shipping Policy</Link></li>
          </ul>
        </div>

        {/* Registered Office */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Registered Office</h2>
          <p>122/1, 1st Cross Street,</p>
          <p>Vivekananda Nagar, Kumbakonam</p>
          <p>Tamil Nadu - 612001</p>
          <p>Mobile: +91 8765342310</p>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-8 text-center">
        <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-4">
          {socialLinks.map((link) => (
            <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="transition-transform transform hover:scale-110">
              <img src={link.icon} alt={link.name} className="w-8 h-8" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
