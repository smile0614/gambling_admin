"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomTable from "@/components/common/Table/CustomTable";
import StatsCard from "@/components/Dashboard/StatsCard";
import TierDetailModal from "@/components/DetailModals/TierListDetailModal";
import UserDetailModal from "@/components/DetailModals/UserDetailModal";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TierListView from "@/components/Tier/TierListSidebar";
import { DIRECT_USER_COLUMN } from "@/config/columns";
import { PATH_PAGE } from "@/config/path";
import withAuth from "@/hooks/withAuth";
import {
  getTier1List,
  getTierTreeDataById,
  getTreeList,
  getUserByTier,
} from "@/services/apis/tier";
import { getUserDataById } from "@/services/apis/users";
import { currencyFormat1, formatCompactNumber } from "@/utils/format";
import moment from "moment-timezone";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const AllTier: React.FC = () => {
  const [tierData, setTierData] = useState<any>([]);
  const [selectedTier, setSelectedTier] = useState("");

  const [isTier, setIsTier] = useState(false);
  const [selectedTierDetail, setSelectedTierDetail] = useState<any>();

  const [info, setInfo] = useState<
    Record<string, { label: string; data: number | string; type: string }>
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
      type: "text",
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

  const getTierTreeData = async () => {
    const response = await getTreeList();
    setTierData(response);
  };

  const getTierData = useCallback(async () => {
    if (!selectedTier) return;
    const response = await getTierTreeDataById({
      id: selectedTier,
    });

    const _tempInfo = {
      user: {
        ...info.user,
        data: `${response.user_count.total}(${response.user_count.direct}/${response.user_count.subtier})`,
      },
      tier: {
        ...info.tier,
        data: `${response.tier_count.tier1}/${response.tier_count.tier2}/${response.tier_count.tier3}`,
      },
      deposit: {
        ...info.deposit,
        data: `${currencyFormat1(response.deposit_amount_usd.total)}(${currencyFormat1(response.deposit_amount_usd.direct)}/${currencyFormat1(response.deposit_amount_usd.subtier)})`,
      },
      withdraw: {
        ...info.withdraw,
        data: `${currencyFormat1(response.withdraw_amount_usd.total)}(${currencyFormat1(response.withdraw_amount_usd.direct)}/${currencyFormat1(response.withdraw_amount_usd.subtier)})`,
      },
      playerWagerAmount: {
        ...info.playerWagerAmount,
        data: `${currencyFormat1(response.player_wager_amount_usd.total)}(${currencyFormat1(response.player_wager_amount_usd.direct)}/${currencyFormat1(response.player_wager_amount_usd.subtier)})`,
      },
      playerWinAmount: {
        ...info.playerWinAmount,
        data: `${currencyFormat1(response.player_win_amount_usd.total)}(${currencyFormat1(response.player_win_amount_usd.direct)}/${currencyFormat1(response.player_win_amount_usd.subtier)})`,
      },
      playerBonusAmount: {
        ...info.playerBonusAmount,
        data: `${currencyFormat1(response.player_bonus_amount_usd.total)}(${currencyFormat1(response.player_bonus_amount_usd.direct)}/${currencyFormat1(response.player_bonus_amount_usd.subtier)})`,
      },
      systemProfitAmount: {
        ...info.systemProfitAmount,
        data: `${currencyFormat1(response.system_profit_amount_usd.total)}(${currencyFormat1(response.system_profit_amount_usd.direct)}/${currencyFormat1(response.system_profit_amount_usd.subtier)})`,
      },
      wagerSettlement: {
        ...info.wagerSettlement,
        data: Number(response.wager_settlement_percent || 0) / 100,
      },
      losingSettlement: {
        ...info.losingSettlement,
        data: Number(response.losing_settlement_percent || 0) / 100,
      },
      wagerCommissionAmount: {
        ...info.wagerCommissionAmount,
        data: `${currencyFormat1(response.wager_commission_amount_usd.total)}(${currencyFormat1(response.wager_commission_amount_usd.direct)}/${currencyFormat1(response.wager_commission_amount_usd.subtier)})`,
      },
      losingCommissionAmount: {
        ...info.losingCommissionAmount,
        data: `${currencyFormat1(response.losing_commission_amount_usd.total)}(${currencyFormat1(response.losing_commission_amount_usd.direct)}/${currencyFormat1(response.losing_commission_amount_usd.subtier)})`,
      },
      payoutAmount: {
        ...info.payoutAmount,
        data: `${currencyFormat1(response.payout_amount_usd.total)}(${currencyFormat1(response.payout_amount_usd.direct)}/${currencyFormat1(response.payout_amount_usd.subtier)})`,
      },
      paidPayoutAmount: {
        ...info.paidPayoutAmount,
        data: response.paid_payout_amount_usd,
      },
      unpaidPayoutAmount: {
        ...info.unpaidPayoutAmount,
        data: response.unpaid_payout_amount_usd,
      },
    };
    setInfo({
      ..._tempInfo,
    });
  }, [selectedTier]);

  const openUserDetailModal = async (row: any) => {
    const userId = row.id;
    if (!userId) return;
    const response = await getUserDataById({ id: userId });
    const _user = {
      id: response?.id || "",
      avatar: response?.avatar || "",
      name: (
        <Link
          className="hover:underline"
          href={`${
            PATH_PAGE.management.player.user(response?.id)}`}
        >
          {response?.name || ""}
        </Link>
      ),
      vipLevel: response?.vip_level || 0,
      email: response?.email || "",
      phone: response?.phone || "",
      tg: response?.telegram_user_name || "",
      walletAddress: response?.wallet_address || "",
      referralCode: response?.referral_code || "",
      registered: moment(response?.created_at).format("yyyy-MM-DD HH:mm:ss"),
      restricted: response?.restricted_to
        ? moment(response?.restricted_to).format("yyyy-MM-DD HH:mm:ss")
        : "",
      kyc: response?.kyc,
      country: response?.country,
      language: response?.setting_language,
      kycFront: response?.kyc_photo_front,
      kycBack: response?.kcy_photo_back,
      totalDepositAmountUsd: Number(response?.total_deposit_amount_usd || 0),
      totalWithdrawAmountUsd: Number(response?.total_withdraw_amount_usd || 0),
      totalWagerAmountUsd: Number(response?.total_wager_amount_usd || 0),
      totalWinAmountUsd: Number(response?.total_win_amount_usd || 0),
      totalLoseAmountUsd: Number(response?.total_lose_amount_usd || 0),
      totalBonusAmountUsd: Number(response?.total_bonus_amount_usd || 0),
    };
    setSelectedTierDetail(_user);
    setIsTier(true);
  };

  const getUsersDataByTier = useCallback(
    async (page: number, page_size: number) => {
      if (!selectedTier) return;
      const startTime = 0;
      const endTime = Date.now() / 1000;
      const response = await getUserByTier({
        tier_id: selectedTier,
        page,
        page_size,
        start_time: startTime,
        end_time: endTime,
      });

      const data = response?.users?.map((res: any, index: number) => ({
        id: res?.id || "",
        registeredAt:
          moment(res?.registered_at).format("yyyy-MM-DD HH:mm:ss") || "",
        name: (
          <Link
            className="hover:underline"
            href={`${
              PATH_PAGE.management.player.user(res?.id)}`}
          >
            {res?.name || ""}
          </Link>
        ),
        vipLevel: res?.vip_level || 0,
        depositAmountUsd: Number(res?.deposit_amount_usd || 0),
        withdrawAmountUsd: Number(res?.withdraw_amount_usd || 0),
        wagerAmountUsd: Number(res?.total_wager_amount_usd || 0),
        winAmountUsd: Number(res?.total_win_amount_usd || 0),
        loseAmountUsd: Number(res?.total_lose_amount_usd || 0),
        bonusAmountUsd: Number(res?.total_bonus_amount_usd || 0),
        profitAmountUsd: Number(res?.total_profit_amount_usd || 0),
      }));

      return {
        data,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [selectedTier],
  );

  useEffect(() => {
    getTierData();
  }, [getTierData]);

  useEffect(() => {
    getTierTreeData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Tier List" />
        <div className="relative grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
          <div className="col-span-3">
            <TierListView
              data={tierData}
              selected={selectedTier}
              setSelected={setSelectedTier}
            />
          </div>
          <div className="col-span-9">
            <div className="rounded-md border border-stroke bg-white p-6 text-center shadow-default dark:border-strokedark dark:bg-boxdark ">
              {!selectedTier && (
                <p className="text-[20px] font-bold">
                  Please select Tier to check detailed information.
                </p>
              )}
              {selectedTier && (
                <div className="grid grid-cols-3 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-3">
                  {Object.keys(info).map((key, index) => (
                    <StatsCard
                      key={index}
                      title={info[key].label}
                      value={
                        info[key].type === "text"
                          ? info[key].data
                          : formatCompactNumber(Number(info[key].data), {
                              style: info[key].type,
                              currency: "USD",
                              maximumFractionDigits: 4,
                              miniumFractionDigits: 2,
                            })
                      }
                    />
                  ))}
                </div>
              )}

              {selectedTier && (
                <div className=" mt-2 grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
                  <div className="col-span-12 xl:col-span-12">
                    <CustomTable
                      columns={DIRECT_USER_COLUMN}
                      getData={getUsersDataByTier}
                      // onRow={(row) => {
                      //   openUserDetailModal(row);
                      // }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <UserDetailModal
          show={isTier}
          setShow={setIsTier}
          onClose={() => setIsTier(false)}
          userInfo={selectedTierDetail}
        />
      </DefaultLayout>
    </>
  );
};

const AllTierWithAuth = withAuth(AllTier);
export default AllTierWithAuth;
