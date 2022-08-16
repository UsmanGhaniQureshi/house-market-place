import { Link } from "react-router-dom";
import Card from "../Card";

const Listing = ({ items, onDelete, isOnProfile }) => {
  return (
    <div className="max-w-4xl mx-auto">
      {items.map((item, index) =>
        !isOnProfile ? (
          <Link key={index} to={`/listing/${item.id}`}>
            <Card item={item} isOnProfile={isOnProfile} onDelete={onDelete} />
          </Link>
        ) : (
          <Card
            key={index}
            item={item}
            isOnProfile={isOnProfile}
            onDelete={onDelete}
          />
        )
      )}
    </div>
  );
};

export default Listing;
