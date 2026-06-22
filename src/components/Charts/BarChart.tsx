import { ApexOptions } from "apexcharts";
import ReactApexChart from "./Chart";

interface ChartProps {
  title: string;
  datas: Array<{ name: string; data: number[] }>;
  categories: Array<string | number>;
  categoryType?: "datetime" | "category";
  chartOption?: ApexOptions;
}

const BarChart: React.FC<ChartProps> = ({
  title,
  datas,
  categories,
  categoryType,
  chartOption
}) => {
  const options: ApexOptions = {
    chart: {
      toolbar: {
        show: false,
      },
      height: 350,
      zoom: {
        enabled: false,
      },
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
      curve: "straight",
    },
    // grid: {
    //   show: false,
    // },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    xaxis: {
      type: categoryType,
      categories: categories,
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM yy",
          day: "dd MMM",
          hour: "HH:mm",
        },
      },
    },
    yaxis: {
      decimalsInFloat: 2,
    },
    ...chartOption
  };

  return (
    <>
      <ReactApexChart
        options={options}
        series={datas}
        type="bar"
        width={'100%'}
        height={350}
      />
    </>
  );
};

export default BarChart;
