import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// Import Assets
import Slide1 from "../assets/slide1.png";
import Slide2 from "../assets/slide2.png";
import Slide3 from "../assets/slide3.png";
import Slide4 from "../assets/slide4.png";

// Card Images (Best Deals)
import Card1 from "../assets/card1.jpg";
import Card2 from "../assets/card2.webp";
import Card3 from "../assets/card3.webp";
import Card4 from "../assets/card4.jpg";
import Card5 from "../assets/card5.jpg";

// About Icons
import Delivery from "../assets/free-shipping.png";
import Quality from "../assets/achievement.png";
import Savings from "../assets/money-bag.png";
import Quick from "../assets/time.png";

const images = [Slide1, Slide2, Slide3, Slide4];

const cards = [
  { title: "Card 1", image: Card1, description: "This is the first card" },
  { title: "Card 2", image: Card2, description: "This is the second card" },
  { title: "Card 3", image: Card3, description: "This is the third card" },
  { title: "Card 4", image: Card4, description: "This is the fourth card" },
  { title: "Card 5", image: Card5, description: "This is the fifth card" },
];

const aboutFeatures = [
  { image: Delivery, text: "Free Shipping" },
  { image: Quality, text: "Best Quality" },
  { image: Savings, text: "Great Savings" },
  { image: Quick, text: "Quick Delivery" },
];

// Product Sections Data
const productCategories = {
  Babycare: [
    { id: 1, name: "Baby Lotion", image: Card1, price: "$10" },
    { id: 2, name: "Baby Wipes", image: Card2, price: "$5" },
  ],
  Bakery: [
    { id: 1, name: "Chocolate Cake", image: Card3, price: "$15" },
    { id: 2, name: "Croissant", image: Card4, price: "$7" },
  ],
  Beauty: [
    { id: 1, name: "Face Cream", image: Card5, price: "$12" },
    { id: 2, name: "Lipstick", image: Card2, price: "$8" },
  ],
  Beverages: [
    { id: 1, name: "Green Tea", image: Card3, price: "$6" },
    { id: 2, name: "Coffee", image: Card1, price: "$9" },
  ],
};
// customer review
const Review = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    comment: "Amazing quality! Fast delivery and great packaging.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Sarah Smith",
    rating: 4,
    comment: "Good product, but delivery took a little longer than expected.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Michael Johnson",
    rating: 5,
    comment: "Highly recommend! The product exceeded my expectations.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    name: "Emily Davis",
    rating: 4.5,
    comment: "Very satisfied with the quality. Will order again!",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    name: "David Wilson",
    rating: 3.5,
    comment: "Decent quality, but I expected better packaging.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    id: 6,
    name: "Jessica Brown",
    rating: 5,
    comment: "Loved it! Worth every penny. Customer support was helpful too.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const Home = () => {
  const navigate = useNavigate();
  

  return (
    <div  className="w-full">
      {/* First Swiper (Main Image Slider) */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[150px] md:h-[150px] lg:h-2/4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Best Deals */}
      <div className="mt-8 text-center">
        <h1 className="text-2xl font-bold">Best Deals</h1>
      </div>

      {/* Second Swiper (Best Deals) */}
      <div className="max-w-7xl mx-auto">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 5 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="p-4"
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md rounded-lg p-4 text-center">
                <img src={card.image} alt={card.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h3 className="text-lg font-bold">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* About Us Section */}
      <div className="bg-black w-full h-auto mt-10 flex flex-wrap justify-center gap-6 p-5">
        {aboutFeatures.map((feature, index) => (
          <div key={index} className="bg-gray-500 h-[180px] w-[300px] flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
            <img src={feature.image} alt={feature.text} className="w-16 h-16 mb-3" />
            <p className="text-white text-lg font-semibold">{feature.text}</p>
          </div>
        ))}
      </div>

      {/* Product Categories */}
      <div className="max-w-6xl mx-auto mt-10 sm:w-3/4 p-1">
        {Object.keys(productCategories).map((category, index) => (
          <div key={index} className="mt-8">
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productCategories[category].map((product) => (
                <div key={product.id} className="bg-white p-4 shadow-md rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.price}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate(`/${category.toLowerCase()}`)}
              className="mt-4 text-blue-500 hover:underline"
            >
              View All →
            </button>
          </div>
        ))}
      </div>
      {/* customer review */}
      <h1 className="text-2xl font-bold text-center p-5">Customer Review</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
      {Review.map((review) => (
        <div key={review.id} className="bg-gray-300 ml-12 w-3/4 p-4 gap-4 shadow-md rounded-lg text-center">
          <img
            src={review.image}
            alt={review.name}
            className="w-16 h-16 rounded-full mx-auto mb-3"
          />
          <h3 className="text-lg font-semibold">{review.name}</h3>
          <p className="text-yellow-500">⭐ {review.rating} / 5</p>
          <p className="text-gray-600 mt-2">{review.comment}</p>
        </div>
      ))}
    </div>

      
    </div>
  );
};

export default Home;
