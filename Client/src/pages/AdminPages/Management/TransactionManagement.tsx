import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { useOrderDetailsQuery } from "../../../redux/api/orderAPI";
import { orderItemType } from "../../../Types";
import { userReducerInitialState } from "../../../types/reducerTypes";
import { order } from '../../../types/types';
import { Skeleton } from "../../../components/Loader";
import toast from "react-hot-toast";


// const orderItems: orderItemType[] = [
//   {
//     name: "Bottle",
//     photo: img,
//     price: 545,
//     quantity: 12,
//     _id: "bdfkhbffhvfdsf",
//   },
// ];

const defaultData: order = {
  shippingInfo: {

    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  },
  _id: "",
  status: "",
  subTotal: 0,
  discount: 0,
  shippingCharge: 0,
  tax: 0,
  total: 0,
  orderItem: [],
  user: { _id: "", name: "" }
}

const TransactionManagement = () => {

  const params = useParams();
  const navigate = useNavigate();


  console.log(params.id);


  const { user } = useSelector((state: { userReducer: userReducerInitialState }) => state.userReducer);
  const { data, error, isError, isLoading } = useOrderDetailsQuery(params._id!);

console.log(data?.order.orderItem);


  const {
    shippingInfo: {

      address,
      city,
      state,
      country,
      pincode
    },
    orderItem,
    user: { name },
    subTotal,
    total,
    discount,
    tax,
    status,
    shippingCharge
  } = data?.order || defaultData

  // const [order, setOrder] = useState({});

  // const {
  //   name,
  //   address,
  //   city,
  //   country,
  //   state,
  //   pinCode,
  //   status,
  //   subTotal,
  //   discount,
  //   shippingCharge,
  //   tax,
  //   total,
  // } = order;

  // const updateHandler = () => {
  //   setOrder((prev) => ({
  //     ...prev,
  //     status: prev.status === "Processing" ? "Shipped" : "Delivered",
  //   }));
  // };

  const updateHandler = () => { }
  const deleteHandler = () => { }


  if (isError) return toast() //<Navigate to="/404" />

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="product-management">
        {isLoading ? <Skeleton length={20} /> : <>
          <section
            style={{
              padding: "2rem",
            }}
          >
            <h2>Order Items</h2>
            {orderItem.map((item) => (
              <ProductCard
                name={item.name}
                photo={item.photo}
                price={item.price}
                _id={item._id}
                quantity={item.quantity}
              />
            ))}
          </section>
          <article className="shipping-info-card">
            <h2>Order Info</h2>
            <h5>User Info</h5>
            <p>Name : {`${name}`}</p>
            <p>Address : {`${address} ${city} ${state} ${country} ${pincode}`}</p>
            <h5>Amount Info</h5>
            <p>Subtotal : {`${subTotal}`}</p>
            <p>Discount : {`${discount}`}</p>
            <p>Shipping Charge : {`${shippingCharge}`}</p>
            <p>Tax : {`${tax}`}</p>
            <p>Total : {`${total}`}</p>
            <h5>Status Info</h5>
            <p>
              Status :{" "}
              <span
                className={
                  status === "Delivered"
                    ? "purple"
                    : status === "Shipped"
                      ? "green"
                      : "red"
                }
              >{`${status}`}</span>
            </p>
            <button onClick={updateHandler}>Process Status</button>
          </article></>}
        <section
          style={{
            padding: "2rem",
          }}
        >
          <h2>Order Items</h2>
          {orderItem.map((item) => (
            <ProductCard
              name={item.name}
              photo={item.photo}
              price={item.price}
              _id={item._id}
              quantity={item.quantity}
            />
          ))}
        </section>
        <article className="shipping-info-card">
          <h2>Order Info</h2>
          <h5>User Info</h5>
          <p>Name : {`${name}`}</p>
          <p>Address : {`${address} ${city} ${state} ${country} ${pincode}`}</p>
          <h5>Amount Info</h5>
          <p>Subtotal : {`${subTotal}`}</p>
          <p>Discount : {`${discount}`}</p>
          <p>Shipping Charge : {`${shippingCharge}`}</p>
          <p>Tax : {`${tax}`}</p>
          <p>Total : {`${total}`}</p>
          <h5>Status Info</h5>
          <p>
            Status :{" "}
            <span
              className={
                status === "Delivered"
                  ? "purple"
                  : status === "Shipped"
                    ? "green"
                    : "red"
              }
            >{`${status}`}</span>
          </p>
          <button onClick={updateHandler}>Process Status</button>
        </article>
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: orderItemType) => (
  <div className="transaction-product-card">
    <img src={photo} alt="Product Image" />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span>
      ${price} X {quantity} = ${price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
