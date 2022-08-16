import Listing from "../components/Listing";
import LoadingSpinner from "../components/LoadingSpinner";
import useListing from "../store/ListingContext";

const OffersPage = () => {
  const { isListingLoaded, offers } = useListing();

  if (!isListingLoaded) return <LoadingSpinner />;
  return (
    <div className="md:w-4/5 rounded-3xl m-2 md:mx-auto">
      <h1 className="md:text-4xl font-bold">Offers</h1>
      <Listing items={offers} isOnProfile={false} />
    </div>
  );
};

export default OffersPage;
