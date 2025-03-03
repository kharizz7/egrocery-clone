import { useState } from "react";

const products = [
    { id: 1, name: "Truffle Olive Oil", category: "Oil & Vinegar", brand: "La Tourangelle", rating: 4.8, price: 750, discount: 15 },
    { id: 2, name: "Aged Balsamic Vinegar", category: "Oil & Vinegar", brand: "Giuseppe Giusti", rating: 4.7, price: 1200, discount: 10 },
    { id: 3, name: "Artisan Dark Chocolate", category: "Sweets & Confectionery", brand: "Lindt Excellence", rating: 4.9, price: 450, discount: 20 },
    { id: 4, name: "French Brie Cheese", category: "Cheese & Dairy", brand: "Président", rating: 4.6, price: 850, discount: 12 },
    { id: 5, name: "Organic Saffron Threads", category: "Spices & Seasoning", brand: "Zaran", rating: 4.8, price: 1800, discount: 18 },
    { id: 6, name: "Italian Truffle Pasta", category: "Pasta & Grains", brand: "TartufLanghe", rating: 4.7, price: 650, discount: 15 },
    { id: 7, name: "Japanese Matcha Powder", category: "Tea & Beverages", brand: "Ippodo Tea", rating: 4.9, price: 900, discount: 10 },
    { id: 8, name: "Spanish Iberico Ham", category: "Meat & Charcuterie", brand: "Fermin", rating: 4.8, price: 3500, discount: 10 },
    { id: 9, name: "Greek Extra Virgin Olive Oil", category: "Oil & Vinegar", brand: "Kalamata Gold", rating: 4.6, price: 1100, discount: 12 },
    { id: 10, name: "Madagascar Vanilla Beans", category: "Baking & Desserts", brand: "Native Vanilla", rating: 4.7, price: 1600, discount: 15 },
    { id: 11, name: "Belgian Hazelnut Spread", category: "Sweets & Confectionery", brand: "Côte d'Or", rating: 4.8, price: 550, discount: 18 },
    { id: 12, name: "Handmade Italian Panettone", category: "Bakery", brand: "Loison", rating: 4.5, price: 1300, discount: 10 },
    { id: 13, name: "Black Truffle Salt", category: "Spices & Seasoning", brand: "Sabatino Tartufi", rating: 4.9, price: 1200, discount: 12 },
    { id: 14, name: "French Foie Gras", category: "Meat & Charcuterie", brand: "Rougié", rating: 4.7, price: 2200, discount: 8 },
    { id: 15, name: "Swiss Gruyère Cheese", category: "Cheese & Dairy", brand: "Emmi", rating: 4.6, price: 950, discount: 14 }
];


const Gourmet = () => {
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
            <div id="gourments" className="flex flex-col md:flex-row p-5 w-full">
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
                    <h1 className="text-2xl font-bold ">Gourments Products</h1>
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

export default Gourmet;
