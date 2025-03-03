import { useState } from "react";

const products = [
    { id: 1, name: "Kopi Luwak Coffee", category: "Coffee", brand: "Wild Gayo", rating: 4.9, price: 4500, discount: 10 },
    { id: 2, name: "Single Origin Ethiopian Coffee", category: "Coffee", brand: "Blue Bottle", rating: 4.8, price: 1200, discount: 15 },
    { id: 3, name: "Japanese Matcha Green Tea", category: "Tea", brand: "Ippodo Tea", rating: 4.9, price: 900, discount: 12 },
    { id: 4, name: "Organic Darjeeling Tea", category: "Tea", brand: "Vahdam", rating: 4.7, price: 750, discount: 10 },
    { id: 5, name: "Elderflower Cordial", category: "Juices & Syrups", brand: "Belvoir", rating: 4.6, price: 1100, discount: 8 },
    { id: 6, name: "Cold Brew Coffee Concentrate", category: "Coffee", brand: "Stumptown", rating: 4.8, price: 950, discount: 14 },
    { id: 7, name: "Sparkling Italian Lemonade", category: "Soft Drinks", brand: "San Pellegrino", rating: 4.6, price: 600, discount: 10 },
    { id: 8, name: "Barrel-Aged Japanese Whiskey", category: "Alcoholic", brand: "Yamazaki", rating: 4.9, price: 8000, discount: 5 },
    { id: 9, name: "Handcrafted Tonic Water", category: "Soft Drinks", brand: "Fever-Tree", rating: 4.7, price: 500, discount: 12 },
    { id: 10, name: "French Cabernet Sauvignon", category: "Wine", brand: "Château Margaux", rating: 4.9, price: 12000, discount: 8 },
    { id: 11, name: "Organic Kombucha", category: "Fermented Drinks", brand: "GT’s", rating: 4.8, price: 700, discount: 15 },
    { id: 12, name: "Premium Coconut Water", category: "Juices & Syrups", brand: "Harmless Harvest", rating: 4.7, price: 650, discount: 10 },
    { id: 13, name: "Artisan Hot Chocolate", category: "Hot Beverages", brand: "Valrhona", rating: 4.8, price: 850, discount: 12 },
    { id: 14, name: "Organic Chai Latte Mix", category: "Tea", brand: "David Rio", rating: 4.6, price: 780, discount: 14 },
    { id: 15, name: "Italian Espresso Beans", category: "Coffee", brand: "Lavazza", rating: 4.9, price: 1100, discount: 10 }
];


const Beverages = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedBrand, setSelectedBrand] = useState("All");
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minRating, setMinRating] = useState("All");
    const [minDiscount, setMinDiscount] = useState(10);
    const [showFilter, setShowFilter] = useState(false); // Controls filter visibility

    const categories = ["All", ...new Set(products.map((p) => p.category))];
    const brands = ["All", ...new Set(products.map((p) => p.brand))];

    const filteredProducts = products.filter((product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        (selectedBrand === "All" || product.brand === selectedBrand) &&
        product.price <= maxPrice &&
        (minRating === 'All'|| product.rating >= minRating )&&
        product.discount >= minDiscount
    );

    return (
        <>
            <div id="beverages" className="flex flex-col md:flex-row p-5 w-full">
                {/* Filter Panel (Hidden on mobile, slides in when activated) */}
                <div
                    className={`fixed inset-0 bg-white shadow-lg transition-transform transform ${
                        showFilter ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:relative md:w-1/6 p-4 rounded-lg bg-gray-200 z-50`}
                >
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold mb-4">Filters</h2>
                        <button className="md:hidden text-red-500" onClick={() => setShowFilter(false)}>
                            ✖
                        </button>
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                        <h3>Category</h3>
                        <select
                            className="w-full p-2 mt-2"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brand */}
                    <div className="mb-4">
                        <h3>Brand</h3>
                        <select
                            className="w-full p-2 mt-2 border rounded"
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                        >
                            {brands.map((brand) => (
                                <option key={brand} value={brand}>
                                    {brand}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <h3>Max Price: ${maxPrice}</h3>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>

                    {/* Customer Review */}
                    <div className="mb-4">
                        <h3>Review</h3>
                        <select
                            className="w-full p-2 mt-2 border rounded"
                            value={minRating}
                            onChange={(e) => setMinRating(Number(e.target.value))}
                        >
                            {["All", 0, 1, 2, 3, 4, 5].map((rating) => (
                                <option key={rating} value={rating}>
                                    {rating} & above
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Discount */}
                    <div className="mb-4">
                        <h3>Discount</h3>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            value={minDiscount}
                            onChange={(e) => setMinDiscount(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Product Dashboard */}
                <div className="w-full lg:ml-4">
                    {/* Filter Button (Only for mobile) */}
                    {/* Filter Button (Only for mobile) */}
                <div className="flex justify-end md:hidden">
                    <h1 className="text-l cursor-pointer" onClick={() => setShowFilter(true)}>
                        Filter
                    </h1>
                </div>

                <div className="flex justify-center">  
                    <h1 className="text-2xl font-bold ">Beauty Products</h1>
                </div>

                    

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="p-4 bg-gray-100 rounded-lg cursor-pointer"
                                    onClick={() => setShowFilter(true)}
                                >
                                    <h2 className="text-xl font-semibold">{product.name}</h2>
                                    <p className="text-gray-600">Category: {product.category}</p>
                                    <p className="text-gray-600">Brand: {product.brand}</p>
                                    <p className="text-gray-600">Rating: ⭐{product.rating}</p>
                                    <p className="text-gray-600">Discount: {product.discount}%</p>
                                    <p className="text-gray-900 font-bold">${product.price}</p>
                                </div>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Beverages;
