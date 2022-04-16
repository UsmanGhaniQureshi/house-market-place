import { collection, getDocs, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase.config";

const ListingContext = createContext({
  isListingLoaded: false,
  listing: [],
  sales: [],
  rents: [],
  offers: [],
  onAddListing: (item) => {},
  onUpdateListing: (item) => {},
});

export const ListingContextProvider = ({ children }) => {
  const [listing, setListing] = useState();
  const [isListingLoaded, setIsLoadedListing] = useState(false);

  useEffect(() => {
    (async () => {
      const q = query(collection(db, "listings"));
      const listingDoc = await getDocs(q);

      const data = [];
      listingDoc.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setListing(data);
      setIsLoadedListing(true);
    })();
  }, []);

  const addListing = (item, id) => {
    setListing([
      ...listing,
      {
        id,
        ...item,
      },
    ]);
  };

  const updateListing = (id, data) => {
    setListing(
      listing.map((item) =>
        item.id === id
          ? {
              ...item,
              ...data,
            }
          : item
      )
    );
  };

  const removeListing = (id) => {
    setListing(listing.filter((item) => item.id !== id));
  };
  return (
    <ListingContext.Provider
      value={{
        listing,
        isListingLoaded,
        sales: listing?.filter((item) => item.type === "Sell"),
        rents: listing?.filter((item) => item.type === "Rent"),
        offers: listing?.filter((item) => item.offer === "Yes"),
        onAddListing: addListing,
        onUpdateListing: updateListing,
        onRemoveListing: removeListing,
      }}
    >
      {children}
    </ListingContext.Provider>
  );
};

const useListing = () => {
  return useContext(ListingContext);
};

export default useListing;
