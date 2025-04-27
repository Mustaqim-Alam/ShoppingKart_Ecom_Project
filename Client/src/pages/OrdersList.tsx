import { Column } from "react-table";
import TableHOC from "../components/AdminComponents/TableHOC";
import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userReducerInitialState } from "../types/reducerTypes";
import { useAllOrderQuery } from "../redux/api/orderAPI";
import { CustomError } from "../types/apiTypes";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];
// const id = "bhvfds";



const OrdersList = () => {

  const { user } = useSelector((state: { userReducer: userReducerInitialState }) => state.userReducer);
  const { data, error, isError, isLoading } = useAllOrderQuery(user._id!);

  const [rows, setRows] = useState<DataType[]>([
    // {
    //   _id: "hdsfbvhds",
    //   amount: 54541,
    //   quantity: 45,
    //   discount: 56,
    //   status: <span>Processing</span>,
    //   action: <Link to={`/order/${id}`}>view</Link>,
    // },
  ])


  if (isError) {
    const err = error as CustomError
    toast.error(err.data.message)
  }



  useEffect(() => {
    if (data?.orders) {
      setRows(
        data.orders.map((product) => ({
          _id: product._id,
          user: product.user?.name || "Unknown",
          amount: product.total,
          discount: product.discount,
          quantity: product.orderItem ? product.orderItem.length : 0,
          status: (
            <span
              className={
                product.status === "processing"
                  ? "red"
                  : product.status === "shipped"
                    ? "green"
                    : "purple"
              }
            >
              {product.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${product._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data, isError]);


  ;
  const table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders"
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading ? <Skeleton length={20} /> : table}
    </div>
  );
};

export default OrdersList;
