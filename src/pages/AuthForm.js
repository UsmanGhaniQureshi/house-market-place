import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { FaUser, FaLock, FaAddressCard } from "react-icons/fa";
import InputField from "../components/InputField";
import useAuth from "../store/AuthContext";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import LoadingSpinner from "../components/LoadingSpinner";

const AuthForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setisLoginMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { user, loading, onAddUser, onLogin } = useAuth();

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

  if (loading) return <LoadingSpinner />;
  else if (!loading && user) return <Navigate to="/profile" />;
  else
    return (
      <div className="md:w-3/4 mx-auto p-4 space-y-5">
        <h1 className="text-xl font-bold text-center md:text-3xl ">
          {isLoginMode ? "Login" : "Register"}
        </h1>
        <form
          className="flex flex-col md:p-4 w-full md:w-3/4 mx-auto"
          onSubmit={submitHandler}
        >
          {!isLoginMode && (
            <InputField
              required
              name="Name"
              type="text"
              value={userName}
              onChange={onChangeUserName}
            >
              <FaAddressCard />
            </InputField>
          )}

          <InputField
            required
            name="Email"
            type="email"
            value={email}
            onChange={onChangeEmail}
          >
            <FaUser />
          </InputField>
          <InputField
            name="Password"
            required
            value={password}
            onChange={onChangePassword}
            isPassword={true}
            onClick={() => setShowPassword(!showPassword)}
            type={showPassword ? "text" : "password"}
          >
            <FaLock />
          </InputField>
          <div className="flex justify-between items-center md:px-4">
            <button
              className="bg-slate-900 text-white px-8 py-2  md:py-4 text-xs md:text-sm font-bold rounded-full"
              type="submit"
            >
              {isLoginMode ? " Login" : " Register"}
            </button>
            {isLoginMode && (
              <Link to={"/forget-password"} className=" text-red-600 font-bold">
                Forget Password
              </Link>
            )}
          </div>
        </form>
        <div className="flex flex-col gap-3 justify-center items-center">
          <button
            className="bg-slate-700  text-sm md:text-base  w-3/4 px-4  md:w-80 font-bold  py-3 text-white rounded-2xl"
            onClick={() => setisLoginMode(!isLoginMode)}
          >
            Click Here to {!isLoginMode ? " Login" : " Register"}
          </button>
          <button
            type="button"
            className="flex items-center justify-center w-3/4 md:w-80  text-xs md:text-base md:px-2 py-2 md:py-4 bg-white rounded-2xl"
            onClick={signUpGoogleHandler}
          >
            <img
              src="/assets/images/google-logo.png"
              className="w-8 h-8 mx-2"
            />
            <strong>Click Here to Sign in With Google</strong>
          </button>
        </div>
      </div>
    );
};

export default AuthForm;
