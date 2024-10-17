import { FormEvent, useEffect, useState } from "react";
import Sidebar from "../../../components/AdminComponents/Sidebar";

const allLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumber = "0123456789";
const allSymbol = "!@#$%^&*()_+";

const Coupon = () => {
  const [size, setSize] = useState<number>(8);
  const [prefix, setPrefix] = useState<string>("");
  const [isCharInclude, setisCharInclude] = useState<boolean>(false);
  const [isNumInclude, setisNumInclude] = useState<boolean>(false);
  const [isSymbollInclude, setIsSymbollInclude] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [coupon, setIsCoupon] = useState<string>("");
  const [userError, setuserError] = useState<string>("");

  let copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isCharInclude && !isNumInclude && !isSymbollInclude) {
      setuserError(
        "Please include at least one option (Characters, Numbers, or Symbols)."
      );
      return;
    }

    let result: string = prefix || "";
    let loopLength: number = size - result.length;

    for (let index = 0; index < loopLength; index++) {
      let entireString: string = "";
      if (isCharInclude) entireString += allLetter;
      if (isNumInclude) entireString += allNumber;
      if (isSymbollInclude) entireString += allSymbol;

      let randomNum: number = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }
    setIsCoupon(result);
    setuserError("");
  };
  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="dashboard-app-container">
        <h1>Coupon</h1>
        <section>
          <form className="coupon-form" onSubmit={submitHandler}>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              maxLength={25}
              placeholder="Text to include "
            />
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              maxLength={25}
              minLength={8}
              placeholder="Code Size "
            />

            <fieldset>
              <legend>Include</legend>
              <input
                type="checkbox"
                checked={isNumInclude}
                onChange={() => setisNumInclude((prev) => !prev)}
              />
              <span>Numbers</span>
              <input
                type="checkbox"
                checked={isCharInclude}
                onChange={() => setisCharInclude((prev) => !prev)}
              />
              <span>Charecters</span>
              <input
                type="checkbox"
                checked={isSymbollInclude}
                onChange={() => setIsSymbollInclude((prev) => !prev)}
              />
              <span>Symboll</span>
            </fieldset>
            <button type="submit">Generate</button>
            <p
              style={{
                fontSize: "1rem",
                color: "red",
                width: "100%",
              }}
            >
              {userError}
            </p>
          </form>
          {coupon && (
            <code onClick={() => copyText(coupon)}>
              {coupon} <span>{isCopied ? "Copied" : "Copy"}</span>
            </code>
          )}
        </section>
      </main>
    </div>
  );
};

export default Coupon;
