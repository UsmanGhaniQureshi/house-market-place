import { async } from "@firebase/util";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import InputField from "../components/InputField";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("A Link Has been sent to your Email Address");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="flex w-96 flex-col p-4 md:mx-auto"
      onSubmit={submitHandler}
    >
      <h2 className="font-bold">Enter Your Email</h2>
      <InputField name="email" value={email} onChange={onChangeEmail}>
        <FaLock />
      </InputField>

      <button className="text-green-600 font-bold" type="submit">
        Sent Request
      </button>
    </form>
  );
};

export default ForgetPassword;
