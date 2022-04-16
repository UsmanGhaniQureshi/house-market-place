import SwiperCore, {
  Navigation,
  A11y,
  Scrollbar,
  Pagination,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.css";

import { Link } from "react-router-dom";

import { FaCheck, FaTimes } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import Carousel from "../Carousel";
SwiperCore.use([Navigation, A11y, Scrollbar, Pagination, Autoplay]);

const ListingDetailItem = ({ item }) => {
  const {
    title,
    bathrooms,
    bedrooms,
    address,
    furnished,
    type,
    userRef,
    parking,
    offer,
    regularPrice,
    imgUrls,
  } = item;

  return (
    <>
      <Carousel images={imgUrls} />
      <div className="flex  flex-col bg-slate-300  p-6">
        <p className="text-base">{address}</p>
        <p className="font-extrabold text-3xl">
          {title} - <span className="text-green-600">{regularPrice} Rs.</span>
        </p>
        <div className="flex space-x-2 my-3">
          <span className="badge badge-primary">
            On {type === "Sell" ? "Sale" : "Rent"}
          </span>
          {offer === "Yes" && (
            <span className="badge badge-secondary">
              On {item.discountedPrice} Discount
            </span>
          )}
        </div>

        <div className="flex w-96">
          <div className="flex-1">Baths</div>
          <div className="flex-1">{bathrooms}</div>
        </div>
        <div className="flex w-96">
          <div className="flex-1">Rooms</div>
          <div className="flex-1">{bedrooms}</div>
        </div>
        <div className="flex w-96">
          <div className="flex-1">Furnished</div>
          <div className="flex-1">
            {furnished === "Yes" ? (
              <FaCheck className="text-green-600" />
            ) : (
              <FaTimes className="text-red-600" />
            )}
          </div>
        </div>
        <div className="flex w-96 ">
          <div className="flex-1 ">Parking</div>
          <div className="flex-1 ">
            {parking === "Yes" ? (
              <FaCheck className="text-green-600" />
            ) : (
              <FaTimes className="text-red-600" />
            )}
          </div>
        </div>

        <Link
          className="btn btn-secondary border-none rounded-lg my-7"
          to={`/contact-landlord/${userRef}?listingName=${title}`}
        >
          Contact LandLord
        </Link>
      </div>
    </>
  );
};

export default ListingDetailItem;
