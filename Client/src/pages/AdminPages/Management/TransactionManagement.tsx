import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { Skeleton } from "../../../components/Loader";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../../redux/api/orderAPI";
import { useUpdateProductMutation } from "../../../redux/api/productAPI";
import { orderItemType } from "../../../Types";
import { userReducerInitialState } from "../../../types/reducerTypes";
import { order } from '../../../types/types';
import { resToast } from "../../../../Utils/features";
import { FaTrash } from "react-icons/fa";

const defaultData: order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  },
  status: "",
  subTotal: 0,
  discount: 0,
  shippingCharge: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};

const TransactionManagement = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { user } = useSelector((state: { userReducer: userReducerInitialState }) => state.userReducer);

  const { data, isError, isLoading } = useOrderDetailsQuery(params.id!);

  const [updateOrder] = useUpdateOrderMutation()
  const [deleteOrder] = useDeleteOrderMutation()

  const {
    shippingInfo: { address, city, state, country, pincode },
    orderItems,
    user: { name },
    subTotal,
    total,
    discount,
    tax,
    status,
    shippingCharge,
  } = data?.order || defaultData;

  const updateHandler = async () => {
    const res = await updateOrder({
      userId: user?._id!,
      orderId: data?.order._id!,
    });
    resToast(res, navigate, "/admin/transaction");
  };

  const deleteHandler = async () => {
    const res = await deleteOrder({
      userId: user?._id!,
      orderId: data?.order._id!
    })
    resToast(res, navigate, "/admin/transaction")
  };

  if (isError) {
    toast.error("Order Not Found");
    return <Navigate to="/404" />;
  }

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="product-management">
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <>
            <section style={{ padding: "2rem" }}>
              <h2>Order Items</h2>
              {orderItems?.map((item) => (
                <ProductCard
                  key={item._id}
                  name={item.name}
                  photo={item.photo}
                  price={item.price}
                  _id={item._id}
                  quantity={item.quantity}
                />
              ))}
            </section>

            <article className="shipping-info-card">
              <button className="product-delete-btn" onClick={deleteHandler}>
                <FaTrash/>
              </button>
              <h2>Order Info</h2>
              <h5>User Info</h5>
              <p>Name: {name}</p>
              <p>Address: {`${address} ${city} ${state} ${country} ${pincode}`}</p>

              <h5>Amount Info</h5>
              <p>Subtotal: ${subTotal}</p>
              <p>Discount: ${discount}</p>
              <p>Shipping Charge: ${shippingCharge}</p>
              <p>Tax: ${tax}</p>
              <p>Total: ${total}</p>

              <h5>Status Info</h5>
              <p>
                Status:{" "}
                <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                        ? "green"
                        : "red"
                  }
                >
                  {status}
                </span>
              </p>
              <button onClick={updateHandler}>Process Status</button>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

const ProductCard = ({ name, photo, price, quantity, _id }: orderItemType) => (
  <div className="transaction-product-card">
    <img src={photo} alt="Product Image" />
    <Link to={`/product/${_id}`}>{name}</Link>
    <span>
      ${price} x {quantity} = ${price * quantity}
    </span>
  </div>
);

export default TransactionManagement;
