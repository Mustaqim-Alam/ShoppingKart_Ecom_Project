import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import rowData from "../../assets/data.json";
import userImg from "../../assets/dummy-user-img.png";
import {
  Barchart,
  DoughnutChart,
} from "../../components/AdminComponents/Charts";
import DashboardTable from "../../components/AdminComponents/DashboardTable";
import Sidebar from "../../components/AdminComponents/Sidebar";

const Dashboard = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="dashboard">
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder=" Search for data , user , docs" />
          <FaRegBell />
          <img src={userImg} alt="UserImg" />
        </div>
        <section className="widget-container">
          <WidgetItem
            percent={40}
            value={340000}
            heading="Revenue"
            amount={true}
            color="rgb(0, 115, 255)"
          />
          <WidgetItem
            percent={-40}
            value={340}
            heading="Users"
            color="rgb(0, 997, 5)"
          />
          <WidgetItem
            percent={80}
            value={70000}
            heading="Transactions"
            color="rgb(720, 115, 255)"
          />
          <WidgetItem
            percent={30}
            value={862}
            heading="Products"
            color="rgb(550, 115, 20)"
          />
        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            <Barchart
              data_1={[457, 362, 800, 121, 700, 100, 984]}
              data_2={[57, 992, 20, 499, 300, 900, 794]}
              title_1="Revenue"
              title_2="Transaction"
              bgColor_1="rgb(22, 66, 91)"
              bgColor_2="rgb(175, 252, 65)"
            />
          </div>
          <div className="stock-category">
            {" "}
            <h2> Inventory</h2>
            <div>
              {rowData.categories.map((item, index) => (
                <CategoryItem
                  key={index}
                  heading={item.heading}
                  value={item.value}
                  color={`hsl(${item.value}, ${item.value * 9}%, 45%)`}
                />
              ))}
            </div>
          </div>
        </section>
        <section className=" transaction-container">
          <div className="gender-chart">
            <h2>Gender Ratio</h2>
            <DoughnutChart
              labels={["Male", "Female"]}
              data={[95, 67]}
              backgroundColor={["rgb(337, 100, 89)", "rgb(255, 200, 221)"]}
              cutout={90}
            />
            <p>
              {" "}
              <BiMaleFemale />{" "}
            </p>
          </div>
          <DashboardTable data={rowData.transaction} />
        </section>
      </main>
    </div>
  );
};

interface widgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: widgetItemProps) => (
  <article className=" widget">
    <div className="widgetInfo">
      <p>{heading}</p>
      <h4>{amount ? `$${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> + {percent}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )}
    </div>{" "}
    <div
      className="widgetCircle"
      style={{
        background: `conic-gradient( 
          ${color} ${(Math.abs(percent) / 100) * 360}deg, rgb(255,255,255) 0 )`,
      }}
    >
      <span style={{ color }}>{percent}%</span>
    </div>
  </article>
);

interface categoryItemProps {
  heading: string;
  value: number;
  color: string;
}

const CategoryItem = ({ heading, value, color }: categoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;
