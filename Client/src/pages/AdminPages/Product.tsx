import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import Sidebar from "../../components/AdminComponents/Sidebar";
import TableHOC from '../../components/AdminComponents/TableHOC';
import { Skeleton } from "../../components/Loader";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { CustomError } from "../../types/apiTypes";
import { userReducerInitialState } from '../../types/reducerTypes';
import { server } from "../../redux/store";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  { Header: "Photo", accessor: "photo" },
  { Header: "Name", accessor: "name" },
  { Header: "Price", accessor: "price" },
  { Header: "Stock", accessor: "stock" },
  { Header: "Action", accessor: "action" },


];


const Product = () => {
  const { user } = useSelector((state: { userReducer: userReducerInitialState }) => state.userReducer);
  const { data, error, isError, isLoading } = useAllProductsQuery(user!._id);

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data) {
      console.log("Fetched products:", data);
    }
  }, [data]);

  if (isError) {
    console.error("Error fetching products:", error);
  }

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
      console.error("Error fetching products:", error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (data) {
      console.log("Fetched products:", data);
      if (Array.isArray(data.adminProducts)) {
        setRows(
          data.adminProducts.map((product) => ({
            photo: <img src={`${server}/${product.photo}`} alt={product.name} />,
            name: product.name,
            price: product.price,
            stock: product.stock,
            action: <Link to={`/admin/product/${product._id}`}>Manage</Link>,
          }))
        );
      } else {
        console.log("Admin Product is not an array!", data.adminProducts);

        setRows([]);
      }
    }
  }, [data, isError]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <Sidebar />
      <main>{isLoading ? <Skeleton length={20} /> : Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Product;
