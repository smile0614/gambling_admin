import { ApexOptions } from "apexcharts";
import ReactApexChart from "./Chart";
// import ReactApexChart from "react-apexcharts";

interface ChartProps {
  //   title: string;
  datas: Array<{ x: string; y: number }>;
  //   categories: Array<string | number>;
  //   categoryType?: "datetime" | "category";
}

const TreeChart: React.FC<ChartProps> = ({
  //   title,
  datas,
  //   categories,
  //   categoryType,
}) => {
  const options: ApexOptions = {
    legend: {
      show: false,
    },
    chart: {
      height: 400,
      type: "treemap",
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
      },
      formatter: function (text: string | number, op) {
        //   return [text, op.value];
        return `${text} ${op.value}`;
      },
      offsetY: -4,
    },
    plotOptions: {
      treemap: {
        enableShades: true,
        shadeIntensity: 0.5,
        reverseNegativeShade: true,
        
      },
    },
  };

  return (
    <>
      <ReactApexChart
        options={options}
        series={[{ data: datas }]}
        type="treemap"
        width={'100%'}
        height={400}
      />
    </>
  );
};

export default TreeChart;
