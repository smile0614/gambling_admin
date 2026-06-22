"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const TierNav: React.FC = () => {
  const userInfo = useSelector((state: any) => state?.userInfo?.userInfo);
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap justify-between gap-y-4 rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <div className="flex w-full max-w-[400px] gap-5">
        {userInfo?.user?.role === "admin" && (
          <Link
            href="/tier1"
            className={`inline-block  w-full max-w-30 rounded-sm border border-indigo-600   p-2 text-center shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              pathname === "/tier1"
                ? " bg-indigo-600 text-white"
                : " text-indigo-600 hover:text-white"
            }`}
          >
            Tier 1
          </Link>
        )}
        {(userInfo?.user?.role === "admin" ||
          userInfo?.user?.role === "tier1") && (
          <Link
            href="/tier2"
            className={`inline-block w-full max-w-30 rounded-sm border border-indigo-600 p-2 text-center   text-indigo-600 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              pathname === "/tier2"
                ? "bg-indigo-600 text-white "
                : "text-indigo-600 hover:text-white"
            }`}
          >
            Tier 2
          </Link>
        )}
        {(userInfo?.user?.role === "admin" ||
          userInfo?.user?.role === "tier1" ||
          userInfo?.user?.role === "tier2") && (
          <Link
            href="/tier3"
            className={`inline-block w-full max-w-30 rounded-sm border border-indigo-600 p-2  text-center text-indigo-600 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              pathname === "/tier3"
                ? "bg-indigo-600 text-white "
                : "text-indigo-600 hover:text-white"
            }`}
          >
            Tier 3
          </Link>
        )}
      </div>
      <div className="flex gap-6 ">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Tier 1 Total Profit</span>
          <h4 className="text-title-sm font-bold text-black dark:text-white ">
            3.456K
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Tier 2 Total Profit</span>
          <h4 className="text-title-sm font-bold text-black dark:text-white ">
            3.456K
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Tier 3 Total Profit</span>
          <h4 className="text-title-sm font-bold text-black dark:text-white ">
            3.456K
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Player Total Profit</span>
          <h4 className="text-title-sm font-bold text-black dark:text-white ">
            3.456K
          </h4>
        </div>
      </div>
    </div>
  );
};

export default TierNav;
