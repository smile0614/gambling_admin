"use client";
import CustomTable from "@/components/common/Table/CustomTable";
import StatsCard from "@/components/Dashboard/StatsCard";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { TIER_PAYOUT_HISTORY_COLULMN } from "@/config/columns";
import RoleBasedGuard from "@/hooks/RoleBaseGuard";
import withAuth from "@/hooks/withAuth";
import { AppState } from "@/redux/store";
import { getPayoutHistory, getTierTreeDataById } from "@/services/apis/tier";
import { ROLES } from "@/types";
import { currencyFormat1, formatCompactNumber } from "@/utils/format";
import moment from "moment-timezone";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const TierDash: React.FC = () => {
  const allPermission = [ROLES.ADMIN, ROLES.TIER1, ROLES.TIER2, ROLES.TIER3];
  const userInfo = useSelector((state: AppState) => state.auth.user);
  const [line1Info, setLine1Info] = useState<
    Record<
      string,
      { label: string; data: string | number; type: string; role?: ROLES[] }
    >
  >({
    user: {
      label: "User Count Total(Direct/Tiers)",
      data: "",
      type: "text",
    },
    tier: {
      label: "Tier Count Tier1/Tier2/Tier3",
      data: "",
      type: "text",
    },
    deposit: {
      label: "Deposit Total(Direct/Tiers)",
      data: "",
      type: "text",
    },
    withdraw: {
      label: "Withdraw Total(Direct/Tiers)",
      data: "",
      type: "text",
    },
    playerWagerAmount: {
      label: "Wager Amount Total(Direct/Tiers)",
      data: "",
      type: "text",
    },
    playerWinAmount: {
      label: "Win Amount Total(Direct/Tiers)",
      data: "",
      type: "",
    },
    playerBonusAmount: {
      label: "Bonus Amount Total(Direct/Tiers)",
      data: "",
      type: "text",
    },
    systemProfitAmount: {
      label: "System Profit Total(Direct/Tiers)",
      data: "",
      type: "text",
    },
    wagerSettlement: {
      label: "Wager Settlement",
      data: 0,
      type: "percent",
    },
    losingSettlement: {
      label: "Losing Settlement",
      data: 0,
      type: "percent",
    },
    wagerCommissionAmount: {
      label: "Wager Commission Total(Direct/Tiers)",
      data: "",
      type: "text",
    },
    losingCommissionAmount: {
      label: "Losing Commission Total(Direct/Tiers)",
      data: "",
      type: "text",
    },
    payoutAmount: {
      label: "This month Payout Total(Direct/Tiers)",
      data: "",
      type: "text",
    },
    paidPayoutAmount: {
      label: "Paid Payout Amount",
      data: 0,
      type: "currency",
    },
    unpaidPayoutAmount: {
      label: "UnPaid Payout Amount",
      data: 0,
      type: "currency",
    },
  });

  const getPayout = useCallback(async (page: number, page_size: number) => {
    const response = await getPayoutHistory({ page, page_size });
    const data = response.map((res: any) => ({
      id: res?.id || "",
      confirmationAt:
        moment(res?.confirmed_at).format("yyyy-MM-DD HH:mm:ss") || "",
      payoutAt: moment(res?.payout_at).format("yyyy-MM-DD HH:mm:ss") || "",
      payoutAmountUsd: Number(res?.payout_amount_usd || 0),
      wagerSettlement: Number(res?.wager_settlement_percent || 0),
      losingSettlement: Number(res?.losing_settlement_percent || 0),
      wagerCommissionAmountUsd: Number(res?.wager_commission_amount_usd || 0),
      losingCommissionAmountUsd: Number(res?.losing_commission_amount_usd || 0),
      status: res?.status,
    }));
    return {
      data,
      page: 0,
      pageSize: 0,
      totalCount: 0,
      total_page: 0,
    };
  }, []);

  const getTierData = async () => {
    const response = await getTierTreeDataById({
      id: userInfo.id,
    });

    setLine1Info({
      user: {
        ...line1Info.user,
        data: `${response.user_count.total}(${response.user_count.direct}/${response.user_count.subtier})`,
      },
      tier: {
        ...line1Info.tier,
        data: `${response.tier_count.tier1}/${response.tier_count.tier2}/${response.tier_count.tier3}`,
      },
      deposit: {
        ...line1Info.deposit,
        data: `${currencyFormat1(response.deposit_amount_usd.total)}(${currencyFormat1(response.deposit_amount_usd.direct)}/${currencyFormat1(response.deposit_amount_usd.subtier)})`,
      },
      withdraw: {
        ...line1Info.withdraw,
        data: `${currencyFormat1(response.withdraw_amount_usd.total)}(${currencyFormat1(response.withdraw_amount_usd.direct)}/${currencyFormat1(response.withdraw_amount_usd.subtier)})`,
      },
      playerWagerAmount: {
        ...line1Info.playerWagerAmount,
        data: `${currencyFormat1(response.player_wager_amount_usd.total)}(${currencyFormat1(response.player_wager_amount_usd.direct)}/${currencyFormat1(response.player_wager_amount_usd.subtier)})`,
      },
      playerWinAmount: {
        ...line1Info.playerWinAmount,
        data: `${currencyFormat1(response.player_win_amount_usd.total)}(${currencyFormat1(response.player_win_amount_usd.direct)}/${currencyFormat1(response.player_win_amount_usd.subtier)})`,
      },
      playerBonusAmount: {
        ...line1Info.playerBonusAmount,
        data: `${currencyFormat1(response.player_bonus_amount_usd.total)}(${currencyFormat1(response.player_bonus_amount_usd.direct)}/${currencyFormat1(response.player_bonus_amount_usd.subtier)})`,
      },
      systemProfitAmount: {
        ...line1Info.systemProfitAmount,
        data: `${currencyFormat1(response.system_profit_amount_usd.total)}(${currencyFormat1(response.system_profit_amount_usd.direct)}/${currencyFormat1(response.system_profit_amount_usd.subtier)})`,
      },
      wagerSettlement: {
        ...line1Info.wagerSettlement,
        data: Number(response.wager_settlement_percent || 0) / 100,
      },
      losingSettlement: {
        ...line1Info.losingSettlement,
        data: Number(response.losing_settlement_percent || 0) / 100,
      },
      wagerCommissionAmount: {
        ...line1Info.wagerCommissionAmount,
        data: `${currencyFormat1(response.wager_commission_amount_usd.total)}(${currencyFormat1(response.wager_commission_amount_usd.direct)}/${currencyFormat1(response.wager_commission_amount_usd.subtier)})`,
      },
      losingCommissionAmount: {
        ...line1Info.losingCommissionAmount,
        data: `${currencyFormat1(response.losing_commission_amount_usd.total)}(${currencyFormat1(response.losing_commission_amount_usd.direct)}/${currencyFormat1(response.losing_commission_amount_usd.subtier)})`,
      },
      payoutAmount: {
        ...line1Info.payoutAmount,
        data: `${currencyFormat1(response.payout_amount_usd.total)}(${currencyFormat1(response.payout_amount_usd.direct)}/${currencyFormat1(response.payout_amount_usd.subtier)})`,
      },
      paidPayoutAmount: {
        ...line1Info.paidPayoutAmount,
        data: response.paid_payout_amount_usd,
      },
      unpaidPayoutAmount: {
        ...line1Info.unpaidPayoutAmount,
        data: response.unpaid_payout_amount_usd,
      },
    });
  };

  useEffect(() => {
    if (userInfo.id) {
      getTierData();
    }
  }, [userInfo.id]);
  return (
    <>
      <DefaultLayout>
        <div className="mb-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 xl:col-span-10">
            <h4 className=" text-xl font-semibold text-black dark:text-white">
              Tier Dashboard
            </h4>{" "}
          </div>
        </div>
        <div
          className={`grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 xl:grid-cols-4`}
        >
          {Object.keys(line1Info).map((key: string, index) => (
            <RoleBasedGuard
              key={index}
              roles={line1Info[key].role || allPermission}
            >
              <StatsCard
                title={line1Info[key].label}
                value={
                  line1Info[key].type === "text"
                    ? line1Info[key].data
                    : formatCompactNumber(Number(line1Info[key].data), {
                        style: line1Info[key].type,
                        currency: "USD",
                        maximumFractionDigits: 4,
                        miniumFractionDigits: 2,
                      })
                }
              />
            </RoleBasedGuard>
          ))}
        </div>

        <RoleBasedGuard roles={[ROLES.TIER1, ROLES.TIER2, ROLES.TIER3]}>
          <div className={`mt-3 grid grid-cols-12`}>
            <div className="col-span-12">
              <div className="my-4 grid grid-cols-12 gap-4">
                <div className="col-span-12 xl:col-span-10">
                  <h4 className=" text-xl font-semibold text-black dark:text-white">
                    PayIn History
                  </h4>{" "}
                </div>
              </div>
              <CustomTable
                getData={getPayout}
                columns={TIER_PAYOUT_HISTORY_COLULMN}
              />
            </div>
          </div>
        </RoleBasedGuard>
      </DefaultLayout>
    </>
  );
};

const TierDashboardWithAuth = withAuth(TierDash);
export default TierDashboardWithAuth;
