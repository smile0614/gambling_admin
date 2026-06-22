"use client";
import cn from "classnames";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import withAuth from "@/hooks/withAuth";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import BarChart from "@/components/Charts/BarChart";
import CsrWrapper from "@/components/CsrWrapper/CsrWrapper";
import { getTotalMonthlyPayout } from "@/services/apis/tier";
import RoleBasedGuard from "@/hooks/RoleBaseGuard";
import { ROLES, SortType } from "@/types";
import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "@/redux/store";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import LineChart from "@/components/Charts/LineChart";
import {
  getGameList,
  getTotalProfit,
  getTotalGGR,
  getGameRevenueList,
  getGameProviderRevenueList,
} from "@/services/apis/game";
import { formatCompactNumber } from "@/utils/format";
import moment from "moment";
import Image from "next/image";
import { userSiteUrl } from "@/config";
import { convertToUrlCase } from "@/utils/convertor";
import CustomTable from "@/components/common/Table/CustomTable";
import {
  COUNTRY_REVENUE_LIST_COLUMN,
  GAME_PROVIDER_REVENUE_LIST_COLUMN,
  GAME_REVENUE_LIST_COLUMN,
  USER_REVENUE_LIST,
} from "@/config/columns";
import { startOfMonth, endOfMonth } from "date-fns";
import { getTotalBonus } from "@/services/apis/bonus";
import { getCountryRevenueList } from "@/services/apis/country";
import { getPlayerList } from "@/services/apis/users";
import { PATH_PAGE } from "@/config/path";
import Link from "next/link";

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

type AmountDataType = {
  categories: Array<string | number>;
  data: { name: string; data: number[] };
};

type HeaderType = "game" | "user" | "country" | "provider";

