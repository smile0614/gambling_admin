import React, { useCallback, useEffect, useMemo, useState } from "react";
import MapOne from "../Maps/MapOne";
import StatsCard from "./StatsCard";
import { getCountryListWithUsers, getUserCount } from "@/services/apis/users";
import {
  getDepositCount,
  getHighestDeposit,
  getTopDeposit,
  getTotalDeposit,
} from "@/services/apis/deposit";
import {
  getHighestWithdraw,
  getTopWithdraw,
  getTotalWithdraw,
  getWithdrawCount,
  getWithdrawPendingCounts,
} from "@/services/apis/withdraw";
import {
  getGameById,
  getGameStatistics,
  getHighestBet,
  getHighestProfit,
  getHighestWin,
  getTopGames,
  getTopWagers,
  getTopWinners,
  getTotalProfit,
  getTotalWager,
} from "@/services/apis/game";
import CustomTable from "../common/Table/CustomTable";
import {
  COUNTRY_COLUMN,
  TOP_DEPOSIT_COLUMN,
  TOP_GAME_COLUMN,
  TOP_WAGER_COLUMN,
  TOP_WINNER_COLUMN,
  TOP_WITHDRAW_COLUMN,
} from "@/config/columns";
import { currencyFormat1, formatCompactNumber } from "@/utils/format";
import { PATH_PAGE } from "@/config/path";
import Link from "next/link";
import GameDetailModal from "../DetailModals/GaneDetailModal";
import cn from "classnames";
import CsrWrapper from "../CsrWrapper/CsrWrapper";
import LineChart from "../Charts/LineChart";
import BarChart from "../Charts/BarChart";
import SvgColor from "@/assets/svgs/SvgColor";

type statType = {
  title: string;
  value: string | number;
  categories?: Array<string | number>;
  data?: { name: string; data: number[] };
  type: string;
  color?: string;
  redirectUrl?: string;
  loading: boolean;
};

type TopType = "deposit" | "withdraw" | "wager" | "winner" | "game";

type ColumnType = Array<{ title: string; key: string; type: string }>;

