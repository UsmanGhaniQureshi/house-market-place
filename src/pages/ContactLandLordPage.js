import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { db } from "../firebase.config";

const ContactLandLordPage = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [landlord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", uid);
      const user = await getDoc(docRef);
      if (user.exists()) {
        setLandLord(user.data());
      } else {
        toast.error("InValid Action");
      }
      setLoading(false);
    })();
  }, [uid]);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-2xl font-bold">Contact LandLord :</h1>
      <textarea
        className="resize-none outline-none rounded-2xl p-4"
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your Message"
      />

      <a
        className="btn btn-primary w-52 rounded-2xl"
        href={`mailto:${landlord.email}?subject=${searchParams.get(
          "listingName"
        )}&body=${message}`}
      >
        Send
      </a>
    </div>
  );
};

export default ContactLandLordPage;
