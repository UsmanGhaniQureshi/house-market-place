import { FaBath, FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";

import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { getAuth } from "firebase/auth";

const Card = ({ item, onDelete, isOnProfile }) => {
  const { currentUser } = getAuth();
  const { id, imgUrls, address, title, regularPrice, bedrooms, bathrooms } =
    item;
  return (
    <div className="flex flex-col max-w-sm md:max-w-lg md:flex-row my-2 bg-white p-2 md:p-4 mt-2 mx-1 font-bold md:m-3 rounded-3xl transition-colors delay-100 duration-500 hover:bg-slate-300">
      <div className="w-40 h-40 md:w-44 md:h-40 lg:w-56 lg:h-52">
        <img
          src={imgUrls[0]}
          className="w-full h-full object-cover rounded-2xl"
          alt={title}
        />
      </div>
      <div className="flex flex-col flex-1 md:basis-96  p-2 md:p-6 justify-center">
        <p className="font-medium"> {address}</p>
        <h1>{title}</h1>
        <span className="text-green-500">$ {regularPrice}</span>
        <div className="flex flex-col md:flex-row md:items-center text-xs md:text-lg md:justify-around">
          <div className="flex mt-1    md:items-start items-center flex-1">
            <FaBed />
            <span className="text-xs md:mx-1">{bedrooms} BedRooms</span>
          </div>
          <div className="flex mt-1 md:items-start items-center flex-1">
            <FaBath />
            <span className="text-xs md:mx-1">{bathrooms} Bathrooms</span>
          </div>
          {currentUser && isOnProfile && currentUser?.uid === item.userRef && (
            <div className="flex my-1 justify-between md:flex-col md:space-y-3 flex-1">
              <Link to={"/edit-listing/" + id}>
                <FaPencilAlt className="text-orange-300" />
              </Link>
              <FaTrashAlt
                className="text-red-500"
                onClick={() => onDelete(id)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
