import dynamic from "next/dynamic";
import CsrWrapper from "../CsrWrapper/CsrWrapper";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default Chart;
