import SwiperCore, {
  Navigation,
  A11y,
  Scrollbar,
  Pagination,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.css";
import Category from "../components/Category";
import LoadingSpinner from "../components/LoadingSpinner";
import SliderImage from "../components/SliderImage";
import useListing from "../store/ListingContext";

import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, A11y, Scrollbar, Pagination, Autoplay]);

const HomePage = () => {
  const { isListingLoaded, listing } = useListing();

  if (!isListingLoaded) return <LoadingSpinner />;

  return (
    <div className="p-5  font-bold">
      <h3>Explore</h3>
      <Swiper
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
      >
        {listing.slice(0, 4).map((item) => (
          <SwiperSlide key={item.id}>
            <SliderImage
              imageUrl={item.imgUrls[0]}
              description={item.title}
              price={item.regularPrice}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <h3 className="font-extrabold">Categories</h3>
      <div className="flex flex-col md:flex-row mt-3">
        <Category
          imageUrl="https://wallpaperaccess.com/full/1700222.jpg"
          title="Places For Sale"
          linkUrl="/sale-places"
        />
        <Category
          imageUrl="https://wallpapercave.com/wp/E1svyPv.jpg"
          title="Places for Rent"
          linkUrl="rent-places"
        />
      </div>
    </div>
  );
};

export default HomePage;
