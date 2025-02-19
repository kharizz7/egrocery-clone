const Sidebar = ({ selectedCategory, setSelectedCategory, maxPrice, setMaxPrice }) => {
    return (
      <div className="w-64 h-screen bg-gray-800 text-white p-5">
        <h2 className="text-2xl font-bold mb-5">Filters</h2>
  
        {/* Category Filter */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Category</h3>
          <select
            className="w-full p-2 mt-2 bg-gray-700 text-white rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Skincare">Skincare</option>
            <option value="Diapers">Diapers</option>
            <option value="Hygiene">Hygiene</option>
          </select>
        </div>
  
        {/* Price Filter */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Max Price: ${maxPrice}</h3>
          <input
            type="range"
            min="0"
            max="50"
            value={maxPrice}
            className="w-full mt-2"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>
    );
  };
  
  export default Sidebar;
  