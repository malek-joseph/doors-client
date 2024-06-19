
/** @format */
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface CarouselProps {
  photos: string[];
}

const RectangleCarousel: React.FC<CarouselProps> = ({ photos }) => {
  return (
    <div className="w-full h-60">
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        navigation={true}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={index} className="overflow-hidden w-full h-full">
            <Image
              priority={true}
              src={photo}
              alt={`Image ${index + 1}`}
              width={400}
              height={250}
              className="object-cover w-full h-full rounded-t-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RectangleCarousel;