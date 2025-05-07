import React from "react";
import useFetchStocks from "../../hooks/useFetchStocks";

const StockList = ({ category }) => {
  const { stocks, loading, error } = useFetchStocks(category);

  if (loading) return <p>Loading stocks...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Category: {category.toUpperCase()}</h2>
      {stocks.length === 0 ? (
        <p>No stocks found.</p>
      ) : (
        <ul>
          {stocks.map((stock) => (
            <li key={stock._id || stock.symbol}>
              <strong>{stock.name}</strong> ({stock.symbol}) - ${stock.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StockList;
