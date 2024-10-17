import { ChangeEvent, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const Shipping = () => {
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    pincode: "",
    state: "",
    country: "",
  });

  const changeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="shipping">
      <button id="back-button">{<BiArrowBack />}</button>
      <form>
        <h1>Shipping Address</h1>
        <input
          type="text"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={changeHandler}
          required
          name="address"
        />
        <input
          type="text"
          placeholder="City"
          value={shippingInfo.city}
          onChange={changeHandler}
          name="city"
          required
        />
        <input
          type="number"
          name="pincode"
          id=""
          placeholder="Pin Code"
          value={shippingInfo.pincode}
          onChange={changeHandler}
          required
        />
        <input
          name="state"
          type="text"
          placeholder="State"
          value={shippingInfo.state}
          onChange={changeHandler}
          required
        />
        <select
          value={shippingInfo.country}
          name="country"
          required
          onChange={changeHandler}
        >
          <option value="" selected disabled>
            Select Country
          </option>
          <option value="India">India</option>
        </select>
        <button>Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
