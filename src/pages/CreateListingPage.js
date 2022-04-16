import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { addDoc, collection } from "firebase/firestore";
import {
  uploadBytesResumable,
  ref,
  getDownloadURL,
  getStorage,
} from "firebase/storage";
import { db } from "../firebase.config";
import useAuth from "../store/AuthContext";

import FormButton from "../components/FormButton";
import FormInputField from "../components/FormInputField";
import LoadingSpinner from "../components/LoadingSpinner";
import { uid } from "../utils/uid";
import useListing from "../store/ListingContext";

const CreateListingPage = () => {
  const { user, onAdd } = useAuth();
  const [loading, setLoading] = useState(false);

  const { onAddListing } = useListing();
  const navigate = useNavigate();

  const [type, setType] = useState("Rent");
  const [title, setTitle] = useState("");
  const [isFurnished, setIsFurnished] = useState("No");
  const [isParking, setIsParking] = useState("No");
  const [offer, setOffer] = useState("No");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [images, setImages] = useState({});
  const [address, setAddress] = useState("");
  const [discount, setDiscount] = useState(0);
  const [regularPrice, setRegularPrice] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (regularPrice < discount) {
      toast.error("Discount Must be Less or Equal to  Price");
      setLoading(false);
      return;
    }

    const storeImage = async (image) => {
      const storage = getStorage();
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, "images/" + image.name + "-" + uid());
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imageDownloadUrls = await Promise.all(
      [...images].map((img) => storeImage(img))
    ).catch(() => {
      setLoading(false);
      toast.error("Uploading Failed");
      return;
    });

    const formData = {
      type,
      title,
      furnished: isFurnished,
      parking: isParking,
      bedrooms: +bedrooms,
      bathrooms: +bathrooms,
      regularPrice: +regularPrice,
      offer,
      discountedPrice: +discount,
      address,
      userRef: user.uid,
      landlordEmail: user.email,
      imgUrls: imageDownloadUrls,
    };

    if (formData.offer === "No") {
      delete formData.discountedPrice;
    }

    // Adding Data to FileStore DB
    const newListing = await addDoc(collection(db, "listings"), formData);
    // Adding data to Local App State
    onAddListing(formData, newListing.id);
    //Add data to User
    onAdd(newListing.id, formData);
    setLoading(false);

    navigate("/listing/" + newListing.id);
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  if (loading)
    return (
      <div className="absolute w-screen h-screen  z-50">
        <LoadingSpinner />
      </div>
    );
  return (
    <form
      onSubmit={submitHandler}
      className={"w-96 px-3 py-5 font-bold space-y-3"}
    >
      <div className="flex flex-col ">
        <label>Sell/Rent</label>
        <div className="flex space-x-2">
          <FormButton
            btnState={type}
            btnText="Rent"
            btnOnClick={() => setType("Rent")}
          />
          <FormButton
            btnState={type}
            btnText="Sell"
            btnOnClick={() => setType("Sell")}
          />
        </div>
      </div>

      <FormInputField
        containerClasses="flex  flex-col"
        inputClasses="rounded-2xl w-full px-2 py-3 outline-none"
        lableText="Title"
        inputValue={title}
        onChangeInput={(e) => setTitle(e.target.value)}
      />

      <div className="flex justify-between space-x-2">
        <FormInputField
          inputType="number"
          containerClasses="flex flex-col"
          labelClasses="text-center"
          lableText="BathRooms"
          inputClasses="rounded-2xl w-full px-2 py-3 outline-none"
          inputValue={bathrooms > 1 ? bathrooms : 1}
          onChangeInput={(e) => setBathrooms(e.target.value)}
        />
        <FormInputField
          inputType="number"
          labelClasses="text-center"
          containerClasses="flex flex-col"
          inputClasses="rounded-2xl w-full px-2 py-3 outline-none"
          lableText="BedRooms"
          inputValue={bedrooms > 1 ? bedrooms : 1}
          onChangeInput={(e) => setBedrooms(e.target.value)}
        />
      </div>
      <div className="flex flex-col ">
        <label>Furnished</label>
        <div className="flex space-x-2">
          <FormButton
            btnText="Yes"
            btnState={isFurnished}
            btnOnClick={() => setIsFurnished("Yes")}
          />
          <FormButton
            btnText="No"
            btnState={isFurnished}
            btnOnClick={() => setIsFurnished("No")}
          />
        </div>
      </div>
      <div className="flex flex-col ">
        <label>Parking Slot</label>
        <div className="flex space-x-2">
          <FormButton
            btnText="Yes"
            btnState={isParking}
            btnOnClick={() => setIsParking("Yes")}
          />
          <FormButton
            btnText="No"
            btnState={isParking}
            btnOnClick={() => setIsParking("No")}
          />
        </div>
      </div>
      <FormInputField
        containerClasses="flex flex-col"
        inputClasses="rounded-2xl px-2 py-3 outline-none"
        inputType="number"
        lableText="Reugular Price"
        inputValue={regularPrice}
        onChangeInput={(e) => setRegularPrice(e.target.value)}
      />
      <div className="flex flex-col ">
        <label>Offer</label>
        <div className="flex space-x-2">
          <FormButton
            btnText="Yes"
            btnState={offer}
            btnOnClick={() => setOffer("Yes")}
          />
          <FormButton
            btnText="No"
            btnState={offer}
            btnOnClick={() => setOffer("No")}
          />
        </div>
      </div>

      {offer === "Yes" && (
        <FormInputField
          containerClasses="flex flex-col"
          inputType="number"
          inputClasses="rounded-2xl px-2 py-3 outline-none"
          lableText="Discounted Price"
          inputValue={discount}
          onChangeInput={(e) => setDiscount(e.target.value)}
        />
      )}
      <div className="flex flex-col ">
        <label>Address</label>
        <textarea
          rows={3}
          onChange={(e) => setAddress(e.target.value)}
          className="outline-none rounded-3xl resize-none p-4 box-border"
        />
      </div>
      <div>
        <input
          type="file"
          className="file:bg-green-500 file:rounded-lg file:px-4 file:text-white file:font-bold   file:py-2 file:border-none"
          onChange={handleFileChange}
          multiple
        />
      </div>
      <button
        className="text-white bg-slate-900 px-5 py-2 rounded-2xl border-none"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

export default CreateListingPage;
