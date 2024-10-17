import { Column } from "react-table";
import TableHOC from "../components/AdminComponents/TableHOC";
import { ReactElement, useState } from "react";
import { Link } from "react-router-dom";

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
const id = "bhvfds";
const OrdersList = () => {
  const [rows] = useState<DataType[]>([
    {
      _id: "hdsfbvhds",
      amount: 54541,
      quantity: 45,
      discount: 56,
      status: <span>Processing</span>,
      action: <Link to={`/order/${id}`}>view</Link>,
    },
  ]);
  const table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Orders"
  )();
  return (
    <div className="container">
      <h1>My Orders</h1>
      {table}
    </div>
  );
};

export default OrdersList;
