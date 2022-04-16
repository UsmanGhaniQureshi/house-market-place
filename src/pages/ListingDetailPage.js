import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ListingDetailItem from "../components/ListingDetailItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { db } from "../firebase.config";

const ListingDetailPage = () => {
  const [listingItem, setListingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const { listingId } = useParams();

  useEffect(() => {
    (async () => {
      const result = await getDoc(doc(db, "listings", listingId));

      if (result.exists()) {
        setListingItem(result.data());
      }
      setLoading(false);
    })();
  }, [listingId]);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      {listingItem ? <ListingDetailItem item={listingItem} /> : "No Item Found"}
    </>
  );
};

export default ListingDetailPage;
