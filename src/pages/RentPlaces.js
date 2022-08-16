import Listing from "../components/Listing";
import LoadingSpinner from "../components/LoadingSpinner";
import useListing from "../store/ListingContext";
const RentPlaces = () => {
  const { rents, isListingLoaded } = useListing();

  if (!isListingLoaded) return <LoadingSpinner />;
  return (
    <div className=" w-full md:w-4/5 bg-white rounded-3xl p-2 md:mx-auto">
      <h1 className="text-lg md:text-4xl font-bold mx-6 my-6">
        Places For Rent
      </h1>
      <Listing items={rents} />
    </div>
  );
};

export default RentPlaces;
