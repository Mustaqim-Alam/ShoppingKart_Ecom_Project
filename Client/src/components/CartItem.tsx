import { FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { server } from "../redux/store";
import { cartItem } from '../types/types';

type cartItemProps = {
  cartItem: cartItem
  incrementeCartItemHandler: (cartItem: cartItem) => void
  decrementCartItemHandler: (cartItem: cartItem) => void
  removeItrmHandler: (id: string) => void
};

const CartItem = ({ cartItem, incrementeCartItemHandler, decrementCartItemHandler, removeItrmHandler }: cartItemProps) => {
  const { photo, name, quantity, productId, price } = cartItem

  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button onClick={() => decrementCartItemHandler(cartItem)}>-</button>
        <p>{quantity}</p>
        <button onClick={() => incrementeCartItemHandler(cartItem)} >+</button>
      </div>
      <button onClick={() => removeItrmHandler(productId)}>
        <FaTrashCan />
      </button>
    </div>
  );
};

export default CartItem;
