"use client";
import cn from "classnames";
import LineChart from "@/components/Charts/LineChart";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import withAuth from "@/hooks/withAuth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getCountryListWithUsers } from "@/services/apis/users";
import BarChart from "@/components/Charts/BarChart";
import CsrWrapper from "@/components/CsrWrapper/CsrWrapper";
import RoleBasedGuard from "@/hooks/RoleBaseGuard";
import { ROLES } from "@/types";
import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "@/redux/store";
import { getTotalWithdraw } from "@/services/apis/withdraw";
import { getTotalDeposit } from "@/services/apis/deposit";
import { getTotalProfit, getTotalWager } from "@/services/apis/game";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

// type DurationType = "1D" | "7D" | "1M" | "1Y" | "All";
type RangeType =
  | "1m"
  | "1h"
  | "3h"
  | "1d"
  | "3d"
  | "7d"
  | "1M"
  | "3M"
  | "6M"
  | "1Y"
  | "All";
type RangeUnit =
  | "mili"
  | "sec"
  | "min"
  | "hour"
  | "day"
  | "week"
  | "month"
  | "year";

const ranges: {
  label: string;
  duration: RangeType;
  range: RangeType;
  unit: RangeUnit;
}[] = [
  { label: "1D", duration: "1d", range: "1h", unit: "sec" },
  { label: "7D", duration: "7d", range: "3h", unit: "sec" },
  { label: "1M", duration: "1M", range: "3d", unit: "sec" },
  { label: "1Y", duration: "1Y", range: "1M", unit: "sec" },
  { label: "All", duration: "All", range: "1M", unit: "sec" },
];

type DurationDataType = {
  duration: RangeType;
  range: RangeType;
  unit: RangeUnit;
};

type AmountDataType = {
  categories: Array<string | number>;
  data: { name: string; data: number[] };
};

