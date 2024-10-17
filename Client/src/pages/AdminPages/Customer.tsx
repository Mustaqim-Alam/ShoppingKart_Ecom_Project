import { ReactElement, useCallback, useState } from "react";
import Sidebar from "../../components/AdminComponents/Sidebar";
import { Column } from "react-table";
import TableHOC from "../../components/AdminComponents/TableHOC";
import { FaTrash } from "react-icons/fa";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  role: string;
  gender: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },

  {
    Header: "Name",
    accessor: "name",
  },

  {
    Header: "Gender",
    accessor: "gender",
  },

  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },

  {
    Header: "Action",
    accessor: "action",
  },
];

const img1 =
  "https://file.xunruicms.com/admin_html/assets/pages/media/profile/profile_user.jpg";

const img2 = "https://www.venmond.com/demo/vendroid/img/avatar/big.jpg";

const arr: DataType[] = [
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img1}
        alt="userImg"
      />
    ),
    name: "Mohammad Zaid",
    email: "Md.Zaid@gmail.com",
    role: "User",
    gender: "Male",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: (
      <img
        style={{
          borderRadius: "50%",
        }}
        src={img2}
        alt="userImg"
      />
    ),
    name: "Fatima Firdos",
    email: "fatimah1233@gmail.com",
    role: "User",
    gender: "Female",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

const Customer = () => {
  const [data] = useState<DataType[]>(arr);

  const Table = useCallback(
    TableHOC<DataType>(
      columns,
      data,
      "dashboard-product-box",
      "Customer",
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

export default Customer;
