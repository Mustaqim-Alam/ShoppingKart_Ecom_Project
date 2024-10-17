import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const cartItems = [
  {
    photo:
      "https://images.unsplash.com/photo-1622428051717-dcd8412959de?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Bottle",
    quantity: 800,
    productId: "hvbhsadba",
    price: 225,
    stock: 33,
  },
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const discount = 400;
const shippingCharge = 200;
const total = subtotal + tax + shippingCharge - discount;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isCouponValid, setIsCouponValid] = useState<boolean>(false);

  useEffect(() => {
    const timeOutID = setTimeout(() => {
      if (Math.random() > 0.5) setIsCouponValid(true);
      else setIsCouponValid(false);
    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      setIsCouponValid(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((index) => (
            <CartItem
              key={index.productId}
              photo={index.photo}
              name={index.name}
              productId={index.productId}
              price={index.price}
              quantity={index.quantity}
              stock={90}
              cartItem={3}
            />
          ))
        ) : (
          <div className="nothing-into-cart">
            <h1>Let's add something in cart . . . .</h1>
            <p>Nothing is added to the cart!</p>
          </div>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Tax: ₹{tax}</p>
        <p>Shipping Charge: ₹{shippingCharge}</p>
        <p>
          {" "}
          Discount: <em className="red">-₹{discount}</em>
        </p>
        <p>
          <b> Total: ₹{total}</b>
        </p>
        <input
          type="text"
          placeholder="Coupon code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isCouponValid ? (
            <span className="green">
              -₹{discount} off using <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
        {cartItems.length > 0 && <Link to="/shipping">Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
