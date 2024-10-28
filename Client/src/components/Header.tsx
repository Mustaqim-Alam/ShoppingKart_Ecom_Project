import { useState } from "react";
import { FaShoppingBag, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import { HiSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import { User } from "../types/types";

interface propsTypes {
  user: User | null;
}
const Header = ({ user }: propsTypes) => {
  const [isOpen, setisOpen] = useState<boolean>(false);
  
  const logoutHandler = () => {
    try {
      
    } catch (error) {
      
    }
  };

  
  return (
    <nav className="header">
      <h1
        style={{
          marginRight: "auto",
          paddingLeft: "1rem",
        }}
      >
        {" "}
        <Link to="/" style={{ cursor: "pointer" }}>
          ShoppingKart.
        </Link>{" "}
      </h1>
      <Link onClick={() => setisOpen(false)} to="/">
        Home
      </Link>
      <Link onClick={() => setisOpen(false)} to="/search">
        {<HiSearch />}{" "}
      </Link>
      <Link onClick={() => setisOpen(false)} to="/cart">
        {<FaShoppingBag />}
      </Link>
      {user?._id ? (
        <>
          <button onClick={() => setisOpen((prev) => !prev)}>
            <FaUserAlt />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <button>
                  <Link onClick={() => setisOpen(false)} to="/admin/dashboard">
                    Admin
                  </Link>
                </button>
              )}
              <Link onClick={() => setisOpen(false)} to="/orders">
                Orders
              </Link>
              <button onClick={logoutHandler}>{<GoSignOut />}</button>
            </div>
          </dialog>
        </>
      ) : (
        <Link to="/login">{<FaSignInAlt />} </Link>
      )}
    </nav>
  );
};

export default Header;
