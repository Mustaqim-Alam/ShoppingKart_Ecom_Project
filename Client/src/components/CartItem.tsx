import { FaTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { server } from "../redux/store";

type cartitems = {
  photo: string;
  name: string;
  quantity: number;
  productId: string;
  price: number;
  stock: number;
  cartItem: any;
};

const CartItem = ({ photo, name, quantity, productId, price }: cartitems) => {
  return (
    <div className="cart-item">
      <img src={`${server}/${photo}`} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div>
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>
      <button>
        <FaTrashCan />
      </button>
    </div>
  );
};

export default CartItem;
