import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaUser, FaLock, FaAddressCard } from "react-icons/fa";
import InputField from "../components/InputField";
import useAuth from "../store/AuthContext";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const AuthForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setisLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { onAddUser, onLogin } = useAuth();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeUserName = (e) => {
    setUserName(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (isLoginMode) onLogin(email, password);
    else {
      onAddUser(email, password, userName);
      toast.success("User Created SuccessFully");
    }
  };

  const signUpGoogleHandler = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        try {
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            displayName: user.displayName,
            timestamp: serverTimestamp(),
          });
        } catch (error) {
          toast.error(error.code);
        }
      }
    } catch (error) {
      if (error && error.code === "auth/internal-error")
        toast.error("Internet Not Connected");
    }

    navigate("/profile");
  };

  return (
    <>
      <form className="flex flex-col p-4" onSubmit={submitHandler}>
        {!isLoginMode && (
          <InputField
            name="Name"
            type="text"
            value={userName}
            onChange={onChangeUserName}
          >
            <FaAddressCard />
          </InputField>
        )}

        <InputField
          name="Email"
          type="email"
          value={email}
          onChange={onChangeEmail}
        >
          <FaUser />
        </InputField>
        <InputField
          name="Password"
          value={password}
          onChange={onChangePassword}
          isPassword={true}
          onClick={() => setShowPassword(!showPassword)}
          type={showPassword ? "text" : "password"}
        >
          <FaLock />
        </InputField>

        {isLoginMode && (
          <Link
            to={"/forget-password"}
            className="self-end text-red-600 font-bold"
          >
            Forget Password
          </Link>
        )}
        <button className="self-start mx-4 btn btn-secondary" type="submit">
          {isLoginMode ? " Login" : " Register"}
        </button>
      </form>
      <div className="flex flex-col items-center">
        <button
          className="btn btn-ghost"
          onClick={() => setisLoginMode(!isLoginMode)}
        >
          Click Here to {!isLoginMode ? " Login" : " Register"}
        </button>
        <button
          type="button"
          className="flex items-center  w-80 px-2 py-4 bg-white rounded-2xl"
          onClick={signUpGoogleHandler}
        >
          <img src="/assets/images/google-logo.png" className="w-8 h-8 mx-2" />
          <strong>Click Here to Sign in With Google</strong>
        </button>
      </div>
    </>
  );
};

export default AuthForm;
