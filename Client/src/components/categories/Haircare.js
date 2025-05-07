// Hair Care

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../../redux/stockSlice";

// Function to shuffle an array randomly
const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
};

const Grocery = () => {
  const dispatch = useDispatch();
  const { items: stocks, loading, error } = useSelector((state) => state.stocks);
  const [shuffledStocks, setShuffledStocks] = useState([]);

  useEffect(() => {
    dispatch(fetchStocks("Hair Care"));
  }, [dispatch]);

  useEffect(() => {
    // Shuffle the variants once the stocks are loaded
    if (stocks.length > 0) {
      const shuffled = stocks.map((item) => ({
        ...item,
        variants: shuffleArray(item.variants || []), // Shuffle variants
      }));
      setShuffledStocks(shuffled);
    }
  }, [stocks]);

  if (loading) {
    return <div className="text-center p-4 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Hair Care</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shuffledStocks.length > 0 ? (
          shuffledStocks.map((item) => {
            // Pick the first variant from shuffled variants
            const variant = item.variants?.[0]; // Get the first variant after shuffle

            return (
              <div key={item._id} className="space-y-6">
                <Link
                  to={`/product/${item.productId}?variant=${variant.SKU}`}
                  key={variant.SKU}
                  className="block"
                >
                  <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition flex flex-col h-full">
                    {/* Displaying the Product Name in a single line */}
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 truncate">{item.productName}</h3>

                    <div className="mt-4">
                      <div className="space-y-4">
                        <img
                          src={variant.imageUrl || "/placeholder.jpg"}
                          alt={item.productName}
                          className="w-full h-40 object-cover rounded-md"
                        />
                        <p className="text-sm text-gray-600">SKU: {variant.SKU || "N/A"}</p>
                        <p className="text-sm text-gray-600">Special Price: ₹{variant.specialPrice || "N/A"}</p>
                        <p className="text-sm text-gray-600 line-through">MRP: ₹{variant.MRP || "N/A"}</p> {/* Strike-through applied here */}
                        <p
                          className={`text-sm font-bold mt-1 ${
                            variant.inStock ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {variant.inStock ? "In Stock" : "Out of Stock"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-3">No grocery products available</p>
        )}
      </div>
    </div>
  );
};

export default Grocery;
