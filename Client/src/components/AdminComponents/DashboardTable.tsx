import { Column } from "react-table";
import TableHOC from "./TableHOC";

interface DataType {
  id: string;
  quantity: number;
  amount: number;
  discount: number;
  status: string;
}

const columns: Column<DataType>[] = [
  {
    Header: "id",
    accessor: "id",
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
];
const DashboardTable = ({ data = [] }: { data: DataType[] }) => {
  return TableHOC<DataType>(
    columns,
    data,
    "transaction-box",
    "Top Transaction"
  )();
};

export default DashboardTable;
