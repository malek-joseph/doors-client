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

    
    // If the menu is open (which means we're currently on the first slide),
    // slide to the second slide (content slide) to close the menu
    if (menuOpen) {
      swiper.slideNext();
    } else {
      swiper.slidePrev();
    }
  }
};

  return (
    <Swiper
      onSlideChange={(swiper) => {
        if (swiper.activeIndex === 0) {
          setMenuOpen(true);
        } else {
          setMenuOpen(false);
        }
      }}
      slidesPerView="auto"
      initialSlide={1}
      resistanceRatio={0}
      ref={swiperRef}>
      <SwiperSlide className="menu">Menu slide</SwiperSlide>
      <SwiperSlide className="content">
        <div
          className={`menu-button ${menuOpen ? "cross" : ""}`}
          onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        Content slide
      </SwiperSlide>
    </Swiper>
  );
};

export default SwiperMenu;
