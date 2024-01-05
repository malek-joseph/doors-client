/** @format */
"use client";

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

const ListingDetailsCarousel: React.FC<CarouselProps> = ({ images }) => {

  const swiperStyles = {
    "--swiper-pagination-color": "teal",
    "--swiper-pagination-bullet-inactive-color": "#999999",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-size": "5px",
    "--swiper-pagination-bullet-horizontal-gap": "6px",
  } as React.CSSProperties; // Define as CSSProperties

  return (
        <div className="relative w-full h-80 mb-4 overflow-hidden my-4 shadow-lg rounded-lg ">

    <Swiper
      style={swiperStyles}
      slidesPerView={3}
      spaceBetween={10}
      centeredSlides={true}
      navigation={true} // Enable navigation
      pagination={{ clickable: false }}
      className="w-full h-full listing-carousel rounded-lg" // Adjust width and height to fit the container
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            layout="fill"
            objectFit="cover" // Adjust objectFit if needed
            className=""
          />
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default ListingDetailsCarousel;
