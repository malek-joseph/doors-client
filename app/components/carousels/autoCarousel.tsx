/** @format */

import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import Image from "next/image";

// Install Swiper modules
SwiperCore.use([
  // Navigation, Pagination,
  Autoplay,
]);

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  return (
    <div className="w-full h-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        // pagination={
        //   {
        //     clickable: true,
        //   }
        // }
        // navigation={true}
        className="w-full h-full">
        {images.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide w-full h-full">
            <div className=" relative w-full h-screen xl:flex items-center">
              <Image
                src={image}
                alt={`Image ${index + 1}`}
               
                layout="fill"
                objectFit="cover"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
