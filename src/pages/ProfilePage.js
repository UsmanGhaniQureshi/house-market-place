import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getAuth, updateProfile } from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import useAuth from "../store/AuthContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import useListing from "../store/ListingContext";
import Listing from "../components/Listing";

const ProfilePage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user, userListings, onRemove, onSignOut } = useAuth();
  const { onRemoveListing } = useListing();

  const [isOnEdit, setIsOnEdit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(user.displayName);

  const editHandler = () => {
    setUserName(userName);
    setIsOnEdit(!isOnEdit);
  };

  const logoutHandler = () => {
    onSignOut();
    navigate("/auth");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    await updateProfile(auth.currentUser, {
      displayName: userName,
    });

    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      displayName: userName,
    });
  };

  const handleDelete = async (id) => {
    setLoading(true);

    // Deleting From FireStore
    await deleteDoc(doc(db, "listings", id));
    // Deleting From App State
    onRemoveListing(id);
    //Deleting from the State of User Listings
    onRemove(id);
    setLoading(false);
    toast.success("Deleted SuccessFully");
  };

  if (loading) return <LoadingSpinner />;
  return (
    <div className="p-3 md:p-4">
      <form className="flex-1 space-y-3" onSubmit={submitHandler}>
        <div className="flex justify-between">
          <h2 className="font-bold md:font-extrabold">My Profile</h2>
          <button
            onClick={logoutHandler}
            className="bg-green-400 border-none px-3 py-2 text-white  font-sans duration-200 transition-all rounded-3xl hover:bg-green-600 "
          >
            Logout
          </button>
        </div>
        <div className="flex justify-between">
          <header>Personal Details</header>
          <button
            className={
              isOnEdit
                ? "btn btn-sm  btn-success border-none rounded-3xl"
                : "btn btn-sm btn-accent border-none rounded-3xl"
            }
            type="submit"
            onClick={editHandler}
          >
            {isOnEdit ? "Done" : "Change"}
          </button>
        </div>
        <div className="flex flex-col p-3 md:p-6 mt-6 bg-slate-50 rounded-3xl">
          {isOnEdit && (
            <input
              type="text"
              value={userName}
              className={
                "w-full rounded-lg px-3 mt-2 bg-slate-400 text-white outline-none input-sm"
              }
              onChange={(e) => setUserName(e.target.value)}
            />
          )}

          {!isOnEdit && <p className="mt-2">{userName}</p>}
          <p
            className={
              isOnEdit ? "px-3 mt-2 text-sm font-bold rounded-lg bg-slate-400 text-white" : ""
            }
          >
            {user.email}
          </p>
        </div>
      </form>
      <div className="mt-4">
        <Link
          className="bg-green-500  px-3 text-white font-bold py-2 border-none rounded-3xl "
          to="/create-listing"
        >
          Create Listing
        </Link>
        <div className="mt-3">
          <Listing
            items={userListings}
            isOnProfile={true}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
