/** @format */

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
  console.log(images);
  const swiperStyles = {
    "--swiper-pagination-color": "teal",
    "--swiper-pagination-bullet-inactive-color": "#999999",
    "--swiper-pagination-bullet-inactive-opacity": "1",
    "--swiper-pagination-bullet-size": "5px",
    "--swiper-pagination-bullet-horizontal-gap": "6px",
  } as React.CSSProperties; // Define as CSSProperties

  return (
    <Swiper
      style={swiperStyles}
      spaceBetween={30}
      centeredSlides={true}
      navigation={true}
      pagination={{ clickable: false }}
      className="w-full h-full listing-carousel">
      {images.map((image, index) => (
        <SwiperSlide key={index}>
       
          <Image
            priority={true}
            src={image}
            alt={`Image ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-md"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
           {/* <img
      src={image}
      alt={`Image ${index + 1}`}
      style={{ objectFit: "cover" }}
      className="rounded-md"
    /> */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
