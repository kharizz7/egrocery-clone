import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../../redux/stockSlice";

const Grocery = () => {
  const dispatch = useDispatch();
  const { items: stocks, loading, error } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(fetchStocks("Grocery"));
  }, [dispatch]);

  if (loading) {
    return <div className="text-center p-4 text-lg font-semibold">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Grocery List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.length > 0 ? (
          stocks.map((item) => (
            <Link to={`/product/${item.productId}`} key={item._id} className="block">
              <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.productName}</h3>
                <p className="text-gray-600 mb-1 line-clamp-2">{item.description || "No description available."}</p>
                <p className="text-gray-700 font-semibold">Category: {item.category}</p>

                <h4 className="mt-4 text-lg font-bold text-gray-800">Variants:</h4>
                <div className="mt-2 space-y-4">
                  {item.variants?.map((variant, index) => (
                    <div key={index} className="border-t border-gray-300 pt-3">
                      <img
                        src={variant.imageUrl || "/placeholder.jpg"}
                        alt={item.productName}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <p className="text-sm text-gray-600 mt-2">SKU: {variant.SKU || "N/A"}</p>
                      <p className="text-sm text-gray-600">Dealer Price: ₹{variant.dealerPrice || "N/A"}</p>
                      <p className="text-sm text-gray-600">Special Price: ₹{variant.specialPrice || "N/A"}</p>
                      <p className="text-sm text-gray-600">MRP: ₹{variant.MRP || "N/A"}</p>
                      <p
                        className={`text-sm font-bold mt-1 ${
                          variant.inStock ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {variant.inStock ? "In Stock" : "Out of Stock"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">No grocery products available</p>
        )}
      </div>
    </div>
  );
};

export default Grocery;
