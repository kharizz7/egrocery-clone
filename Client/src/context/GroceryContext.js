import { createContext, useState, useEffect } from "react";
import { fetchProductsByCategory } from "../services/api";

export const GroceryContext = createContext();

export const GroceryProvider = ({ children }) => {
  const [categories, setCategories] = useState({
    "Personal Care": [],
    "Hair Care": [],
    "Household": [],
    "Grocery": [],
    "Miscellaneous": []
  });

  useEffect(() => {
    Object.keys(categories).forEach(async (category) => {
      const data = await fetchProductsByCategory(category);
      setCategories((prev) => ({ ...prev, [category]: data }));
    });
  }, []);

  return (
    <GroceryContext.Provider value={{ categories }}>
      {children}
    </GroceryContext.Provider>
  );
};
