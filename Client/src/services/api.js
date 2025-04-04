const API_BASE_URL = "http://localhost:3000/api";

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/grocery/${category}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
