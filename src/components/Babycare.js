import { useState } from "react";
import Sidebar from "./Sidebar";

const products = [
  { id: 1, name: "Baby Lotion", category: "Skincare", price: 15 },
  { id: 2, name: "Diapers", category: "Diapers", price: 25 },
  { id: 3, name: "Baby Shampoo", category: "Skincare", price: 10 },
  { id: 4, name: "Baby Wipes", category: "Hygiene", price: 5 },
  { id: 5, name: "Baby Powder", category: "Skincare", price: 8 },
];

const Babycare = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(50);

  // Filter products based on selection
  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price <= maxPrice
    );
  });

  return (
    <div className="flex">
      {/* Sidebar with filters */}
      <Sidebar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* Main Content */}
      <div className="p-5 w-full">
        <h1 className="text-2xl font-bold">Babycare Products</h1>

        {/* Filtered Products List */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="p-4 bg-gray-100 rounded-lg">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-600">Category: {product.category}</p>
                <p className="text-gray-900 font-bold">${product.price}</p>
              </div>
            ))
          ) : (
            <p>No products match the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Babycare;
