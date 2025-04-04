import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../../redux/fetchProductById"; // You may need to write this action

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.stocks);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading) return <div className="text-center py-4 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  if (!selectedProduct) return null;

  const variant = selectedProduct.variants?.[0] || {};

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col lg:flex-row gap-6">
        {variant.imageUrl && (
          <img
            src={variant.imageUrl}
            alt={selectedProduct.productName}
            className="w-full lg:w-1/3 h-64 object-cover rounded-md"
          />
        )}

        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.productName}</h2>
          <p className="text-gray-700 mb-2">{selectedProduct.description || "No description provided."}</p>
          <p className="text-gray-500 mb-2">Category: {selectedProduct.category || "N/A"}</p>
          <p className="text-lg font-semibold text-gray-800">MRP: ₹{variant.MRP || "N/A"}</p>
          <p className={`mt-2 font-bold ${variant.inStock ? "text-green-600" : "text-red-600"}`}>
            {variant.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <button
            disabled={!variant.inStock}
            className={`mt-6 px-4 py-2 rounded text-white font-semibold ${
              variant.inStock ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {variant.inStock ? "Buy Now" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
