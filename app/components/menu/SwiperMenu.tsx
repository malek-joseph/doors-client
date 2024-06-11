/** @format */

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import SwiperCore from 'swiper';
import "swiper/css";
import "./SwiperMenu.css";

const SwiperMenu: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    if (swiperRef.current?.swiper) {
      const swiper = swiperRef.current.swiper;

      // If the menu is currently closed, open it by sliding to the menu slide
      // Otherwise, close it by sliding to the content slide
      if (!menuOpen) {
        swiper.slideNext(); // Open the menu
      } else {
        swiper.slidePrev(); // Close the menu
      }
    }
  };

  return (
    
    <Swiper
      onSlideChange={(swiper) => {
        // Update the menuOpen state based on the active slide
        setMenuOpen(swiper.activeIndex === 1); // Menu is open if we're on the second slide
      }}
      slidesPerView="auto"
      initialSlide={0} // Start with the content slide
      resistanceRatio={0}
      ref={swiperRef}
      >
      <SwiperSlide className="content">
        <div
          className={`menu-button ${!menuOpen ? "" : "cross"}`}
          onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        Content slide
      </SwiperSlide>
      <SwiperSlide className="menu">Menu slide</SwiperSlide>
    </Swiper>
  );
};

export default SwiperMenu;



