import React from "react";
import { useParams } from "react-router-dom";
import useFetchStocks from "../../hooks/useFetchStocks";

const ProductCategory = () => {
  const { categoryName } = useParams();
  const { stocks, loading, error } = useFetchStocks(categoryName);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 capitalize">{categoryName} Products</h2>
      {stocks.length === 0 ? (
        <div>No products available.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stocks.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded shadow">
              <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
