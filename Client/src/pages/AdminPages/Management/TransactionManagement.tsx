import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { orderItemType, orderType } from "../../../Types";

const img =
  "https://images.unsplash.com/photo-1622428051717-dcd8412959de?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const orderItems: orderItemType[] = [
  {
    name: "Bottle",
    photo: img,
    price: 545,
    quantity: 12,
    _id: "bdfkhbffhvfdsf",
  },
];

const TransactionManagement = () => {
  const [order, setOrder] = useState<orderType>({
    name: "Mohammad Zaid",
    address: "77 Black streat",
    city: "Yuganda",
    state: "Yuganda",
    country: "Nigeria",
    pinCode: 465454,
    status: "Processing",
    subTotal: 5200,
    discount: 1400,
    shippingCharge: 800,
    tax: 200,
    total: 5200 + 800 + 200 - 1400,
    orderItems,
    _id: "gdgfjshfg",
  });

  const {
    name,
    address,
    city,
    country,
    state,
    pinCode,
    status,
    subTotal,
    discount,
    shippingCharge,
    tax,
    total,
  } = order;

  const updateHandler = () => {
    setOrder((prev) => ({
      ...prev,
      status: prev.status === "Processing" ? "Shipped" : "Delivered",
    }));
  };

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="product-management">
        <section
          style={{
            padding: "2rem",
          }}
        >
          <h2>Order Items</h2>
          {order.orderItems.map((item) => (
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
          <p>Address : {`${address} ${city} ${state} ${country} ${pinCode}`}</p>
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
