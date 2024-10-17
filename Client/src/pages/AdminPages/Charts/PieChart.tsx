import { DoughnutChart, PieChart } from "../../../components/AdminComponents/Charts";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import { categories } from "../../../assets/data.json";

const PieCharts = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        <section>
          <div>
            <PieChart
              labels={["Processing", "Shipped", "Delivered "]}
              data={[12, 25, 7]}
              backgroundColor={[
                `rgb(0, 48, 73)`,
                `rgb(206, 212, 218)`,
                `rgb(193, 18, 31)`,
              ]}
              
              offset={[0, 30, 50]}
              
            />
          </div>
          <h2>Order Fullfillment Ratio</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={categories.map((i) => i.heading)}
              data={categories.map((i) => i.value)}
              backgroundColor={categories.map(
                (i) => `rgb(${i.value * 3}, ${i.value * 2}, ${i.value * 2} )`
              )}
              legends={false}
              offset={[0, 0, 0, 50]}
            />
          </div>
          <h2>Product Category ratio</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={["In Stock", "Out of Stock"]}
              data={[35, 21]}
              backgroundColor={["rgb(67, 40, 24)", "rgb(112, 224, 0)"]}
              legends={false}
              offset={[0, 50]}
              cutout={"70%"}
            />
          </div>
          <h2>Product Stock Avaibility</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={[
                "Marketing Const",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[35, 21, 53, 80, 18]}
              backgroundColor={[
                "rgb(87, 440, 24)",
                "rgb(912, 24, 100)",
                "rgb(134, 22, 87)",
                "rgb(214, 64, 69)",
                "rgb(126, 4, 10)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 74]}
            />
          </div>
          <h2>Revenue Distribution</h2>
        </section>
        <section>
          <div>
            <PieChart
              labels={[
                "Teenager (Below 20)",
                "Adult (20 - 40)",
                "Older(Above 40) ",
              ]}
              data={[110, 205, 74]}
              backgroundColor={[
                `rgb(440, 80, 73)`,
                `rgb(6, 252, 600)`,
                `rgb(90, 0, 101)`,
              ]}
              offset={[10, 30, 50]}
            />
          </div>
          <h2>User Age Group</h2>
        </section>
        <section>
          <div>
            <DoughnutChart
              labels={["Admin", "Customer"]}
              data={[35, 21]}
              backgroundColor={["rgb(41, 55, 254)", "rgb(109, 103, 110)"]}
              // legends={false}
              offset={[0, 50]}
              cutout={"70%"}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
