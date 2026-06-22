"use client";
import { useSelector } from "react-redux";
import SelectDropdown from "../common/Select/selectDropdown";
import { AppState } from "@/redux/store";
import { ROLES } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { getTotalDeposit } from "@/services/apis/deposit";
import { getTotalWithdraw } from "@/services/apis/withdraw";
import { currencyFormat } from "@/utils/format";
import cn from "classnames";

interface DepositNavProps {
  handleActiveTab: (value: "deposit" | "withdraw") => void;
  activeTab: "deposit" | "withdraw";
}

const DepositNav: React.FC<DepositNavProps> = ({
  handleActiveTab,
  activeTab,
}) => {
  const userInfo = useSelector((state: AppState) => state.auth.user);

  const [todayData, setTodayData] = useState({
    deposit: 0,
    withdraw: 0,
  });

  const getData = useCallback(async () => {
    const now = new Date();

    const nowTime = now.getTime() / 1000;
    now.setHours(0, 0, 0, 0);

    const todayStart = now.getTime() / 1000;

    const timeData = {
      start_time: todayStart,
      end_time: nowTime,
      interval: -1,
    };
    const [_resDeposit, _resWithdraw] = await Promise.all([
      getTotalDeposit(timeData),
      getTotalWithdraw(timeData),
    ]);

    setTodayData({
      deposit: Number(_resDeposit[0]?.sum || 0),
      withdraw: Number(_resWithdraw[0]?.sum || 0),
    });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex flex-wrap justify-between gap-y-4 rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex w-full max-w-full flex-wrap gap-5 lg:max-w-[560px]">
        <button
          className={cn(
            `flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center   text-primary shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
            {
              "bg-primary text-white": activeTab === "deposit",
              "text-primary hover:text-white": activeTab === "withdraw",
            },
          )}
          onClick={() => handleActiveTab("deposit")}
        >
          <DepositIcon /> Deposit List
        </button>
        <button
          className={cn(
            `flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center   text-primary shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
            {
              "bg-primary text-white": activeTab === "withdraw",
              "text-primary hover:text-white": activeTab === "deposit",
            },
          )}
          onClick={() => handleActiveTab("withdraw")}
        >
          <WithdrawIcon /> Withdraw List
        </button>
      </div>
      <div className="flex gap-6 ">
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Today’s deposit</span>
          <h4 className="text-title-sm font-bold text-black dark:text-white ">
            {currencyFormat(todayData.deposit, 2)}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-medium">Today’s withdrawal</span>
          <h4 className="text-title-sm font-bold text-black dark:text-white ">
            {currencyFormat(todayData.withdraw, 2)}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default DepositNav;

const DepositIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M120 140a12 12 0 0 1-12-12V45l-7.51 7.51a12 12 0 0 1-17-17l28-28a12 12 0 0 1 17 0l28 28a12 12 0 1 1-17 17L132 45v83a12 12 0 0 1-12 12m76-18.48V96a20 20 0 0 0-20-20h-12a12 12 0 0 0 0 24h8v68.3a32 32 0 0 0-43.71 43.7c.11.2.23.39.35.58l22.26 34a12 12 0 1 0 20.1-13.15l-22-33.66a8 8 0 0 1 14-7.77c.11.2.23.39.36.58l10.64 16.3a12 12 0 0 0 22-6.57V154a70.66 70.66 0 0 1 16 44.61V240a12 12 0 0 0 24 0v-41.35a94.91 94.91 0 0 0-40-77.13M76 76H64a20 20 0 0 0-20 20v104a12 12 0 0 0 24 0V100h8a12 12 0 0 0 0-24"
      />
    </svg>
  );
};

const WithdrawIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.2em"
      height="1.2em"
      viewBox="0 0 256 256"
    >
      <g fill="currentColor">
        <path
          d="M184 64v138.31L173.32 186a20 20 0 0 0-36.9 14H56V64a8 8 0 0 1 8-8h112a8 8 0 0 1 8 8"
          opacity="0.2"
        />
        <path d="M232 198.65V240a8 8 0 0 1-16 0v-41.35A74.84 74.84 0 0 0 192 144v58.35a8 8 0 0 1-14.69 4.38l-10.68-16.31c-.08-.12-.16-.25-.23-.38a12 12 0 0 0-20.89 11.83l22.13 33.79a8 8 0 0 1-13.39 8.76l-22.26-34l-.24-.38A28 28 0 0 1 176 176.4V64h-16a8 8 0 0 1 0-16h16a16 16 0 0 1 16 16v59.62a90.89 90.89 0 0 1 40 75.03M88 56a8 8 0 0 0-8-8H64a16 16 0 0 0-16 16v136a8 8 0 0 0 16 0V64h16a8 8 0 0 0 8-8m69.66 42.34a8 8 0 0 0-11.32 0L128 116.69V16a8 8 0 0 0-16 0v100.69L93.66 98.34a8 8 0 0 0-11.32 11.32l32 32a8 8 0 0 0 11.32 0l32-32a8 8 0 0 0 0-11.32" />
      </g>
    </svg>
  );
};
