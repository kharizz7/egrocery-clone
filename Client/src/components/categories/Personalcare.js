import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStocks } from "../../redux/stockSlice";

const PersonalCare = () => {
  const dispatch = useDispatch();
  const { items: stocks, loading, error } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(fetchStocks("Personal Care"));
  }, [dispatch]);

  if (loading) return <div className="text-center text-lg font-semibold py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-4">Error: {error}</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Personal Care Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stocks.length > 0 ? (
          stocks.map((item) => {
            const variant = item.variants?.[0] || {};

            return (
              <Link to={`/product/${item.productId}`} key={item._id} className="block">
                <div className="bg-white shadow-md hover:shadow-xl transition rounded-lg p-4 border border-gray-200">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.productName}</h3>
                  <p className="text-gray-700 mb-1">{item.description || "No description provided."}</p>
                  <p className="text-gray-500">Category: {item.category || "N/A"}</p>

                  {variant.imageUrl && (
                    <img
                      src={variant.imageUrl}
                      alt={item.productName}
                      className="w-full h-40 object-cover rounded-md mt-3"
                    />
                  )}

                  <div className="mt-4 space-y-1">
                    <p className="text-gray-700 font-semibold">MRP: ₹{variant.MRP || "N/A"}</p>
                    <p className="text-gray-700">SKU: {variant.SKU || "N/A"}</p>
                    <p
                      className={`font-bold ${
                        variant.inStock ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {variant.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-3">No personal care products available</p>
        )}
      </div>
    </div>
  );
};

export default PersonalCare;