interface SelectionRagneType {
  startDate: Date;
  endDate: Date;
  key: string;
}
const StatisticsDashboard: React.FC = () => {
  const { userInfo, depositWalletBalance, withdrawWalletBalance } = useSelector(
    (state: AppState) => ({
      userInfo: state.auth.user,
      depositWalletBalance: state.statistics.depositMainWalletBalance,
      withdrawWalletBalance: state.statistics.withdrawMainWalletBalance,
    }),
    shallowEqual,
  );

  const [activeTab, setActiveTab] = useState<HeaderType>("game");

  const [top3Games, setTop3Games] = useState<
    { icon: ReactNode; title: string; ggr_amount_usd: string }[]
  >([]);
  const [top3Players, setTop3Players] = useState<
    { name: ReactNode; vip_level: string; total_profit_amount_usd: string }[]
  >([]);
  const [top3Countries, setTop3Countries] = useState<
    { country: string; total_profit_amount_usd: string }[]
  >([]);
  const [top3Providers, setTop3Providers] = useState<
    { name: string; ggr_amount_usd: string }[]
  >([]);
  const [selectionRange, setSelectionRange] = useState<
    Array<SelectionRagneType>
  >([
    {
      startDate: startOfMonth(new Date()),
      endDate: endOfMonth(new Date()),
      key: "selection",
    },
  ]);

  const [payout, setPayout] = useState<AmountDataType>({
    categories: [],
    data: { name: "Payout", data: [] },
  });

  const [profits, setProfit] = useState<{
    categories: string[];
    data: number[];
    total: string;
  }>({
    categories: [],
    data: [],
    total: "0",
  });

  const [ggr, setGGR] = useState<{
    categories: string[];
    data: number[];
    total: string;
  }>({
    categories: [],
    data: [],
    total: "0",
  });

  const [bonus, setBonus] = useState<{
    categories: string[];
    data: number[];
    total: string;
  }>({
    categories: [],
    data: [],
    total: "0",
  });

  const onRangeChange = (item: any) => {
    const tempRange: SelectionRagneType = {
      startDate: item?.selection?.startDate || new Date(),
      endDate: item?.selection?.endDate || new Date(),
      key: item?.selection?.key || "selection",
    };
    setSelectionRange([tempRange]);
  };

  const getPayout = async () => {
    const response = await getTotalMonthlyPayout({
      months: 12,
    });
    setPayout({
      categories: response.map((item: any) => item.payout_at),
      data: {
        name: "Tier Payout",
        data: response.map((item: any) => Number(item.sum)),
      },
    });
  };

  const getTotalRevenue = async () => {
    const startTime = selectionRange.at(0)?.startDate || new Date();
    const endTime = selectionRange.at(0)?.endDate || new Date();

    startTime.setHours(0, 0, 0, 0);
    endTime.setHours(23, 59, 59, 0);

    const response = await getTotalProfit({
      start_time: startTime.getTime() / 1000,
      end_time: endTime.getTime() / 1000,
      interval: (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 20,
    });
    const totalResponse = await getTotalProfit({
      start_time: startTime.getTime() / 1000,
      end_time: endTime.getTime() / 1000,
      interval: -1,
    });
    setProfit({
      categories: response.map((item: any) => Number(item.from) * 1000),
      data: response.map((item: any) => item?.sum.toFixed(2) || "0"),
      total: `${totalResponse?.at(0).sum}` || "0",
    });
  };

  const getTotalGGRData = async () => {
    const startTime = selectionRange.at(0)?.startDate || new Date();
    const endTime = selectionRange.at(0)?.endDate || new Date();

    startTime.setHours(0, 0, 0, 0);
    endTime.setHours(23, 59, 59, 0);

    const response = await getTotalGGR({
      start_time: startTime.getTime() / 1000,
      end_time: endTime.getTime() / 1000,
      interval: (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 20,
    });
    const totalResponse = await getTotalGGR({
      start_time: startTime.getTime() / 1000,
      end_time: endTime.getTime() / 1000,
      interval: -1,
    });
    setGGR({
      categories: response.map((item: any) => Number(item.from) * 1000),
      data: response.map((item: any) => item?.sum.toFixed(2) || "0"),
      total: `${totalResponse?.at(0).sum}` || "0",
    });
  };

  const getTotalBonusData = async () => {
    const startTime = selectionRange.at(0)?.startDate || new Date();
    const endTime = selectionRange.at(0)?.endDate || new Date();

    startTime.setHours(0, 0, 0, 0);
    endTime.setHours(23, 59, 59, 0);

    const response = await getTotalBonus({
      start_time: startTime.getTime() / 1000,
      end_time: endTime.getTime() / 1000,
      interval: (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 50,
    });
    const totalResponse = await getTotalBonus({
      start_time: startTime.getTime() / 1000,
      end_time: endTime.getTime() / 1000,
      interval: -1,
    });
    setBonus({
      categories: response.map((item: any) => Number(item.from) * 1000),
      data: response.map((item: any) => item?.sum.toFixed(2) || "0"),
      total: `${totalResponse?.at(0).sum}` || "0",
    });
  };

  const getRevenueByGame = async (
    page: number,
    page_size: number,
    sortData: { column: string; order: SortType },
  ) => {
    const response = await getGameRevenueList({
      page,
      page_size,
      sort_column: sortData.column,
      sort_order: sortData.order,
    });
    const _games =
      response?.games?.map((item: any) => ({
        id: item?.id || "",
        title: item?.title || "",
        identifier: item?.identifier || "",
        ggr_amount_usd: item?.ggr_amount_usd || "0",
        icon: (
          <>
            <a
              href={`${userSiteUrl}/game/?gameId=${convertToUrlCase(item.identifier)}`}
              target="_blank"
            >
              <Image
                src={`https://cdn.softswiss.net/i/s4/${(item.identifier || "").replace(":", "/")}.png`}
                alt=""
                width={160}
                height={160}
                className="h-[40px] w-[40px]"
              />
            </a>
          </>
        ),
      })) || [];
    return {
      data: _games,
      page: response.page,
      pageSize: response.page_size,
      totalCount: response.total_count,
      total_page: response.total_page,
    };
  };

  const getRevenueByGameProvider = async (
    page: number,
    page_size: number,
    sortData: { column: string; order: SortType },
  ) => {
    const response = await getGameProviderRevenueList({
      page,
      page_size,
      sort_column: sortData.column,
      sort_order: sortData.order,
    });
    const _providers =
      response?.providers?.map((item: any) => ({
        id: item?.id || "",
        name: item?.name || "",
        identifier: item?.identifier || "",
        ggr_amount_usd: item?.ggr_amount_usd || "0",
      })) || [];
    return {
      data: _providers,
      page: response.page,
      pageSize: response.page_size,
      totalCount: response.total_count,
      total_page: response.total_page,
    };
  };

  const getRevenueByCountry = async (
    page: number,
    page_size: number,
    sortData: { column: string; order: SortType },
  ) => {
    const response = await getCountryRevenueList({
      page,
      page_size,
      sort_column: sortData.column,
      sort_order: sortData.order,
    });
    const _countries =
      response?.countries?.map((item: any) => ({
        country: item?.country || "",
        total_profit_amount_usd: item?.total_profit_amount_usd || "0",
      })) || [];
    return {
      data: _countries,
      page: response.page,
      pageSize: response.page_size,
      totalCount: response.total_count,
      total_page: response.total_page,
    };
  };

  const getRevenueByUser = async (
    page: number,
    page_size: number,
    sortData: { column: string; order: SortType },
  ) => {
    const response = await getPlayerList({
      page,
      page_size,
      search: "",
      sort_column: sortData.column,
      sort_order: sortData.order,
    });
    const _users =
      response?.users?.map((item: any) => ({
        id: item?.id || "",
        avatar: item?.avatar || "",
        name: (
          <Link
            className="hover:underline"
            href={`${PATH_PAGE.management.player.user(item?.id)}`}
          >
            {item?.name || ""}
          </Link>
        ),
        vip_level: item?.vip_level || 0,
        email: item?.email || "",
        phone: item?.phone || "",
        tg: item?.telegram_user_name || "",
        walletAdditems: item?.wallet_additems || "",
        referralCode: item?.referral_code || "",
        registered_at: moment(item?.registered_at).format(
          "yyyy-MM-DD HH:mm:ss",
        ),
        kyc: item?.kyc,
        kycFront: item?.kyc_photo_front,
        kycBack: item?.kcy_photo_back,
        total_deposit_amount_usd: Number(item?.total_deposit_amount_usd || 0),
        total_withdraw_amount_usd: Number(item?.total_withdraw_amount_usd || 0),
        total_wager_amount_usd: Number(item?.total_wager_amount_usd || 0),
        total_win_amount_usd: Number(item?.total_win_amount_usd || 0),
        total_profit_amount_usd: Number(item?.total_profit_amount_usd || 0),
        total_bonus_amount_usd: Number(item?.total_bonus_amount_usd || 0),
      })) || [];
    return {
      data: _users,
      page: response.page,
      pageSize: response.page_size,
      totalCount: response.total_count,
      total_page: response.total_page,
    };
  };
  const getTop3Values = async () => {
    const gameResponse = await getGameRevenueList({
      page: 1,
      page_size: 3,
      sort_column: "ggr_amount_usd",
      sort_order: SortType.DESC,
    });
    const _games =
      gameResponse?.games?.map((item: any) => ({
        title: item?.title || "",
        ggr_amount_usd: item?.ggr_amount_usd || "0",
        icon: (
          <>
            <a
              href={`${userSiteUrl}/game/?gameId=${convertToUrlCase(item.identifier)}`}
              target="_blank"
            >
              <Image
                src={`https://cdn.softswiss.net/i/s4/${(item.identifier || "").replace(":", "/")}.png`}
                alt=""
                width={160}
                height={160}
                className="h-[32px] w-[32px]"
              />
            </a>
          </>
        ),
      })) || [];
    setTop3Games(_games);

    const userResponse = await getPlayerList({
      page: 1,
      page_size: 3,
      search: "",
      sort_column: "total_profit_amount_usd",
      sort_order: SortType.DESC,
    });
    const _users =
      userResponse?.users?.map((item: any) => ({
        name: (
          <Link
            className="hover:underline"
            href={`${PATH_PAGE.management.player.user(item?.id)}`}
          >
            {item?.name || ""}
          </Link>
        ),
        vip_level: item?.vip_level || 0,
        total_profit_amount_usd: Number(item?.total_profit_amount_usd || 0),
      })) || [];
    setTop3Players(_users);

    const countryResponse = await getCountryRevenueList({
      page: 1,
      page_size: 3,
      sort_column: "total_profit_amount_usd",
      sort_order: SortType.DESC,
    });
    const _countries =
      countryResponse?.countries?.map((item: any) => ({
        country: item?.country || "",
        total_profit_amount_usd: item?.total_profit_amount_usd || "0",
      })) || [];
    setTop3Countries(_countries);

    const providerResponse = await getGameProviderRevenueList({
      page: 1,
      page_size: 3,
      sort_column: "ggr_amount_usd",
      sort_order: SortType.DESC,
    });
    const _providers =
      providerResponse?.providers?.map((item: any) => ({
        name: item?.name || "",
        ggr_amount_usd: item?.ggr_amount_usd || "0",
      })) || [];
    setTop3Providers(_providers);
  };
  const renderBar = (
    data: AmountDataType,
    rangeKey: "deposit" | "withdraw" | "profit" | "wager" | "payout" | "users",
    rangeData: { label: string; duration: RangeType; range: RangeType }[],
    categoryType?: "datetime" | "category",
  ) => {
    return (
      <div className="flex h-full flex-col rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="flex justify-between">
          <p className="font-bold text-black dark:text-white">{`${data.data.name}`}</p>
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
  };

  const renderHeaders = useCallback(() => {
    const tabs: Array<{ title: string; key: HeaderType }> = [
      { title: "By Game", key: "game" },
      { title: "By User", key: "user" },
      { title: "By Country", key: "country" },
      { title: "By Provider", key: "provider" },
    ];

    return (
      <div className="flex flex-wrap justify-between gap-y-4 rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex w-full max-w-full flex-wrap gap-5">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={cn(
                `flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center   text-primary shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
                {
                  "bg-primary text-white": activeTab === tab.key,
                },
              )}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
    );
  }, [activeTab]);

  const renderValue = (val: any, type: string) => {
    switch (type) {
      case "currency":
        return (
          <p
            className={cn({
              "text-[orangered]": val < 0,
              "text-[limegreen]": val > 0,
            })}
          >
            {formatCompactNumber(val, {
              notation: "compact",
              maximumFractionDigits: 4,
              miniumFractionDigits: 2,
              currency: "USD",
              style: "currency",
            })}
          </p>
        );
      case "integer":
        return val;

      default:
        return val;
    }
  };

  const renderGraph = (
    title: string,
    categories: string[],
    total: string,
    data: { name: string; data: number[] },
  ) => (
    <div className="flex flex-col rounded-lg border border-stroke bg-white p-2 pt-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between px-3">
        <p className="font-bold text-black dark:text-white">{title}</p>
        {renderValue(total, "currency")}
      </div>
      <CsrWrapper>
        <LineChart
          title={"Revenue"}
          datas={[data || { name: "", data: [] }]}
          categories={categories || []}
          chartOption={{ yaxis: { show: true } }}
        />
      </CsrWrapper>
    </div>
  );

  useEffect(() => {
    if (userInfo.role === ROLES.ADMIN) {
      getPayout();
    }
  }, [userInfo, selectionRange]);

  useEffect(() => {
    getTotalRevenue();
    getTotalGGRData();
    getTotalBonusData();
    getTop3Values();
  }, [selectionRange]);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Revenue Status" />
        <div className="flex gap-4">
          <div className="flex w-3/5 flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {renderGraph("Revenue", profits.categories, profits.total, {
                name: "Revenue",
                data: profits.data,
              })}
              {renderGraph("GGR", ggr.categories, ggr.total, {
                name: "GGR",
                data: ggr.data,
              })}
              {renderGraph("Bonus", bonus.categories, bonus.total, {
                name: "Bonus",
                data: bonus.data,
              })}
              <RoleBasedGuard roles={[ROLES.ADMIN]}>
                {renderBar(payout, "payout", [], "datetime")}
              </RoleBasedGuard>
            </div>
            <div className="col-span-12 xl:col-span-12">{renderHeaders()}</div>
            {activeTab === "game" && (
              <div className="flow-root">
                <CustomTable
                  getData={getRevenueByGame}
                  columns={GAME_REVENUE_LIST_COLUMN}
                  defaultSort={{
                    column: "ggr_amount_usd",
                    order: SortType.DESC,
                  }}
                />
              </div>
            )}
            {activeTab === "provider" && (
              <div className="flow-root">
                <CustomTable
                  getData={getRevenueByGameProvider}
                  columns={GAME_PROVIDER_REVENUE_LIST_COLUMN}
                  defaultSort={{
                    column: "ggr_amount_usd",
                    order: SortType.DESC,
                  }}
                />
              </div>
            )}
            {activeTab === "user" && (
              <div className="flow-root">
                <CustomTable
                  getData={getRevenueByUser}
                  columns={USER_REVENUE_LIST}
                  defaultSort={{
                    column: "total_profit_amount_usd",
                    order: SortType.DESC,
                  }}
                />
              </div>
            )}
            {activeTab === "country" && (
              <div className="flow-root">
                <CustomTable
                  getData={getRevenueByCountry}
                  columns={COUNTRY_REVENUE_LIST_COLUMN}
                  defaultSort={{
                    column: "total_profit_amount_usd",
                    order: SortType.DESC,
                  }}
                />
              </div>
            )}
          </div>

          <div
            className={cn(
              "sticky top-[90px] flex max-h-[800px] flex-col gap-4",
            )}
          >
            <div className="overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <DateRangePicker
                onChange={onRangeChange}
                showPreview
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={selectionRange}
                showMonthAndYearPickers={false}
                direction="vertical"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className=" rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                Top 3 Revenue Games
                <div className="mt-1 flex flex-col justify-between gap-1">
                  {top3Games.map((game, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-start gap-8 text-sm"
                    >
                      {game.icon}
                      <div>
                        {game.title}
                        {renderValue(game.ggr_amount_usd, "currency")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className=" rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                Top 3 Revenue Players
                <div className="mt-4 flex flex-col justify-between gap-6">
                  {top3Players.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-8 text-sm"
                    >
                      {user.name}
                      {renderValue(user.total_profit_amount_usd, "currency")}
                    </div>
                  ))}
                </div>
              </div>
              <div className=" rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                Top 3 Revenue Countries
                <div className="mt-4 flex flex-col justify-between gap-4">
                  {top3Countries.map((country, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-8 text-sm"
                    >
                      {country.country}
                      {renderValue(country.total_profit_amount_usd, "currency")}
                    </div>
                  ))}
                </div>
              </div>
              <div className=" rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
                Top 3 Revenue Providers
                <div className="mt-4 flex flex-col justify-between gap-4">
                  {top3Providers.map((provider, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-8 text-sm"
                    >
                      {provider.name}
                      {renderValue(provider.ggr_amount_usd, "currency")}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

const StatisticsDashboardWithAuth = withAuth(StatisticsDashboard);

export default StatisticsDashboardWithAuth;
