import { ApexOptions } from "apexcharts";
import ReactApexChart from "./Chart";

interface ChartProps {
  title: string;
  datas: Array<{ name: string; data: number[] }>;
  categories: Array<string | number>;
  type?:
    | "area"
    | "line"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap"
    | undefined;
  chartOption?: ApexOptions;
}
const LineChart: React.FC<ChartProps> = ({
  title,
  datas,
  categories,
  type = "area",
  chartOption,
}) => {
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      stacked: false,
      height: 350,
      type: type,
      zoom: {
        enabled: false,
      },
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    xaxis: {
      type: "datetime",
      categories: categories,
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
    },
    yaxis: {
      decimalsInFloat: 2,
    },
    ...chartOption,
  };

  return (
    <>
      <ReactApexChart
        options={options}
        type={type}
        series={datas}
        width={"100%"}
        height={350}
      />
    </>
  );
};

export default LineChart;
