import { ReactElement, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import Sidebar from "../../components/AdminComponents/Sidebar";
import TableHOC from "../../components/AdminComponents/TableHOC";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { server } from "../../redux/store";
import { CustomError } from "../../types/apiTypes";
import { userReducerInitialState } from '../../types/reducerTypes';

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },

  {
    Header: "Name",
    accessor: "name",
  },

  {
    Header: "Price",
    accessor: "price",
  },

  {
    Header: "Stock",
    accessor: "stock",
  },

  {
    Header: "Action",
    accessor: "action",
  },
];


//   {
//     photo: <img src={img} alt="Shoes" />,
//     name: "Puma Shoes Air Jordan Cook Nigga 2023",
//     price: 690,
//     stock: 3,
//     action: <Link to="/admin/product/sajknaskd">Manage</Link>,
//   },

//   {
//     photo: <img src={img3} alt="Shoes" />,
//     name: "Puma Sun Glass Air Jordan ",
//     price: 5000,
//     stock: 18,
//     action: <Link to="/admin/product/sajknaskdfdghdft">Manage</Link>,
//   },

//   {
//     photo: <img src={img4} alt="Shoes" />,
//     name: "Bottle",
//     price: 223,
//     stock: 6133,
//     action: <Link to="/admin/product/sdaskdnkasjdvxccvxn">Manage</Link>,
//   },
//   {
//     photo: <img src={img5} alt="Shoes" />,
//     name: "Boat Head Phone 2023",
//     price: 2790,
//     stock: 63,
//     action: <Link to="/admin/product/sajknaskd">Manage</Link>,
//   },

//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
//   {
//     photo: <img src={img} alt="Shoes" />,
//     name: "Puma Shoes Air Jordan Cook Nigga 2023",
//     price: 690,
//     stock: 3,
//     action: <Link to="/admin/product/sajknaskd">Manage</Link>,
//   },
//   {
//     photo: <img src={img} alt="Shoes" />,
//     name: "Puma Shoes Air Jordan Cook Nigga 2023",
//     price: 690,
//     stock: 3,
//     action: <Link to="/admin/product/sajknaskd">Manage</Link>,
//   },
//   {
//     photo: <img src={img6} alt="Shoes" />,
//     name: "Pepsi By Cococla ",
//     price: 45,
//     stock: 143,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
//   {
//     photo: <img src={img6} alt="Shoes" />,
//     name: "Pepsi By Cococla ",
//     price: 45,
//     stock: 143,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
//   {
//     photo: <img src={img6} alt="Shoes" />,
//     name: "Pepsi By Cococla ",
//     price: 45,
//     stock: 143,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
//   {
//     photo: <img src={img6} alt="Shoes" />,
//     name: "Pepsi By Cococla ",
//     price: 45,
//     stock: 143,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
// ];

const Product = () => {

  const { user } = useSelector(
    (state: { userReducer: userReducerInitialState }) => state.userReducer
  )
  const { data, error, isError, isLoading, } = useAllProductsQuery(user?._id!)
  const [rows, setRows] = useState<DataType[]>([]);


  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message)
  }
  useEffect(() => {
    if (data && data.products) {
      setRows(
        data.products.map((product) => ({
          photo: <img src={product.photo} alt={product.name} />,
          name: product.name,
          price: product.price,
          stock: product.stock,
          action: <Link to={`/admin/product/${product._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading products...</div>;
  }


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
      <main className="main-container">{Table()}</main>

      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Product;
