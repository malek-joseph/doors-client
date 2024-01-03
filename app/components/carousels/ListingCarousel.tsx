/** @format */


import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useState } from "react";
import "./swiper.css"


// Import Swiper styles
import "swiper/swiper-bundle.css";
import Image from "next/image";

// Install Swiper modules
SwiperCore.use([
  Navigation, Pagination,
  Autoplay,
]);

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <div
      className="relative h-60 w-80 mb-4 listing-carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
       navigation={true} // Enable navigation
        pagination={{ clickable: true }}
        className="w-full h-full" // Adjust width and height to fit the container
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
                layout="fill"
                objectFit="cover" // Adjust objectFit if needed
                className="rounded-md"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
