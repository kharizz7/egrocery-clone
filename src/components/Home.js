import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Slide1 from '../assets/slide1.png';
import Slide2 from '../assets/slide2.png';
import Slide3 from '../assets/slide3.png';
import Slide4 from '../assets/slide4.png';

// Card Images
import Card1 from '../assets/card1.jpg';
import Card2 from '../assets/card2.webp';
import Card3 from '../assets/card3.webp';
import Card4 from '../assets/card4.jpg';
import Card5 from '../assets/card5.jpg';

// About Icons
import Delivery from '../assets/free-shipping.png';
import Quality from '../assets/achievement.png';
import Savings from '../assets/money-bag.png';
import Quick from '../assets/time.png';

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

const Home = () => {
  return (
    <div className="w-full">
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
      
    </div>
  );
};

export default Home;
