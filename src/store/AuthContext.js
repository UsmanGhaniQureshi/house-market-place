import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext({
  user: {},
  loading: true,
  userListings: [],
  onLogin: (credential) => {},
  onAdd: (id, data) => {},
  onRemove: (id) => {},
  onUpdate: (id, data) => {},
  onAddUser: (credential) => {},
  onSignOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userListings, setUserListings] = useState([]);
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const loginHandler = async (email, password) => {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.code);
    }
  };

  const signUpHandler = async (email, password, name) => {
    const auth = getAuth();
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      await setDoc(doc(db, "users", newUser.user.uid), {
        email,
        displayName: name,
        timestamp: serverTimestamp(),
      });

      navigate("/profile");
    } catch (error) {
      toast.error(error.code);
    }
  };

  const signOutHandler = () => {
    const auth = getAuth();
    auth.signOut();
    setUser(null);
  };

  const handleDelete = (id) => {
    setUserListings(userListings.filter((item) => item.id !== id));
  };

  const handleAdd = (id, data) => {
    setUserListings([
      ...userListings,
      {
        id,
        ...data,
      },
    ]);
  };

  const handleUpdate = (id, data) => {
    setUserListings(
      userListings.map((item) =>
        item.id === id
          ? {
              ...item,
              ...data,
            }
          : item
      )
    );
  };
  useEffect(() => {
    const auth = getAuth();
    if (isMounted) {
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          let data = [];
          setUser(currentUser);
          (async () => {
            const listingRef = collection(db, "listings");

            const q = query(
              listingRef,
              where("userRef", "==", currentUser.uid)
            );

            const querySnap = await getDocs(q);

            querySnap.forEach((doc) =>
              data.push({
                id: doc.id,
                ...doc.data(),
              })
            );
            setUserListings(data);
          })();
        } else {
          setUserListings([]);
        }
        setLoading(false);
      });
    }

    return () => (isMounted.current = false);
  }, [isMounted]);

  return (
    <AuthContext.Provider
      value={{
        user,
        userListings,
        loading,
        onLogin: loginHandler,
        onRemove: handleDelete,
        onAdd: handleAdd,
        onUpdate: handleUpdate,
        onAddUser: signUpHandler,
        onSignOut: signOutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