const SystemGrowth: React.FC = () => {
  const { userInfo } = useSelector(
    (state: AppState) => ({
      userInfo: state.auth.user,
    }),
    shallowEqual,
  );

  const getTimeByRange = (duration: RangeType) => {
    const now = Date.now();
    let startTime = 0;
    switch (duration) {
      case "1d":
        startTime = now - 24 * 60 * 60 * 1000;
        break;
      case "3d":
        startTime = now - 3 * 24 * 60 * 60 * 1000;
        break;
      case "7d":
        startTime = now - 7 * 24 * 60 * 60 * 1000;
        break;
      case "1M":
        startTime = now - 30 * 24 * 60 * 60 * 1000;
        break;
      case "1Y":
        startTime = now - 365 * 24 * 60 * 60 * 1000;
        break;
      case "All":
        startTime = 0;
        break;
      default:
        startTime = 0;
        break;
    }
    return startTime;
  };

  const getRange = (range: RangeType) => {
    switch (range) {
      case "1m":
        return 1;
      case "1h":
        return 60;
      case "3h":
        return 60 * 3;
      case "1d":
        return 60 * 24;
      case "3d":
        return 3 * 24 * 60;
      case "7d":
        return 7 * 60 * 24;
      case "1M":
        return 30 * 60 * 24;
      case "1Y":
        return 365 * 60 * 24;

      default:
        return 1;
    }
  };

  const [durationData, setDuration] = useState<
    Record<string, DurationDataType>
  >({
    deposit: {
      duration: "1M",
      range: "3d",
      unit: "sec",
    },
    withdraw: {
      duration: "1M",
      range: "3d",
      unit: "sec",
    },
    profit: {
      duration: "1M",
      range: "3d",
      unit: "sec",
    },
    wager: {
      duration: "1M",
      range: "3d",
      unit: "sec",
    },
    payout: {
      duration: "1Y",
      range: "1Y",
      unit: "month",
    },
  });

  const [depositAmount, setDepositAmount] = useState<AmountDataType>({
    categories: [],
    data: { name: "Deposit", data: [] },
  });

  const [withdrawAmount, setWithdrawAmount] = useState<AmountDataType>({
    categories: [],
    data: { name: "Withdraw", data: [] },
  });

  const [profitAmount, setProfitAmount] = useState<AmountDataType>({
    categories: [],
    data: { name: "Profit", data: [] },
  });

  const [wagerAmount, setWagerAmount] = useState<AmountDataType>({
    categories: [],
    data: { name: "Wager", data: [] },
  });

  const [userByCountry, setUserByCountry] = useState<AmountDataType>({
    categories: [],
    data: { name: "User Data", data: [] },
  });

  const getUserData = async () => {
    const response = await getCountryListWithUsers({
      start_time: 0,
      end_time: Date.now() / 1000,
    });
    setUserByCountry({
      categories: response.map((res: any) => res.country_full_name),
      data: {
        name: "User Count",
        data: response.map((res: any) => Number(res.count)),
      },
    });
  };
  const getDepositData = useCallback(async () => {
    const response = await getTotalDeposit({
      start_time: getTimeByRange(durationData.deposit.duration) / 1000,
      end_time: Date.now() / 1000,
      interval: getRange(durationData.deposit.range),
    });

    setDepositAmount({
      categories: response.map((item: any) => Number(item.from) * 1000),
      data: {
        name: "Deposit",
        data: response.map((item: any) => Number(item?.sum || 0)),
      },
    });
  }, [durationData.deposit]);

  const getWithdrawData = useCallback(async () => {
    const response = await getTotalWithdraw({
      start_time: getTimeByRange(durationData.withdraw.duration) / 1000,
      end_time: Date.now() / 1000,
      interval: getRange(durationData.withdraw.range),
    });

    setWithdrawAmount({
      categories: response.map((item: any) => Number(item.from) * 1000),
      data: {
        name: "Withdraw",
        data: response.map((item: any) => Number(item?.sum || 0)),
      },
    });
  }, [durationData.withdraw]);

  const getProfitData = useCallback(async () => {
    const response = await getTotalProfit({
      start_time: getTimeByRange(durationData.profit.duration) / 1000,
      end_time: Date.now() / 1000,
      interval: getRange(durationData.profit.range),
    });
    setProfitAmount({
      categories: response.map((item: any) => Number(item.from) * 1000),
      data: {
        name: "Profit",
        data: response.map((item: any) => Number(item?.sum || 0)),
      },
    });
  }, [durationData.profit]);

  const getWagerData = useCallback(async () => {
    const response = await getTotalWager({
      start_time: getTimeByRange(durationData.wager.duration) / 1000,
      end_time: Date.now() / 1000,
      interval: getRange(durationData.wager.range),
    });

    setWagerAmount({
      categories: response.map((item: any) => Number(item.from) * 1000),
      data: {
        name: "Wager",
        data: response.map((item: any) => Number(item?.sum || 0)),
      },
    });
  }, [durationData.wager]);

  const renderBar = useCallback(
    (
      data: AmountDataType,
      rangeKey:
        | "deposit"
        | "withdraw"
        | "profit"
        | "wager"
        | "payout"
        | "users",
      rangeData: { label: string; duration: RangeType; range: RangeType }[],
      categoryType?: "datetime" | "category",
    ) => {
      return (
        <div className="flex h-full flex-col rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <div className="flex justify-between">
            <p className="font-bold text-black dark:text-white">{`${data.data.name}`}</p>
            <div
              className={cn(
                "flex gap-1 rounded-lg bg-slate-100 dark:bg-boxdark-2",
                {
                  "p-1": rangeData.length > 0,
                  "p-0": rangeData.length === 0,
                },
              )}
            >
              {rangeData.map((range, index) => (
                <button
                  key={index}
                  className={cn("rounded-lg px-2 py-1", {
                    "bg-white dark:bg-boxdark":
                      durationData[rangeKey].duration === range.duration,
                  })}
                  onClick={() => {
                    setDuration({
                      ...durationData,
                      [rangeKey]: {
                        ...durationData[rangeKey],
                        duration: range.duration,
                        range: range.range,
                      },
                    });
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
          <CsrWrapper>
            <BarChart
              title={data.data.name}
              datas={[data.data]}
              categories={data.categories}
              categoryType={categoryType}
            />
          </CsrWrapper>
        </div>
      );
    },
    [durationData],
  );

  const renderChart = useCallback(
    (
      data: AmountDataType,
      rangeKey: "deposit" | "withdraw" | "profit" | "wager",
      rangeData: { label: string; duration: RangeType; range: RangeType }[],
    ) => {
      return (
        <div className="flex flex-col rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <div className="flex justify-between">
            <p className="font-bold text-black dark:text-white">{`${data.data.name}`}</p>
            <div className="flex gap-1 rounded bg-slate-100 p-1 dark:bg-boxdark-2">
              {rangeData.map((range, index) => (
                <button
                  key={index}
                  className={cn("rounded px-2 py-1", {
                    "bg-white dark:bg-boxdark":
                      durationData[rangeKey].duration === range.duration,
                  })}
                  onClick={() => {
                    setDuration({
                      ...durationData,
                      [rangeKey]: {
                        ...durationData[rangeKey],
                        duration: range.duration,
                        range: range.range,
                      },
                    });
                  }}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
          <CsrWrapper>
            <LineChart
              title={"Wager"}
              datas={[data.data]}
              categories={data.categories}
            />
          </CsrWrapper>
        </div>
      );
    },
    [durationData],
  );

  useEffect(() => {
    if (userInfo.role === ROLES.ADMIN) {
      getUserData();
    }
  }, [userInfo]);

  useEffect(() => {
    getDepositData();
  }, [getDepositData]);

  useEffect(() => {
    getWithdrawData();
  }, [getWithdrawData]);

  useEffect(() => {
    getProfitData();
  }, [getProfitData]);

  useEffect(() => {
    getWagerData();
  }, [getWagerData]);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="System Growth" />
        <div className="grid grid-cols-3 gap-4">
          <div>{renderChart(depositAmount, "deposit", ranges)}</div>
          <div>{renderChart(withdrawAmount, "withdraw", ranges)}</div>
          <div>{renderChart(profitAmount, "profit", ranges)}</div>
        </div>
        <RoleBasedGuard roles={[ROLES.ADMIN]}>
          <div className="mt-4 sm:rounded-lg">
            {renderBar(userByCountry, "users", [])}
          </div>
        </RoleBasedGuard>
      </DefaultLayout>
    </>
  );
};

const SystemGrowthWithAuth = withAuth(SystemGrowth);

export default SystemGrowthWithAuth;
