import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../Firebase";
import { useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/apiTypes";

const Login = () => {
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, provider);

      const res = await login({
        name: user.displayName!,
        email: user.email!,
        gender,
        photo: user.photoURL!,
        dob: date,
        role: "user",
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = error.data as MessageResponse;
        toast.error(message.message);
      }

      console.log(user);
    } catch (error) {
      toast.error("Sign in failed");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading"> Login </h1>
        <div>
          <label>Gender</label>
          <select
            name=""
            id=""
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Choose Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label> Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <p>Already have an account!</p>
          <button onClick={loginHandler}>
            <FcGoogle /> <span> Login with Google</span>{" "}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
