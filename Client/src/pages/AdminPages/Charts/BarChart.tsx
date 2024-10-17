import { Barchart } from "../../../components/AdminComponents/Charts";
import Sidebar from "../../../components/AdminComponents/Sidebar";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "Jun",
  "Jul",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const BarChart = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        <section>
          <Barchart
            data_1={[100, 650, 456, 390, 700, 400, 901]}
            data_2={[233, 900, 555, 400, 337, 321, 700]}
            bgColor_1="rgb(158, 240, 26)"
            bgColor_2="rgb(116, 198, 157)"
            title_1="Product"
            title_2="Users"
          />
          <h2>Top Selling Products & Top Customer</h2>
        </section>
        <section>
          <Barchart
            horizontal={true}
            data_1={[100, 650, 456, 390, 700, 400, 901, 545, 36, 736, 234, 900]}
            data_2={[]}
            bgColor_1="rgb(38, 70, 83)"
            bgColor_2="rgb()"
            title_1="Product"
            title_2=""
            labels={months}
          />
          <h2>Orders Througout the year</h2>
        </section>
      </main>
    </div>
  );
};

export default BarChart;
