import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
    ChartOptions,
    PointElement,
    ArcElement,
    LineElement,
    Filler
  } from "chart.js";
  import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    Filler
  );
  
  const months = ["January", "February", "March", "April", "May", "June", "July"];
  
  interface BarchatProps {
    horizontal?: boolean;
    data_1: number[];
    data_2: number[];
    title_1: string;
    title_2: string;
    bgColor_1: string;
    bgColor_2: string;
    labels?: string[];
  }
  
  export const Barchart = ({
    horizontal = false,
    data_1 = [],
    data_2 = [],
    title_1,
    title_2,
    bgColor_1,
    bgColor_2,
    labels = months,
  }: BarchatProps) => {
    const options: ChartOptions<"bar"> = {
      responsive: true,
      indexAxis: horizontal ? "y" : "x",
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };
  
    const data: ChartData<"bar", number[], string> = {
      labels,
      datasets: [
        {
          label: title_1,
          data: data_1,
          backgroundColor: bgColor_1,
          barThickness: "flex",
          barPercentage: 1,
          categoryPercentage: 0.4,
        },
        {
          label: title_2,
          data: data_2,
          backgroundColor: bgColor_2,
          barThickness: "flex",
          barPercentage: 1,
          categoryPercentage: 0.4,
        },
      ],
    };
  
    return <Bar width={horizontal ? "200%" : ""} options={options} data={data} />;
  };
  
  interface DoughChartProps {
    labels: string[];
    data: number[];
    backgroundColor: string[];
    cutout?: number | string;
    legends?: boolean;
    offset?: number[];
  }
  
  export const DoughnutChart = ({
    labels,
    data,
    backgroundColor,
    cutout,
    legends = true,
    offset,
  }: DoughChartProps) => {
    const doughnutData: ChartData<"doughnut", number[], string> = {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 0,
          offset,
        },
      ],
    };
  
    const doughnutOption: ChartOptions<"doughnut"> = {
      responsive: true,
      plugins: {
        legend: {
          display: legends,
          position: "bottom",
          labels: {
            padding: 40,
          },
        },
      },
      cutout,
    };
  
    return <Doughnut data={doughnutData} options={doughnutOption} />;
  };
  interface PieChartProps {
    labels: string[];
    data: number[];
    backgroundColor: string[];
    offset?: number[];
  }
  export const PieChart = ({
    labels,
    data,
    backgroundColor,
    offset,
  }: PieChartProps) => {
    const PieChartData: ChartData<"pie", number[], string> = {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          borderWidth: 1,
          offset,
        },
      ],
    };
  
    const PieChartOption: ChartOptions<"pie"> = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  
    return <Pie data={PieChartData} options={PieChartOption} />;
  };
  
  interface LineChartProps {
    data: number[];
    label: string;
    backgroundColor: string;
    borderColor: string;
    labels?: string[];
  }
  
  export const LineChart = ({
    data,
    label,
    backgroundColor,
    borderColor,
    labels = months,
  }: LineChartProps) => {
  
    
    const options: ChartOptions<"line"> = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
  
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    };
  
    const lineChartData: ChartData<"line", number[], string> = {
      labels,
      datasets: [
        {
          fill: true,
          label,
          data,
          backgroundColor,
          borderColor,
        },
      ],
    };
  
    return <Line options={options} data={lineChartData} />;
  };
  