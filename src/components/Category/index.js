import { Link } from "react-router-dom";

const Category = ({ imageUrl, title, linkUrl }) => {
  return (
    <Link className="flex flex-col flex-1 mx-2" to={linkUrl}>
      <img
        src={imageUrl}
        className="w-full h-28 md:h-40 object-cover rounded-3xl"
        alt={title}
      />
      <h6 className="font-bold mt-2">{title}</h6>
    </Link>
  );
};

export default Category;
