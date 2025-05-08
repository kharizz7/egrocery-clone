import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchStocks from "./useFetchStocks";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const CategoryPreview = ({ categoryName }) => {
  const { stocks, loading, error } = useFetchStocks(categoryName);
  const navigate = useNavigate();

  if (loading) return <div className="text-center text-lg font-semibold">Loading {categoryName} products...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  const handleViewAll = () => {
    navigate(`/${categoryName.toLowerCase()}`);
  };

  return (
    <div className="w-full mt-10 px-4"> 

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">{categoryName} Products</h2>
        <button
          onClick={handleViewAll}
          className="text-sm sm:text-base bg-gray-300 text-black font-bold px-5 py-2 rounded-md hover:bg-gray-400 transition"
        >
          View All
        </button>
      </div>

      <div className="relative">
  <Swiper
    slidesPerView={1}
    spaceBetween={20}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 4 },
    }}
    navigation={true}
    modules={[Navigation]}
    className="mySwiper"
  >
    {stocks.slice(0, 8).map((item) => {
      const variant = item.variants?.[0];
      return (
        <SwiperSlide key={item._id}>
          <Link to={`/product/${item.productId}`} className="block h-full">
            <div className="bg-white shadow-md hover:shadow-xl rounded-md overflow-hidden border border-gray-200 transition-all duration-300 h-full flex flex-col">
              <img
                src={variant?.imageUrl || "/placeholder.jpg"}
                alt={item.productName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                <div className="relative overflow-hidden h-6 mb-1">
                  <div className="absolute whitespace-nowrap animate-marquee text-lg font-semibold text-gray-800">
                      {item.productName}
                  </div>
                </div>                  
                </div>
                {variant && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">SKU: <span className="font-medium">{variant.SKU || "N/A"}</span></p>
                    <p className="text-sm text-gray-600">Special Price: <span className="font-semibold">₹{variant.specialPrice || variant.MRP || "N/A"}</span></p>
                    <p className="text-sm text-gray-600 line-through">MRP: ₹{variant.MRP || "N/A"}</p>
                    <p className={`text-sm font-semibold mt-1 ${variant.inStock ? "text-green-600" : "text-red-600"}`}>
                      {variant.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </SwiperSlide>
      );
    })}
  </Swiper>

  {/* Custom Navigation Styles */}
  <style>
    {`
      .swiper-button-prev,
      .swiper-button-next {
        color: white;
        background-color: #1f2937;
        padding: 0.75rem;
        border-radius: 9999px;
        top: 40%;
        transform: translateY(-50%);
        z-index: 20;
        width: 2.5rem;
        height: 2.5rem;
      }

      .swiper-button-prev {
        left: .5rem;
      }

      .swiper-button-next {
        right: .5rem;
      }

      .swiper-button-prev::after,
      .swiper-button-next::after {
        font-size: 1rem;
        font-weight: bold;
      }
        @keyframes marquee {
      0%   { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }

    .animate-marquee {
      animation: marquee 6s linear infinite;
    }
    `}
  </style>
</div>

    </div>
  );
};

export default CategoryPreview;
