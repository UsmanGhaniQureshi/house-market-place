import { FaCompass, FaUser, FaTag } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex text-xs font-bold justify-around">
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive
            ? "flex items-center text-slate-900 transition-all p-4 flex-col hover:bg-slate-300"
            : "flex items-center text-slate-400 transition-all p-4 flex-col hover:bg-slate-300"
        }
      >
        <div>
          <FaCompass className="text-2xl  md:text-4xl " />
        </div>
        <h1 className="mt-1">Explore</h1>
      </NavLink>
      <NavLink
        to="/offers"
        className={({ isActive }) =>
          isActive
            ? "flex items-center text-slate-900 transition-all p-4 flex-col hover:bg-slate-300"
            : "flex items-center text-slate-400 transition-all p-4 flex-col hover:bg-slate-300"
        }
      >
        <div>
          <FaTag className="text-2xl  md:text-4xl" />
        </div>
        <h1 className="mt-1">Offers</h1>
      </NavLink>
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          isActive
            ? "flex items-center text-slate-900 transition-all p-4 flex-col hover:bg-slate-300"
            : "flex items-center text-slate-400 transition-all p-4 flex-col hover:bg-slate-300"
        }
      >
        <div>
          <FaUser className="text-2xl  md:text-4xl" />
        </div>
        <h1 className="mt-1">Profile</h1>
      </NavLink>
    </div>
  );
};

export default Footer;
