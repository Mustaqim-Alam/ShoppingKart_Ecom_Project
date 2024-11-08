import { ReactElement, useCallback, useState } from "react";
import Sidebar from "../../components/AdminComponents/Sidebar";
import TableHOC from "../../components/AdminComponents/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import toast from "react-hot-toast";
import { server } from "../../redux/store";

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

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const img3 =
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img4 =
  "https://images.unsplash.com/photo-1622428051717-dcd8412959de?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const img5 =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const img6 =
  "https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const arr: DataType[] = [
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },

  {
    photo: <img src={img3} alt="Shoes" />,
    name: "Puma Sun Glass Air Jordan ",
    price: 5000,
    stock: 18,
    action: <Link to="/admin/product/sajknaskdfdghdft">Manage</Link>,
  },

  {
    photo: <img src={img4} alt="Shoes" />,
    name: "Bottle",
    price: 223,
    stock: 6133,
    action: <Link to="/admin/product/sdaskdnkasjdvxccvxn">Manage</Link>,
  },
  {
    photo: <img src={img5} alt="Shoes" />,
    name: "Boat Head Phone 2023",
    price: 2790,
    stock: 63,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },
  {
    photo: <img src={img6} alt="Shoes" />,
    name: "Pepsi By Cococla ",
    price: 45,
    stock: 143,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img6} alt="Shoes" />,
    name: "Pepsi By Cococla ",
    price: 45,
    stock: 143,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img6} alt="Shoes" />,
    name: "Pepsi By Cococla ",
    price: 45,
    stock: 143,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
  {
    photo: <img src={img6} alt="Shoes" />,
    name: "Pepsi By Cococla ",
    price: 45,
    stock: 143,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
];

const Product = () => {
  const { data, error, isError, isLoading, } = useAllProductsQuery("")
  const [rows, setRows] = useState<DataType[]>(arr);


  // if (error) toast.error(error)

  if (data) setRows(
    data.products.map((product) => ({
      photo: <img src={`${server}/${product.photo}`} />,
      name: product.name,
      price: product.price,
      stock: product.stock,
      action: <Link to={`admin/product/${product._id}`}></Link>,
    }))
  )

  const Table = useCallback(
    TableHOC<DataType>(columns, rows, "dashboard-product-box", "Products",
      rows.length > 6),
    []
  );

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
