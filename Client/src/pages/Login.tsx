import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../Firebase";

const Login = () => {
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const { user } = await signInWithPopup(auth, provider);

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
