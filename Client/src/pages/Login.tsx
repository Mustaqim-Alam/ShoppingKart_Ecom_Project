import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("");

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
          <button>
            {" "}
            <FcGoogle /> <span> Login with Google</span>{" "}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
