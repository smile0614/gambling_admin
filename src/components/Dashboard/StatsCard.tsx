import React from "react";
import cn from "classnames";
import { useRouter } from "next/navigation";

interface StatsCardProps {
  title: string;
  value: string | number;
  color?: string;
  url?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, color, url }) => {
  const router = useRouter();
  const redirect = () => {
    if (!url) return;
    router.push(url);
  };

  return (
    <div
      className="rounded-md border border-stroke bg-white p-5 py-4  text-center shadow-default dark:border-strokedark dark:bg-boxdark cursor-pointer"
      onClick={redirect}
    >
      <h3 className="mb-2 text-lg font-medium capitalize">{title}</h3>
      <p
        className={cn(`text-title-sm font-bold text-wrap break-all ${color}`, {
          // `${color}`: color,
          "text-black dark:text-white": !color,
        })}
      >
        {value}
      </p>
    </div>
  );
};

export default StatsCard;
