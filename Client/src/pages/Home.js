import React from "react";
import CategoryPreview from "../components/product/categorypreview"; // Import CategoryPreview

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 sm:w-3/4 p-1">
      <CategoryPreview categoryName="Grocery" />
      <CategoryPreview categoryName="Miscellaneous" />
      <CategoryPreview categoryName="Personal Care" />
      <CategoryPreview categoryName="Hair Care" />
      <CategoryPreview categoryName="Household" />
    </div>
  );
};

export default Home;
