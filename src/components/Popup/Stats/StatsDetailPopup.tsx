import { shallowEqual, useSelector } from "react-redux";
import CustomPopup from "../CustomPopup";
import { AppState } from "@/redux/store";
import { getTierTreeDataById } from "@/services/apis/tier";
import { getTotalDeposit } from "@/services/apis/deposit";
import { getTotalProfit, getTotalWager } from "@/services/apis/game";
import { getTotalWithdraw } from "@/services/apis/withdraw";
import { getLiveUserList } from "@/services/apis/users";
import { useEffect, useState } from "react";
import { ROLES, SortType } from "@/types";
import RoleBasedGuard from "@/hooks/RoleBaseGuard";
import { formatCompactNumber } from "@/utils/format";
import cn from "classnames";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { getTotalBonus } from "@/services/apis/bonus";

interface StatsDetailModalProps {
  show: boolean;
  onClose: () => void;
  setShow: (show: boolean) => void;
}

interface SelectionRagneType {
  startDate: Date;
  endDate: Date;
  key: string;
}

const StatsDetailModal: React.FC<StatsDetailModalProps> = ({
  show,
  onClose,
  setShow,
}) => {
  const { user, depositWalletBalance, withdrawWalletBalance } = useSelector(
    (state: AppState) => ({
      user: state.auth.user,
      depositWalletBalance: state.statistics.depositMainWalletBalance,
      withdrawWalletBalance: state.statistics.withdrawMainWalletBalance,
    }),
    shallowEqual,
  );

  const [selectionRange, setSelectionRange] = useState<
    Array<SelectionRagneType>
  >([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [statisticsData, setStatisticsData] = useState<
    Record<
      string,
      {
        title: string;
        value: number;
        color?: string;
        roles?: ROLES[];
        type: string;
      }
    >
  >({
    deposit: {
      title: "Deposit",
      value: 0,
      color: "text-[limegreen]",
      type: "currency",
    },
    withdraw: {
      title: "Withdraw",
      value: 0,
      color: "text-[orangered]",
      type: "currency",
    },
    wager: {
      title: "Wager",
      value: 0,
      color: "text-[deepskyblue]",
      type: "currency",
    },

    profit: {
      title: "Profit",
      value: 0,
      color: "text-[deepskyblue]",
      type: "currency",
    },
    bonus: { title: "Bonus Amount", value: 0, type: "currency" },
    activeUser: {
      title: "Online",
      value: 0,
      color: "text-[limegreen]",
      type: "integer",
    },
  });

  const getStatistics = async (userId: string, userRole: ROLES) => {
    const startTime = selectionRange.at(0)?.startDate || new Date();
    const endTime = selectionRange.at(0)?.endDate || new Date();

    startTime.setHours(0, 0, 0, 0);
    endTime.setHours(23, 59, 59, 0);

    const today = {
      id: userId,
      start_time: startTime.getTime() / 1000,
      end_time: endTime.getTime() / 1000,
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

      // getUserCount(today),
      // getUserCount({ start_time: 0, end_time: endTime, interval: -1 }),
      // getLiveUserList({ page: 1, page_size: 20, search: '' })
    ]);

    setStatisticsData({
      ..._tempStatistics,
      deposit: {
        ...statisticsData.deposit,
        value: Number(_resDeposit[0]?.sum || 0),
      },
      withdraw: {
        ...statisticsData.withdraw,
        value: Number(_resWithdraw[0]?.sum || 0),
      },
      wager: {
        ...statisticsData.wager,
        value: Number(_resWager[0]?.sum || 0),
      },
      profit: {
        ...statisticsData.profit,
        value: Number(_resProfit[0]?.sum || 0),
      },
      bonus: {
        ...statisticsData.bonus,
        value: Number(_resBonus[0]?.sum || 0),
      },
      activeUser: {
        ...statisticsData.activeUser,
        value: Number(_resLiveUsers.total_count || 0),
      },
    });
  };

  useEffect(() => {
    if (user.id) {
      getStatistics(user.id, user.role);
    }
  }, [user, selectionRange]);

  const renderValue = (val: any, type: string) => {
    switch (type) {
      case "currency":
        return (
          <span
            className={cn({
              "text-[orangered]": val < 0,
              "text-[limegreen]": val > 0,
            })}
          >
            {formatCompactNumber(val, {
              maximumFractionDigits: 4,
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

  const onRangeChange = (item: any) => {
    const tempRange: SelectionRagneType = {
      startDate: item?.selection?.startDate || new Date(),
      endDate: item?.selection?.endDate || new Date(),
      key: item?.selection?.key || "selection",
    };
    setSelectionRange([tempRange]);
  };

  return (
    <CustomPopup
      showModal={show}
      setShowModal={setShow}
      onClose={onClose}
      title="Daily Stat"
      classNames="max-w-[1260px]"
    >
      <div className="flex w-full gap-4">
        <div
          className={cn(
            "overflow-hidden rounded-lg border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark",
          )}
        >
          <DateRangePicker
            onChange={onRangeChange}
            showPreview
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={selectionRange}
            direction="horizontal"
            showMonthAndYearPickers={false}
          />
        </div>
        <div className="flex min-w-[245px] flex-col justify-between rounded-lg border border-stroke bg-white p-4 text-[14px] shadow-default dark:border-strokedark dark:bg-boxdark">
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
              <div className="flex justify-between">
                <div>{statisticsData[key].title} </div>
                <div>
                  {renderValue(
                    statisticsData[key].value,
                    statisticsData[key].type,
                  )}
                </div>
              </div>
            </RoleBasedGuard>
          ))}
        </div>
      </div>
    </CustomPopup>
  );
};

export default StatsDetailModal;