const AdminDashboard: React.FC = () => {
  const [topDatas, setTopDatas] = useState<Record<string, statType>>({
    deposit: {
      title: "Today's Highest Deposit",
      value: 0,
      type: "currency",
      categories: [],
      data: { name: "", data: [] },
      loading: true,
    },
    withdraw: {
      title: "Today's Highest Withdraw",
      value: 0,
      type: "currency",
      categories: [],
      data: { name: "", data: [] },
      loading: true,
    },
    wager: {
      title: "Today's Highest Wager",
      value: 0,
      type: "currency",
      categories: [],
      data: { name: "", data: [] },
      loading: true,
    },
    winners: {
      title: "Today's Top Winners",
      value: 0,
      type: "currency",
      categories: [],
      data: { name: "", data: [] },
      loading: true,
    },
    games: {
      title: "Today's Top Games",
      value: 0,
      type: "currency",
      categories: [],
      data: { name: "", data: [] },
      loading: true,
    },
  });

  const [totalDatas, setTotalDatas] = useState<Record<string, statType>>({
    member: {
      title: "Total Member",
      value: 0,
      type: "integer",
      categories: [],
      data: { name: "", data: [] },
      redirectUrl: PATH_PAGE.management.player.users,
      loading: true,
    },
    deposit: {
      title: "Total Deposit",
      value: 0,
      categories: [],
      data: { name: "", data: [] },
      type: "currency",
      color: "text-[limegreen]",
      redirectUrl: `${PATH_PAGE.statistics.depositAndWithdraw}/?type=deposit`,
      loading: true,
    },
    withdraw: {
      title: "Total Withdraw",
      value: 0,
      type: "currency",
      color: "text-[orangered]",
      categories: [],
      data: { name: "", data: [] },
      redirectUrl: `${PATH_PAGE.statistics.depositAndWithdraw}/?type=withdraw`,
      loading: true,
    },
    wager: {
      title: "Total Wager",
      value: 0,
      type: "currency",
      color: "text-[deepskyblue]",
      categories: [],
      data: { name: "", data: [] },
      redirectUrl: `${PATH_PAGE.statistics.wager}`,
      loading: true,
    },
    // lose: { title: "Total Lose", value: 0 },
    profit: {
      title: "Total Profit",
      value: 0,
      type: "currency",
      color: "text-indigo-600",
      categories: [],
      data: { name: "", data: [] },
      redirectUrl: `${PATH_PAGE.statistics.wager}`,
      loading: true,
    },
  });

  const [transactionDatas, setTransactionDatas] = useState<
    Record<string, statType>
  >({
    pendings: {
      title: "Pending Withdrawals Count",
      value: 0,
      type: "integer",
      color: "text-[orangered]",
      redirectUrl: `${PATH_PAGE.statistics.depositAndWithdraw}/?type=withdraw&status=pending`,
      loading: true,
    },
    withdrawCount: {
      title: "Withdraw Counts",
      value: 0,
      type: "integer",
      color: "text-[deepskyblue]",
      redirectUrl: `${PATH_PAGE.statistics.depositAndWithdraw}/?type=withdraw`,
      loading: true,
    },
    depositCount: {
      title: "Deposit Count",
      value: 0,
      type: "integer",
      color: "text-[limegreen]",
      redirectUrl: `${PATH_PAGE.statistics.depositAndWithdraw}/?type=deposit`,
      loading: true,
    },
  });

  const [highestDatas, setHighestDatas] = useState<Record<string, statType>>({
    wager: {
      title: "Highest Wager",
      value: 0,
      type: "currency",
      loading: true,
      redirectUrl: `${PATH_PAGE.management.player.users}?sort=wager`,
    },
    win: {
      title: "Highest Win",
      value: 0,
      type: "currency",
      loading: true,
      redirectUrl: `${PATH_PAGE.management.player.users}?sort=win`,
    },
    // lose: { title: "Highest Lose", value: 0 },
    profit: {
      title: "Highest Profit",
      value: 0,
      type: "currency",
      loading: true,
      redirectUrl: `${PATH_PAGE.management.player.users}?sort=profit`
    },
    deposit: {
      title: "Highest Deposit",
      value: 0,
      type: "currency",
      loading: true,
      redirectUrl: `${PATH_PAGE.management.player.users}?sort=deposit`
    },
    withdraw: {
      title: "Highest Withdraw",
      value: 0,
      type: "currency",
      loading: true,
      redirectUrl: `${PATH_PAGE.management.player.users}?sort=withdraw`
    },
  });

  const [usersWithCountry, setUsersWithCountry] = useState<
    Array<{
      country: string;
      countryFullName: any;
      value: number;
      betAmount: number;
      profitAmount: number;
    }>
  >([]);

  const [isSelectedGame, setIsSelectedGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>();

  const getGameDetail = async (gameId: string) => {
    if (!gameId) return;
    const response = await getGameById({ id: gameId });
    const statistics = await getGameStatistics({ game_id: gameId });
    setSelectedGame({
      id: response?.id || "",
      title: response?.title || "",
      identifier: response?.identifier || "",
      provider: response?.provider || "",
      theme: response?.theme || "",
      category: response?.category || "",
      payout: response?.payout,
      wager: statistics?.total_wager_amount_usd,
      profit: statistics?.total_profit_amount_usd,
    });
    setIsSelectedGame(true);
  };

  const getTopData = useCallback(
    async (
      page: number,
      limit: number,
      type: "deposit" | "withdraw" | "wager" | "winner" | "game",
    ) => {
      const now = new Date();

      const endTime = Math.floor(now.getTime() / 1000);

      now.setHours(0, 0, 0, 0);

      const startTime = Math.floor(now.getTime() / 1000); // today

      const count = 5;
      let response: any;
      let data: any;
      const todayData = { start_time: startTime, end_time: endTime, count }; // today
      switch (type) {
        case "wager":
          response = await getTopWagers(todayData);
          data = response.map((res: any) => ({
            userId: res?.id || "",
            name: res?.name || "",
            amount: Number(res?.sum || 0),
          }));

          return { data };
        case "winner":
          response = await getTopWinners(todayData);
          data = response.map((res: any) => ({
            userId: res?.id || "",
            name: res?.name || "",
            amount: Number(res?.sum || 0),
          }));
          return { data };
        case "game":
          response = await getTopGames(todayData);
          data = response.map((res: any) => ({
            id: res?.id || "",
            name: res?.title || "",
            identifier: res?.identifier || "",
            bets: Number(res?.bet_count || 0),
          }));
          return { data };
        case "withdraw":
          response = await getTopWithdraw(todayData);
          data = response.map((res: any) => ({
            userId: res?.user_id || "",
            name: res?.name || "",
            amount: Number(res.amount_usd || 0),
          }));
          return { data };
        case "deposit":
          response = await getTopDeposit(todayData);
          data = response.map((res: any) => ({
            userId: res?.user_id || "",
            name: res?.user_name || "",
            amount: Number(res.amount_usd || 0),
          }));
          return { data };

        default:
          return { data: [] };
      }

      return { data: [] };
    },
    [],
  );

  const getCountryData = useCallback(async (page: number, limit: number) => {
    const endTime = Math.floor(Date.now() / 1000);
    const response = await getCountryListWithUsers({
      start_time: 0,
      end_time: endTime,
    });
    const data = response.map((res: any, index: number) => ({
      countryFullName: (
        <>
          <Link
            href={`${PATH_PAGE.management.player.users}?country=${res?.country}`}
            className="font-bold"
          >
            {res?.country_full_name || ""}
          </Link>
        </>
      ),
      country: res?.country || "",
      value: Number(res?.count || 0),
      betAmount: Number(res?.bet_amount_usd || 0),
      profitAmount: Number(res?.earning_amount_usd || 0),
    }));
    return { data };
  }, []);

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

  const initLoad = async () => {
    const now = new Date();

    const interval = 60 * 24;

    const startTime = 0; // all data

    const endTime = Math.floor(now.getTime() / 1000);

    now.setHours(0, 0, 0, 0);

    const todayTime = Math.floor(now.getTime() / 1000); // today

    const startData = {
      start_time: startTime,
      end_time: endTime,
      interval: interval,
    }; // total
    const todayData = {
      start_time: todayTime,
      end_time: endTime,
      interval: -1,
    }; // today

    const [
      _resUserTotals,
      _resTotalDeposit,
      _resTotalWithdraw,
      _resTotalWager,
      _resTotalProfit,
      _resCountryWithUsers,

      _resHighWager,
      _resHighWin,
      // _resHighLose,
      _resHighProfit,
      _resHighWithdraw,
      _resHighDeposit,
      _resPendings,
      _resDepositCounts,
      _resWithdrawCounts,

      //top datas
      _resTopDeposits,
      _resTopWithdraw,
      _resTopWager,
      _resTopWinner,
      _resTopGame,
    ] = await Promise.all([
      getUserCount(startData),
      getTotalDeposit(startData),
      getTotalWithdraw(startData),
      getTotalWager(startData),
      // getTotalLose(startData),
      getTotalProfit(startData),

      // getUserCount(todayData),

      getCountryData(1, 10),

      getHighestBet(),
      getHighestWin(),
      // getHighestLose(),
      getHighestProfit(),
      getHighestWithdraw(),
      getHighestDeposit(),
      getWithdrawPendingCounts(),
      getDepositCount(),
      getWithdrawCount(),

      getTopData(1, 10, "deposit"),
      getTopData(1, 10, "withdraw"),
      getTopData(1, 10, "wager"),
      getTopData(1, 10, "winner"),
      getTopData(1, 10, "game"),
    ]);
    const _tempTotalDatas = {
      member: {
        ...totalDatas.member,
        value: _resUserTotals.reduce(
          (_sum: number, _user: any) => _sum + Number(_user?.count || 0),
          0,
        ),
        categories: _resUserTotals.map((item: any) => Number(item.from) * 1000),
        data: {
          name: "",
          data: _resUserTotals.map((item: any) => Number(item?.count || 0)),
        },
        loading: false,
      },
      deposit: {
        ...totalDatas.deposit,
        value: _resTotalDeposit.reduce(
          (_sum: number, _data: any) => _sum + Number(_data?.sum || 0),
          0,
        ),
        categories: _resTotalDeposit.map(
          (item: any) => Number(item.from) * 1000,
        ),
        data: {
          name: "",
          data: _resTotalDeposit.map((item: any) => Number(item?.sum || 0)),
        },
        loading: false,
      },
      withdraw: {
        ...totalDatas.withdraw,
        value: _resTotalWithdraw.reduce(
          (_sum: number, _data: any) => _sum + Number(_data?.sum || 0),
          0,
        ),
        categories: _resTotalWithdraw.map(
          (item: any) => Number(item.from) * 1000,
        ),
        data: {
          name: "",
          data: _resTotalWithdraw.map((item: any) => Number(item?.sum || 0)),
        },
        loading: false,
      },
      wager: {
        ...totalDatas.wager,
        value: _resTotalWager.reduce(
          (_sum: number, _data: any) => _sum + Number(_data?.sum || 0),
          0,
        ),
        categories: _resTotalWager.map((item: any) => Number(item.from) * 1000),
        data: {
          name: "",
          data: _resTotalWager.map((item: any) => Number(item?.sum || 0)),
        },
        loading: false,
      },
      // lose: {
      //   ...totalDatas.lose,
      //   value: Number(_resTotalProfit[0].sum || 0).toFixed(4),
      // },
      profit: {
        ...totalDatas.profit,
        value: _resTotalProfit.reduce(
          (_sum: number, _data: any) => _sum + Number(_data?.sum || 0),
          0,
        ),
        color:
          _resTotalProfit[0].sum > 0 ? "text-[limegreen]" : "text-[orangered]",
        categories: _resTotalProfit.map(
          (item: any) => Number(item.from) * 1000,
        ),
        data: {
          name: "",
          data: _resTotalProfit.map((item: any) => Number(item?.sum || 0)),
        },
        loading: false,
      },
    };

    const _tempTransactionDatas = {
      pendings: {
        ...transactionDatas.pendings,
        value: Number(_resPendings?.count || 0),
        loading: false,
      },
      withdrawCount: {
        ...transactionDatas.withdrawCount,
        value: Number(_resWithdrawCounts?.count || 0),
        loading: false,
      },
      depositCount: {
        ...transactionDatas.depositCount,
        value: Number(_resDepositCounts?.count || 0),
        loading: false,
      },
    };

    const _tempHighDatas = {
      wager: {
        ...highestDatas.wager,
        value: Number(_resHighWager.amount_usd || 0).toFixed(4),
        loading: false,
      },
      win: {
        ...highestDatas.win,
        value: Number(_resHighWin.amount_usd || 0).toFixed(4),
        loading: false,
      },
      // lose: {
      //   ...highestDatas.lose,
      //   value: Number(_resHighLose.amount_usd || 0).toFixed(4),
      // },
      profit: {
        ...highestDatas.profit,
        value: Number(_resHighProfit.amount_usd || 0).toFixed(4),
        loading: false,
      },
      deposit: {
        ...highestDatas.deposit,
        value: Number(_resHighDeposit.amount_usd || 0).toFixed(4),
        loading: false,
      },
      withdraw: {
        ...highestDatas.withdraw,
        value: Number(_resHighWithdraw.amount_usd || 0).toFixed(4),
        loading: false,
      },
    };

    const _tempTopDatas = {
      deposit: {
        ...topDatas.deposit,
        value: _resTopDeposits.data.reduce(
          (_sum: number, data: any) => _sum + Number(data?.amount || 0),
          0,
        ),
        categories: _resTopDeposits.data.map((item: any) => item.name),
        data: {
          name: "Amount $",
          data: _resTopDeposits.data.map((item: any) =>
            Number(item?.amount || 0),
          ),
        },
        loading: false,
      },
      withdraw: {
        ...topDatas.withdraw,
        value: _resTopWithdraw.data.reduce(
          (_sum: number, data: any) => _sum + Number(data?.amount || 0),
          0,
        ),
        categories: _resTopWithdraw.data.map((item: any) => item.name),
        data: {
          name: "Amount $",
          data: _resTopWithdraw.data.map((item: any) =>
            Number(item?.amount || 0),
          ),
        },
        loading: false,
      },
      wager: {
        ...topDatas.wager,
        value: _resTopWager.data.reduce(
          (_sum: number, data: any) => _sum + Number(data?.amount || 0),
          0,
        ),
        categories: _resTopWager.data.map((item: any) => item.name),
        data: {
          name: "Amount $",
          data: _resTopWager.data.map((item: any) => Number(item?.amount || 0)),
        },
        loading: false,
      },
      winners: {
        ...topDatas.winners,
        value: _resTopWinner.data.reduce(
          (_sum: number, data: any) => _sum + Number(data?.amount || 0),
          0,
        ),
        categories: _resTopWinner.data.map((item: any) => item.name),
        data: {
          name: "Amount $",
          data: _resTopWinner.data.map((item: any) =>
            Number(item?.amount || 0),
          ),
        },
        loading: false,
      },
      games: {
        ...topDatas.games,
        value: _resTopGame.data.reduce(
          (_sum: number, data: any) => _sum + Number(data?.bets || 0),
          0,
        ),
        categories: _resTopGame.data.map((item: any) => item.name),
        data: {
          name: "Bet Counts",
          data: _resTopGame.data.map((item: any) => Number(item?.bets || 0)),
        },
        loading: false,
      },
    };

    setTotalDatas(_tempTotalDatas);
    // setTodayDatas(_tempTodayDatas);
    setTransactionDatas(_tempTransactionDatas);
    setUsersWithCountry(_resCountryWithUsers.data);
    setHighestDatas(_tempHighDatas);
    setTopDatas(_tempTopDatas);
  };

  useEffect(() => {
    initLoad();
  }, []);

  const renderCountryData = useMemo(() => {
    return (
      <>
        <div className="col-span-12 rounded-lg xl:col-span-9">
          <MapOne data={usersWithCountry} />
        </div>

        <div className="col-span-6 h-full overflow-y-auto rounded-lg bg-white dark:bg-boxdark lg:col-span-3">
          <div className="flex flex-col px-4 pt-4">
            <div
              className={cn(
                "flex justify-between pb-[2px] text-[12px] lg:text-[14px]",
              )}
            >
              Country
              <p>User Count</p>
            </div>
            <div className="h-[1px] w-full bg-gray"></div>

            <div
              className={cn(
                "flex justify-between pb-[2px] text-[12px] lg:text-[14px]",
              )}
            >
              <p>Bet Amount</p>
              <p>Profit Amount</p>
            </div>
          </div>
          <div className="flex max-h-[450px] flex-col gap-[8px] overflow-y-auto p-4">
            {usersWithCountry.map((userData, index) => (
              <div className="flex flex-col" key={index}>
                <div
                  className={cn(
                    "flex justify-between pb-[2px] text-[12px] text-black dark:text-white lg:text-[14px]",
                  )}
                >
                  {userData.countryFullName}
                  <p className="font-bold">{userData.value}</p>
                </div>
                <div className="h-[2px] w-full bg-gray">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(userData.value / usersWithCountry.reduce((_sum, user) => _sum + user.value, 0)) * 100}%`,
                    }}
                  />
                </div>

                <div
                  className={cn(
                    "flex justify-between pb-[2px] text-[12px] text-black dark:text-white lg:text-[14px]",
                  )}
                >
                  <p className="text-[14px]">
                    {currencyFormat1(userData.betAmount)}
                  </p>
                  <p
                    className={cn("font-bold", {
                      "text-[limegreen]": userData.profitAmount < 0,
                      "text-[orangered]": userData.profitAmount > 0,
                    })}
                  >
                    {currencyFormat1(Math.abs(userData.profitAmount))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }, [usersWithCountry, getCountryData]);

  /** ************************ Table Display of Highest Datas *********************************** */
  // const renderTopDatas = useMemo(() => {
  //   return topDatas.map((top, index) => (
  //     <div key={index} className="col-span-12 xl:col-span-4">
  //       <div className="rounded-sm border border-stroke bg-white px-4 pb-8 pt-6 dark:border-strokedark dark:bg-boxdark sm:px-4">
  //         <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
  //           {top.title}
  //         </h4>
  //         <div className="overflow-x-auto border border-solid border-slate-200 dark:border-strokedark sm:rounded-lg">
  //           <CustomTable
  //             columns={top.columns}
  //             isPagniation={false}
  //             getData={(page: number, limit: number) =>
  //               getTopData(page, limit, top.type)
  //             }
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   ));
  // }, []);

  const renderTotalData = useCallback(
    (data: statType, key: string | number) => {
      return (
        <div
          className="flex flex-col rounded-lg border border-stroke bg-white p-2 shadow-default dark:border-strokedark dark:bg-boxdark"
          key={key}
        >
          <div className="flex justify-between px-3">
            <p className="font-bold text-black dark:text-white">{`${data.title}`}</p>
            <div className="flex gap-2">
              {renderValue(data.value, data.type)}
              {data.redirectUrl && (
                <Link
                  href={data.redirectUrl}
                  className="flex flex-col items-center justify-center"
                >
                  <SvgColor
                    src="/assets/icons/eye.svg"
                    style={{ width: 14, height: 14 }}
                  />
                </Link>
              )}
            </div>
          </div>
          <LineChart
            title={"Wager"}
            datas={[data.data || { name: "", data: [] }]}
            categories={data.categories || []}
            chartOption={{ yaxis: { show: false } }}
          />
        </div>
      );
    },
    [],
  );

  const renderTopDatas = useCallback((data: statType, key: string | number) => {
    return (
      <div
        className="flex flex-col rounded-lg border border-stroke bg-white p-2 shadow-default dark:border-strokedark dark:bg-boxdark"
        key={key}
      >
        <div className="flex justify-between px-3">
          <p className="font-bold text-black dark:text-white">{`${data.title}`}</p>
        </div>
        <CsrWrapper>
          <BarChart
            title={data.title}
            datas={[data.data || { name: "", data: [] }]}
            categories={data.categories || []}
            categoryType={"category"}
            chartOption={{ yaxis: { show: false } }}
          />
        </CsrWrapper>
      </div>
    );
  }, []);

  return (
    <>
      <div className="grid w-full grid-cols-12 gap-4">{renderCountryData}</div>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
        {/* {Object.keys(totalDatas).map((key, _i) => (
          <StatsCard
            key={_i}
            title={totalDatas[key]["title"]}
            value={
              totalDatas[key]["type"] === "integer"
                ? totalDatas[key].value
                : formatCompactNumber(Number(totalDatas[key].value), {
                    style: totalDatas[key].type,
                    currency: "USD",
                    maximumFractionDigits: 4,
                    miniumFractionDigits: 2,
                  })
            }
            color={totalDatas[key].color}
          />
        ))} */}
        {Object.keys(totalDatas).map((key, _i) =>
          renderTotalData(totalDatas[key], _i),
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-3">
        {Object.keys(transactionDatas).map((key, _i) => (
          <StatsCard
            key={_i}
            title={transactionDatas[key]["title"]}
            value={
              transactionDatas[key]["type"] === "integer"
                ? transactionDatas[key].value
                : formatCompactNumber(Number(transactionDatas[key].value), {
                    style: transactionDatas[key].type,
                    currency: "USD",
                    maximumFractionDigits: 4,
                    miniumFractionDigits: 2,
                  })
            }
            url={transactionDatas[key].redirectUrl || ""}
            color={transactionDatas[key].color}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
            {Object.keys(highestDatas).map((key, _i) => (
              <StatsCard
                key={_i}
                title={highestDatas[key]["title"]}
                value={
                  highestDatas[key]["type"] === "integer"
                    ? highestDatas[key].value
                    : formatCompactNumber(Number(highestDatas[key].value), {
                        style: highestDatas[key].type,
                        currency: "USD",
                        maximumFractionDigits: 4,
                        miniumFractionDigits: 2,
                      })
                }
                url={highestDatas[key].redirectUrl}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
        {Object.keys(topDatas).map((key, _i) =>
          renderTopDatas(topDatas[key], _i),
        )}
      </div>

      <GameDetailModal
        show={isSelectedGame}
        setShow={setIsSelectedGame}
        onClose={() => setIsSelectedGame(false)}
        gameInfo={selectedGame}
      />
    </>
  );
};

export default AdminDashboard;
