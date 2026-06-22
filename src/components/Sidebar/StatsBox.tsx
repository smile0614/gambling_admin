"use client";
import { AppState, useAppDispatch } from "@/redux/store";
import RoleBasedGuard from "@/hooks/RoleBaseGuard";
import {
  getMainBalance,
  getStatistics,
} from "@/redux/reducers/statistics.reducer";

import { ROLES, SortType } from "@/types";
import { formatCompactNumber } from "@/utils/format";
import React, { ReactNode, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { getMainWalletBalance } from "@/services/apis/balance";
import { getTierTreeDataById } from "@/services/apis/tier";
import { getTotalDeposit } from "@/services/apis/deposit";
import { getTotalProfit, getTotalWager } from "@/services/apis/game";
import { getTotalWithdraw } from "@/services/apis/withdraw";
import { getLiveUserList, getUserActive, getUserCount } from "@/services/apis/users";
import cn from "classnames";
import SvgColor from "@/assets/svgs/SvgColor";
import StatsDetailModal from "../Popup/Stats/StatsDetailPopup";
import { setShowTodayStatsModal } from "@/redux/reducers/modal.reducer";
import { PATH_PAGE } from "@/config/path";
import Link from "next/link";
import { getTotalBonus } from "@/services/apis/bonus";

const allPermission = [ROLES.ADMIN, ROLES.TIER1, ROLES.TIER2, ROLES.TIER3];

const StatsBox = () => {
  const dispatch = useAppDispatch();

  const renderValue = (val: any, type: string) => {
    switch (type) {
      case "currency-raw":
        return (
          <span
            className={cn({
              "text-[orangered]": val < 0,
              "text-[limegreen]": val > 0,
            })}
          >
            {formatCompactNumber(val, {
              // notation: "compact",
              maximumFractionDigits: 2,
              miniumFractionDigits: 2,
              currency: "USD",
              style: "currency",
            })}
          </span>
        );
      case "currency":
        return (
          <span
            className={cn({
              "text-[orangered]": val < 0,
              "text-[limegreen]": val > 0,
            })}
          >
            {formatCompactNumber(val, {
              notation: "compact",
              maximumFractionDigits: 2,
              miniumFractionDigits: 2,
              currency: "USD",
              style: "currency",
            })}
          </span>
        );
      case "integer":
        return val;

      default:
        return val;
    }
  };

  const calcIncreaseRate = (val: number, prev: number) => {
    return prev > 0 ? (val - prev) / prev : (val - prev) / 1;
  };

  const { user, depositWalletBalance, withdrawWalletBalance } = useSelector(
    (state: AppState) => ({
      user: state.auth.user,
      depositWalletBalance: state.statistics.depositMainWalletBalance,
      withdrawWalletBalance: state.statistics.withdrawMainWalletBalance,
    }),
    shallowEqual,
  );
  const [activeUser, setActiveUser] = useState<number>(0);
  const [statisticsData, setStatisticsData] = useState<
    Record<
      string,
      {
        title: ReactNode;
        value: number;
        color?: string;
        roles?: ROLES[];
        type: string;
        rate: boolean;
        increaseRate?: number;
        redirect: string;
      }
    >
  >({
    deposit: {
      title: "Deposit",
      value: 0,
      // color: "text-[limegreen]",
      type: "currency",
      rate: true,
      increaseRate: 0,
      redirect: PATH_PAGE.statistics.depositAndWithdraw,
    },
    withdraw: {
      title: "Withdraw",
      value: 0,
      // color: "text-[orangered]",
      type: "currency",
      rate: true,
      increaseRate: 0,
      redirect: `${PATH_PAGE.statistics.depositAndWithdraw}/?type=withdraw`,
    },
    wager: {
      title: "Wager",
      value: 0,
      // color: "text-[deepskyblue]",
      type: "currency-raw",
      rate: true,
      increaseRate: 0,
      redirect: `${PATH_PAGE.statistics.wager}`,
    },
    // adminDeposit: {
    //   title: "Deposit Balance",
    //   value: 0,
    //   color: "text-[orangered]",
    //   roles: [ROLES.ADMIN],
    //   type: "currency",
    // },
    // adminWithdraw: {
    //   title: "Withdraw Balance",
    //   value: 0,
    //   color: "text-[orangered]",
    //   roles: [ROLES.ADMIN],
    //   type: "currency",
    // },

    profit: {
      title: "Profit",
      value: 0,
      // color: "text-[deepskyblue]",
      type: "currency",
      rate: true,
      increaseRate: 0,
      redirect: PATH_PAGE.statistics.systemGrowth,
    },
    bonus: {
      title: "Bonus",
      value: 0,
      type: "currency",
      rate: false,
      redirect: PATH_PAGE.statistics.bonus,
    },
    // newUser: { title: "Active", value: 0, type: 'integer', rate: true, increaseRate: 0, color: "text-[limegreen]", redirect: PATH_PAGE.management.player.users },
  });

  const getStatistics = async (userId: string, userRole: ROLES) => {
    const now = new Date();
    const endTime = Math.floor(now.getTime() / 1000);

    now.setHours(0, 0, 0, 0);
    const startTime = Math.floor(now.getTime() / 1000);

    const today = {
      id: userId,
      start_time: startTime,
      end_time: endTime,
      interval: -1,
    };

    const yesterday = {
      id: userId,
      start_time: startTime - 24 * 60 * 60,
      end_time: endTime - 24 * 60 * 60,
      interval: -1,
    };

    let _tempStatistics = { ...statisticsData };

    const [
      _resBonus,
      _resDeposit,
      _resWager,
      _resWithdraw,
      _resProfit,
      _resLiveUsers,

      _resYesterdayDeposit,
      _resYesterdayWager,
      _resYesterdayWithdraw,
      _resYesterdayProfit,
    ] = await Promise.all([
      getTotalBonus(today),
      getTotalDeposit(today),
      getTotalWager(today),
      getTotalWithdraw(today),
      getTotalProfit(today),

      getLiveUserList({
        page: 1,
        page_size: 10,
        search: "",
        sort_column: "name",
        sort_order: SortType.ASC,
      }),


      getTotalDeposit(yesterday),
      getTotalWager(yesterday),
      getTotalWithdraw(yesterday),
      getTotalProfit(yesterday),
      // getUserCount(today),
      // getUserCount({ start_time: 0, end_time: endTime, interval: -1 }),
      // getLiveUserList({ page: 1, page_size: 20, search: '' })
    ]);

    setStatisticsData({
      ..._tempStatistics,
      deposit: {
        ...statisticsData.deposit,
        value: Number(_resDeposit[0]?.sum || 0),
        increaseRate: Number(_resYesterdayDeposit[0]?.sum || 0),
      },
      withdraw: {
        ...statisticsData.withdraw,
        value: Number(_resWithdraw[0]?.sum || 0),
        increaseRate: Number(_resYesterdayWithdraw[0]?.sum || 0),
      },
      wager: {
        ...statisticsData.wager,
        value: Number(_resWager[0]?.sum || 0),
        increaseRate: Number(_resYesterdayWager[0]?.sum || 0),
      },
      profit: {
        ...statisticsData.profit,
        value: Number(_resProfit[0]?.sum || 0),
        increaseRate: Number(_resYesterdayProfit[0]?.sum || 0),
      },
      bonus: {
        ...statisticsData.bonus,
        value: Number(_resBonus[0].sum || 0),
      },
      // newUser: {
      //   ...statisticsData.newUser,
      //   value: Number(_resTodayRegisteredUsers.count || 0),
      //   increaseRate: Number(_resYesterdayRegisteredUsers?.count || 0)
      // }
    });
    setActiveUser(Number(_resLiveUsers.total_count || 0));
  };

  useEffect(() => {
    if (user.id) {
      getStatistics(user.id, user.role);
      if (user.role === ROLES.ADMIN) {
        // dispatch(getMainBalance());
      }
    }
  }, [user]);

  // useEffect(() => {
  //   const _depositBalance = depositWalletBalance.reduce(
  //     (_sum, _balance) => _sum + _balance.balanceUsd,
  //     0,
  //   );
  //   const _withdrawBalance = withdrawWalletBalance.reduce(
  //     (_sum, _balance) => _sum + _balance.balanceUsd,
  //     0,
  //   );
  //   setStatisticsData({
  //     ...statisticsData,
  //     adminDeposit: {
  //       ...statisticsData.adminDeposit,
  //       value: _depositBalance,
  //     },
  //     adminWithdraw: {
  //       ...statisticsData.adminWithdraw,
  //       value: _withdrawBalance,
  //     },
  //   });
  // }, [depositWalletBalance, withdrawWalletBalance, statisticsData]);

  return (
    <RoleBasedGuard roles={[ROLES.ADMIN]}>
      <div className="text-md group relative mx-5 flex w-full items-center justify-start gap-5 px-4 font-medium capitalize text-bodydark2 duration-300 ease-in-out">
        <div
          className="flex cursor-pointer gap-2 text-primary hover:underline"
          onClick={() => dispatch(setShowTodayStatsModal(true))}
        >
          <span className="text-primary">Today STATS</span>
          {/* <div className="flex cursor-pointer items-center justify-center">
            <SvgColor
              src="/assets/icons/eye.svg"
              style={{ width: 20, height: 20 }}
            />
          </div> */}
        </div>{" "}
        <div className="flex flex-row gap-4 rounded-lg px-4 py-2">
          {Object.keys(statisticsData).map((key, _i) => (
            <RoleBasedGuard
              key={_i}
              roles={
                statisticsData[key].roles || [
                  ROLES.ADMIN,
                  ROLES.TIER1,
                  ROLES.TIER2,
                  ROLES.TIER3,
                ]
              }
            >
              <div
                className={`flex items-center gap-1 text-[14px] ${statisticsData[key].color}`}
              >
                <Link href={statisticsData[key].redirect}>
                  {statisticsData[key].title}{" "}
                </Link>
                <div>
                  {renderValue(
                    statisticsData[key].value,
                    statisticsData[key].type,
                  )}
                </div>
                {statisticsData[key].rate && (
                  <div
                    className={cn("flex items-center text-[12px]", {
                      "text-[limegreen]":
                        calcIncreaseRate(
                          statisticsData[key].value,
                          statisticsData[key]?.increaseRate || 0,
                        ) > 0,
                      "text-[orangered]":
                        calcIncreaseRate(
                          statisticsData[key].value,
                          statisticsData[key]?.increaseRate || 0,
                        ) < 0,
                    })}
                  >
                    <SvgColor
                      src="/assets/icons/arrowBold.svg"
                      className={cn({
                        "rotate-180":
                          calcIncreaseRate(
                            statisticsData[key].value,
                            statisticsData[key]?.increaseRate || 0,
                          ) < 0,
                      })}
                      style={{ width: 20, height: 20 }}
                    />
                    {formatCompactNumber(
                      calcIncreaseRate(
                        statisticsData[key].value,
                        statisticsData[key]?.increaseRate || 0,
                      ),
                      {
                        notation: "compact",
                        style: "percent",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                        signDisplay: "never",
                      },
                    )}
                  </div>
                )}
              </div>
            </RoleBasedGuard>
          ))}
          <Link
            className="flex items-center justify-center gap-2 text-[limegreen] hover:underline"
            href={`${PATH_PAGE.management.player.users}?type=online`}
          >
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[limegreen] opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-[limegreen]"></span>
            </div>

            {`Online: ${activeUser}`}
          </Link>
        </div>
      </div>
    </RoleBasedGuard>
  );
};

export default StatsBox;
