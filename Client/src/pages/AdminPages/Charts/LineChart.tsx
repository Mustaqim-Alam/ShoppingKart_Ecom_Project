import { LineChart } from "../../../components/AdminComponents/Charts";
import Sidebar from "../../../components/AdminComponents/Sidebar";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LineCharts = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="chart-container">
        <h1>Line Chart</h1>
        <section>
          <LineChart
            data={[
              200, 444, 944, 556, 778, 455, 990, 1444, 256, 447, 1000, 1200,
            ]}
            label="Users"
            borderColor="rgb(25, 92, 55)"
            backgroundColor="rgba(205, 992, 55,0.4)"
            labels={months}
          />
          <h2>Active Users</h2>
        </section>
        <section>
          <LineChart
            data={[12, 68, 94, 51, 78, 45, 20, 10, 60, 47, 19, 12]}
            label="Revenue"
            borderColor="rgb(193, 18, 31)"
            backgroundColor="rgba(193, 18, 31, 0.4)"
            labels={months}
          />
          <h2>Total Products (SKU)</h2>
        </section>
        <section>
          <LineChart
            data={[
              12000, 68644, 94448, 5156, 778, 45845, 9900, 10444, 2560, 70447,
              10000, 120000,
            ]}
            label="Revenue"
            borderColor="rgb(40, 8, 400)"
            backgroundColor="rgba(40, 8, 400, 0.4)"
            labels={months}
          />
          <h2>Total Revenue</h2>
        </section>
        <section>
          <LineChart
            data={[
              200, 644, 94, 515, 778, 445, 990,444, 560, 704,
              100, 100,
            ]}
            label="Discount"
            borderColor="hsl(40, 80%, 40%)"
            backgroundColor="hsla(40, 80%, 40%, 0.4)"
            labels={months}
          />
          <h2>Discount Allotted</h2>
        </section>
      </main>
    </div>
  );
};

export default LineCharts;
