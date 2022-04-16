import Listing from "../components/Listing";
import LoadingSpinner from "../components/LoadingSpinner";
import useListing from "../store/ListingContext";

const SalePlaces = () => {
  const { isListingLoaded, sales } = useListing();
  if (!isListingLoaded) return <LoadingSpinner />;
  return (
    <div className=" w-full md:w-4/5 bg-white rounded-3xl p-2 md:mx-auto">
      <h1 className="text-4xl font-bold mx-6 my-6">Places For Sale</h1>
      <Listing items={sales} />
    </div>
  );
};

export default SalePlaces;
