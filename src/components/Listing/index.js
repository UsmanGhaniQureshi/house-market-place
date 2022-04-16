import { Link } from "react-router-dom";
import Card from "../Card";

const Listing = ({ items, onDelete, isOnProfile }) => {
  return (
    <>
      {items.map((offer, index) =>
        !isOnProfile ? (
          <Link to={`/listing/${offer.id}`}>
            <Card
              key={index}
              item={offer}
              isOnProfile={isOnProfile}
              onDelete={onDelete}
            />
          </Link>
        ) : (
          <Card
            key={index}
            item={offer}
            isOnProfile={isOnProfile}
            onDelete={onDelete}
          />
        )
      )}
    </>
  );
};

export default Listing;
