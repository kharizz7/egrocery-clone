import { useState, useEffect } from "react";

const useFetchStocks = (category) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${category}`);
        if (!response.ok) throw new Error("Failed to fetch stocks");
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [category]);

  return { stocks, loading, error };
};

export default useFetchStocks;
