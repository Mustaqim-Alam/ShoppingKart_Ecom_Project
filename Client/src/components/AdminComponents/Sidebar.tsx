import { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { AiFillFileText } from "react-icons/ai";
import {
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaGamepad,
  FaStopwatch,
} from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import {
  RiCoupon2Fill,
  RiDashboardFill,
  RiShoppingBag3Fill,
} from "react-icons/ri";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [phoneActive, setPhoneActive] = useState<boolean>(
    window.innerWidth < 1100
  );

  useEffect(() => {
    const handleResize = () => setPhoneActive(window.innerWidth < 1100);
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, [phoneActive]);

  interface ListItem {
    url: string;
    text: string;
    Icon: IconType;
  }
  interface Section {
    heading: string;
    item: ListItem[];
  }

  const sideBarData: Section[] = [
    {
      heading: "Dashboard",
      item: [
        { url: "/admin/dashboard", text: "Dashboard", Icon: RiDashboardFill },
        { url: "/admin/product", text: "Product", Icon: RiShoppingBag3Fill },
        { url: "/admin/customer", text: "Customer", Icon: IoIosPeople },
        {
          url: "/admin/transaction",
          text: "Transaction",
          Icon: AiFillFileText,
        },
      ],
    },
    {
      heading: "Charts",
      item: [
        { url: "/admin/chart/bar", text: "Bar", Icon: FaChartBar },
        { url: "/admin/chart/pie", text: "Pie", Icon: FaChartPie },
        { url: "/admin/chart/line", text: "Line", Icon: FaChartLine },
      ],
    },
    {
      heading: "Apps",
      item: [
        { url: "/admin/app/stopwatch", text: "Stopwatch", Icon: FaStopwatch },
        { url: "/admin/app/coupon", text: "Coupon", Icon: RiCoupon2Fill },
        { url: "/admin/app/toss", text: "Toss", Icon: FaGamepad },
      ],
    },
  ];

  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={() => setShowModal(true)}>
          {" "}
          <HiMenuAlt2 />{" "}
        </button>
      )}
      <aside
        style={
          phoneActive
            ? {
                width: "20rem",
                height: "100vh",
                position: "fixed",
                top: "0",
                left: showModal ? "0" : "-20rem",
                transition: "all 0.5s",
              }
            : {}
        }
      >
        <h2>Shopping KarT.</h2>
        {sideBarData.map((section, index) => (
          <div key={index}>
            <h5>{section.heading}</h5>
            <ul>
              {section.item.map((item, index) => (
                <Li
                  key={index}
                  url={item.url}
                  text={item.text}
                  Icon={item.Icon}
                  location={location}
                />
              ))}
            </ul>
          </div>
        ))}
        {phoneActive && (
          <button id="close-sidebar" onClick={() => setShowModal(false)}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

interface LiProps {
  url: string;
  text: string;
  Icon: IconType;
  location: Location;
}

const Li = ({ url, text, Icon, location }: LiProps) => (
  <li
    style={{
      backgroundColor: location.pathname.includes(url)
        ? " rgb(0, 115, 255, 0.2)"
        : " white",
    }}
  >
    <Link
      to={url}
      style={{
        color: location.pathname.includes(url) ? " rgb(0, 115, 255)" : " black",
      }}
    >
      <Icon />
      {text}
    </Link>
  </li>
);

export default Sidebar;
