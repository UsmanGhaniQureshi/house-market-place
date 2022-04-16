import SwiperCore, {
  Navigation,
  A11y,
  Scrollbar,
  Pagination,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.css";

import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, A11y, Scrollbar, Pagination, Autoplay]);

const Carousel = ({ images }) => {
  return (
    <Swiper
      slidesPerView={1}
      autoplay={{ delay: 3000 }}
      pagination={{ clickable: true }}
    >
      {images.map((image, id) => (
        <SwiperSlide key={id}>
          <div className="w-full h-96">
            <img src={image} className="w-full h-full object-cover" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
