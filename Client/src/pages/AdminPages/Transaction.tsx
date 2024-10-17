import { ReactElement, useCallback, useState } from "react";
import Sidebar from "../../components/AdminComponents/Sidebar";
import { Column } from "react-table";
import TableHOC from "../../components/AdminComponents/TableHOC";
import { Link } from "react-router-dom";

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
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Transaction",
    ),
    []
  );

  return (
    <div className="admin-container">
      <Sidebar />
      <main>{Table()}</main>
    </div>
  );
};

export default Transaction;
