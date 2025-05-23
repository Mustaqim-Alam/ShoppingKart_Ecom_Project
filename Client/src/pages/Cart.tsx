import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import { server } from "../redux/store";
import { cartReducerInitialState } from '../types/reducerTypes';
import { cartItem } from "../types/types";

// const cartItems = [
//   {
//     photo:
//       "https://images.unsplash.com/photo-1622428051717-dcd8412959de?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Bottle",
//     quantity: 800,
//     productId: "hvbhsadba",
//     price: 225,
//     stock: 33,
//   },
// ];
// const subtotal = 4000;
// const tax = Math.round(subtotal * 0.18);
// const discount = 400;
// const shippingCharge = 200;
// const total = subtotal + tax + shippingCharge - discount;

const Cart = () => {

  const { cartItems, subTotal, tax, total, discount, shippingCharge } = useSelector((state: { cartReducer: cartReducerInitialState }) => state.cartReducer)

  const [couponCode, setCouponCode] = useState<string>("");
  const [isCouponValid, setIsCouponValid] = useState<boolean>(false);
  useState<boolean>(false);

  const dispatch = useDispatch()

  const incrementeCartItemHandler = (cartItem: cartItem) => {
    if (cartItem.quantity >= cartItem.stock) return toast.error(" More Not Available ")
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }))
  };
  const decrementeCartItemHandler = (cartItem: cartItem) => {
    if (cartItem.quantity <= 1) return
    dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }))
  };
  const removeItemHandler = (productId: string) => {
    dispatch(removeCartItem(productId))
  }

  useEffect(() => {
    dispatch(calculatePrice())
  }, [cartItems, couponCode])


  useEffect(() => {
    const { token, cancel } = axios.CancelToken.source()
    const timeOutID = setTimeout(() => {
      axios.get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, { cancelToken: token })
        .then((res) => {
          dispatch(discountApplied(res.data.discount))
          console.log(res.data)
          dispatch(calculatePrice())
          setIsCouponValid(true)

        })
        .catch(() => {
          dispatch(discountApplied(0))
          dispatch(calculatePrice())
          setIsCouponValid(false)
        })

    }, 1000);

    return () => {
      clearTimeout(timeOutID);
      cancel()
      setIsCouponValid(false);
    };
  }, [couponCode]);

  return (
    <div className="cart">
      <main>
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItem
              incrementeCartItemHandler={incrementeCartItemHandler}
              decrementCartItemHandler={decrementeCartItemHandler}
              removeItrmHandler={removeItemHandler}
              key={idx}
              cartItem={i}
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
        <p>Subtotal: ₹{subTotal}</p>
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
