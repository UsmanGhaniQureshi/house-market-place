import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

import Carousel from "../Carousel";
import useAuth from "../../store/AuthContext";

const ListingDetailItem = ({ item }) => {
  const { user } = useAuth();
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
    <div>
      <Carousel images={imgUrls} />
      <div className="flex  flex-col bg-slate-300 mx-auto   p-6">
        <p className="text-base">{address}</p>
        <p className="font-extrabold text-sm md:text-3xl">
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
        <div>
          {user?.uid !== item.userRef && (
            <Link
              className="btn btn-secondary border-none rounded-lg my-7"
              to={`/contact-landlord/${userRef}?listingName=${title}`}
            >
              Contact LandLord
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingDetailItem;
