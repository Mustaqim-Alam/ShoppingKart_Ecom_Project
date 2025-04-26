import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import Sidebar from "../../components/AdminComponents/Sidebar";
import TableHOC from "../../components/AdminComponents/TableHOC";
import { Skeleton } from "../../components/Loader";
import { useAllOrderQuery } from "../../redux/api/orderAPI";
import { CustomError } from "../../types/apiTypes";
import { userReducerInitialState } from "../../types/reducerTypes";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "User",
    accessor: "user",
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
    Header: "Quantity",
    accessor: "quantity",
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

const arr: DataType[] = [
  {
    user: "Shadab Ahmad",
    amount: 1234,
    discount: 23,
    quantity: 323,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transaction/njabdfjb">Manage </Link>,
  },
  {
    user: "Mohammmad Zaid",
    amount: 1534,
    discount: 39,
    quantity: 63,
    status: <span className="green">Shipped</span>,
    action: <Link to="/admin/transaction/fgdffd">Manage </Link>,
  },
  {
    user: "Anas Alam",
    amount: 4753,
    discount: 87,
    quantity: 43,
    status: <span className="purple">Delivered</span>,
    action: <Link to="/admin/transaction/ffgvfdf">Manage </Link>,
  },
];

const Transaction = () => {
  // const [data] = useState<DataType[]>(arr);

  const [rows, setRows] = useState<DataType[]>([])

  const { user } = useSelector((state: { userReducer: userReducerInitialState }) => state.userReducer);
  const { data, error, isError, isLoading } = useAllOrderQuery(user?._id!);


  if (isError) {
    const err = error as CustomError
    toast.error(err.data.message)
  }

  useEffect(() => {
    if (data)
      setRows(
        data.orders.map((product) => ({
          user: product.user?.name || "Unknown",
          amount: product.total,
          discount: product.discount,
          quantity: product.orderItem.length,
          status: <span className={product.status === "processaing" ? "red" : product.status === "shipped" ? "green" : "purple"}>{product.status}</span>,
          action: <Link to={`/admin/transaction/${product._id}`}>Manage</Link>,

        }))
      );

  }, [data, isError]);


  // const Table = useCallback(
  //   TableHOC<DataType>(
  //     columns,
  //     rows,
  //     "dashboard-product-box",
  //     "Transactions",
  //     rows?.length > 6
  //   ),
  //   []
  // );

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container">
      <Sidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
    </div>
  );

  // return (
  //   <div className="admin-container">
  //     <Sidebar />
  //     <main>{isLoading ? <Skeleton length={20} /> : Table()}</main>
  //   </div>
  // );
};

export default Transaction;
