"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import withAuth from "@/hooks/withAuth";
import CustomTable from "@/components/common/Table/CustomTable";
import {
  BALANCE_USER_COLUMN,
  BONUS_USER_COLUMN,
  DEPOSIT_COLUMN,
  DEPOSIT_USER_COLUMN,
  GAME_LIST_COLUMN,
  SOLO_PLAYER_COLUMN,
  USER_DETAIL_WAGER_COLUMN,
  USER_TIP_TRANSACTION_COLUMN,
  WAGER_COLUMN,
  WALLET_COLUMN,
} from "@/config/columns";
import UserDetailModal from "@/components/DetailModals/UserDetailModal";
import { useParams, useSearchParams } from "next/navigation";
import cn from "classnames";
import { getDepositTransactionsByUser } from "@/services/apis/deposit";
import moment from "moment-timezone";
import { getWithdrawTransactionsByUser } from "@/services/apis/withdraw";
import { getBonusTransactionByUser } from "@/services/apis/bonus";
import { getGameTransactionByUser } from "@/services/apis/game";
import { getUserBalace } from "@/services/apis/balance";
import {
  getUserDataById,
  getUserStatisticsData,
  getUserTransactionTips,
  getUserWallets,
  updateKyc,
  updateWithdrawRestrictByUserId,
} from "@/services/apis/users";
import StatsCard from "@/components/Dashboard/StatsCard";
import {
  currencyFormat1,
  formatCompactNumber,
  getTransactionLink,
  transformWalletAddress,
} from "@/utils/format";
import { CustomCheckbox } from "@/components/common/Checkbox/CustomCheckBox";
import { ToggleButton } from "@/components/common/ToggleButton/CustomToggleButton";
import { getKycStatus, getStatusColor } from "@/utils/common";
import { convertRole, convertRole1 } from "@/services/apis/auth";
import SvgColor from "@/assets/svgs/SvgColor";
import Image from "next/image";
import { avatarUrl, IdUrl } from "@/config";
import { toast } from "react-toastify";
import CopyButton from "@/components/Copy/Copy";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DepositDetailModal from "@/components/DetailModals/DepositDetailModal";
import WithdrawDetailModal from "@/components/DetailModals/WithdrawDetailModal";
import WagerDetailModal from "@/components/DetailModals/WagerDetailModal";
import useColorMode from "@/hooks/useColorMode";
import { formatDate } from "@/utils/convertor";
import Link from "next/link";
import { PATH_PAGE } from "@/config/path";
import { ROLES, SortType } from "@/types";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";

type headerType =
  | "overview"
  | "deposit"
  | "withdraw"
  | "bonus"
  | "game"
  | "balance"
  | "wallet"
  | "kyc"
  | "tip";

const defaultModalStats = {
  deposit: false,
  overview: false,
  withdraw: false,
  bonus: false,
  game: false,
  balance: false,
  wallet: false,
  kyc: false,
  tip: false,
};

const User: React.FC = () => {
  const [colorMode, setColorMode] = useColorMode();
  const route = useSearchParams();
  const userId = route?.get("user");
  const [activeTab, setActiveTab] = useState<headerType>("overview");
  const [isUpdated, setIsUpdated] = useState<string | number>(0);
  const admin = useSelector((state: AppState) => state.auth.user);

  const [isShowModal, setIsShowModal] =
    useState<Record<headerType, boolean>>(defaultModalStats);
  const [selectedData, setSelectedData] = useState<any>();
  const [info, setInfo] = useState<
    Record<
      string,
      {
        label: string;
        data: { label: string; val: ReactNode; type: string }[];
        onHandler: Function;
      }
    >
  >({
    betCount: {
      label: "Bet Count",
      data: [],
      onHandler: () => {
        setActiveTab("game");
      },
    },
    deposit: {
      label: "Deposit",
      data: [],
      onHandler: () => {
        setActiveTab("deposit");
      },
    },
    bonus: {
      label: "Total Bonuses",
      data: [],
      onHandler: () => {
        setActiveTab("bonus");
      },
    },

    profit: { label: "Profit & Loss", data: [], onHandler: () => {} },
    betAmount: {
      label: "Total Wager USD",
      data: [],
      onHandler: () => {
        setActiveTab("game");
      },
    },
    withdraw: {
      label: "Withdraw",
      data: [],
      onHandler: () => {
        setActiveTab("withdraw");
      },
    },
    balance: {
      label: "Total Balance",
      data: [],
      onHandler: () => {
        setActiveTab("balance");
      },
    },
    last: { label: "Last Joined & IP", data: [], onHandler: () => {} },
  });

  const [userInfo, setUserInfo] = useState<
    Record<
      string,
      Record<
        string,
        {
          label: string;
          val: string | number | boolean;
          status: Boolean;
          type?: string;
          isHide?: Boolean;
        }
      >
    >
  >({
    basic: {
      id: { label: "Id", val: "", status: true },
      name: { label: "Name", val: "", status: true },
      registered: { label: "Registered At", val: "", status: true },
      avatar: { label: "Avatar", val: "", status: true, type: "avatar" },
      role: { label: "Role", val: "", status: true }, // default user
      vip: { label: "Vip Level", val: 0, status: true },
      timezone: { label: "TimeZone", val: "", status: true },
      country: { label: "Country", val: "", status: true },
      referralCode: { label: "Referral", val: "", status: true },
      kyc: { label: "Kyc", val: "", status: true },
      kycFront: { label: "Kyc Front", val: "", status: true, type: "ids" },
      kycBack: { label: "Kyc Back", val: "", status: true, type: "ids" },
    },
    contact: {
      email: { label: "Email", val: "", status: false },
      phone: { label: "Phone", val: "", status: false },
      tg: { label: "Telegram", val: "", status: false },
      wallet: { label: "Wallet", val: "", status: false },
    },
    settings: {
      language: { label: "Language", val: "", status: true },
      fiatCurrency: { label: "Fiat", val: "", status: true },
      showFullNameCrypto: {
        label: "Show Full Name Crypto",
        val: false,
        status: true,
        type: "bool",
      },
      hideGamingData: {
        label: "Hide Game Data",
        val: false,
        status: true,
        type: "bool",
      },
      hideUserName: {
        label: "Hide User Name",
        val: false,
        status: true,
        type: "bool",
      },
      refuseTipsFromStrangers: {
        label: "Refuse Tips From Strangers",
        val: false,
        status: true,
        type: "bool",
      },
      viewInFiat: {
        label: "View In Fiat",
        val: false,
        status: true,
        type: "bool",
      },

      disabled: { label: "Self Exclusive", val: "", status: true },
      restricted: { label: "Account Restrict", val: "", status: true },
      withrawRestricted: {
        label: "Withdraw Restrict",
        val: false,
        status: true,
        type: "edit",
        isHide: true,
      },
    },
  });

  const handleModal = (type: headerType, stats: boolean = true) => {
    setIsShowModal({
      ...defaultModalStats,
      [type]: stats,
    });
  };

  const onKyc = async (status: 3 | 4) => {
    if (!String(userId)) return;
    const response = await updateKyc({ user_id: String(userId), type: status });
    setUserInfo({
      ...userInfo,
      basic: {
        ...userInfo.basic,
        kyc: { ...userInfo.basic.kyc, val: getKycStatus(status) },
      },
    });
    toast.success("Successfully Updated", { toastId: "kyc" });
  };

  const getDepositsTransactions = useCallback(
    async (
      page: number,
      page_size: number,
      sortData: { column: string; order: SortType },
    ) => {
      const response = await getDepositTransactionsByUser({
        page,
        page_size,
        user_id: String(userId),
        sort_column: sortData.column,
        sort_order: sortData.order,
      });

      const _response =
        response?.transactions?.map((item: any) => ({
          amount: Number(item?.amount || 0),
          amount_usd: Number(item?.amount_usd || 0).toFixed(4),
          created_at: moment(new Date(item?.created_at)).format(
            "yyyy-MM-DD HH:mm:ss",
          ),
          cryptoCurrencyId: item?.cryptocurrency_id || "",
          from_address: item?.from_address || "",
          to_address: item?.to_address || "",
          hash: (
            <a
              href={`${getTransactionLink(item.network)}/${item?.hash}`}
              target="_blank"
              className="hover:underline"
            >
              {transformWalletAddress(item?.hash || "")}
            </a>
          ),
          id: item?.id || "",
          network: item?.network || "",
          status: item?.status || "",
          pendingReason: item?.pending_reason || "",
          symbol: item?.symbol || "",
          userId: item?.user_id || "",
          userName: item?.user_name || "",
          userType: item.user_type,
        })) || [];
      return {
        data: _response,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [activeTab, userId],
  );

  const getWithdrawTransactions = useCallback(
    async (
      page: number,
      page_size: number,
      sortData: { column: string; order: SortType },
    ) => {
      const response = await getWithdrawTransactionsByUser({
        page,
        page_size,
        user_id: String(userId),
        sort_column: sortData.column,
        sort_order: sortData.order,
      });

      const _withdraw =
        response?.transactions?.map((item: any) => ({
          amount: Number(item?.amount || 0),
          amount_usd: Number(item?.amount_usd || 0),
          created_at: moment(new Date(item?.created_at)).format(
            "yyyy-MM-DD HH:mm:ss",
          ),
          fee: Number(item?.fee || 0),
          fee_usd: Number(item?.fee_usd || 0),
          cryptoCurrencyId: item?.cryptocurrency_id || "",
          from_address: item?.from_address || "",
          to_address: item?.to_address || "",
          hash: (
            <a
              href={`${getTransactionLink(item.network)}/${item?.hash}`}
              target="_blank"
              className="hover:underline"
            >
              {transformWalletAddress(item?.hash || "")}
            </a>
          ),
          id: item?.id || "",
          network: item?.network || "",
          status: item?.status || "",
          pendingReason: item?.pending_reason || "",
          symbol: item?.symbol || "",
          userId: item?.user_id || "",
          userName: item?.user_name || "",
          userType: item.user_type,
        })) || [];

      return {
        data: _withdraw,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [userId, activeTab, isUpdated],
  );

  const getBonusTransactions = useCallback(
    async (
      page: number,
      page_size: number,
      sortData: { column: string; order: SortType },
    ) => {
      const response = await getBonusTransactionByUser({
        page,
        page_size,
        user_id: String(userId),
        sort_column: sortData.column,
        sort_order: sortData.order,
      });

      const _response = response.bonuses.map((item: any) => ({
        created_at: moment(item?.created_at).format("yyyy-MM-DD HH:mm:ss"),
        amount: Number(item?.amount || 0),
        amount_usd: Number(item?.amount_usd || 0),
        claimStatus: item?.claim_status,
        type: item?.type,
      }));
      return {
        data: _response,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [activeTab, userId],
  );

  const getGameTransactions = useCallback(
    async (
      page: number,
      page_size: number,
      sortData: { column: string; order: SortType },
    ) => {
      const response = await getGameTransactionByUser({
        page,
        page_size,
        user_id: String(userId),
        sort_column: sortData.column,
        sort_order: sortData.order,
      });

      const _response = response.transactions.map((item: any) => ({
        id: item?.id || "",
        created_at: moment(new Date(item.created_at)).format(
          "yyyy-MM-DD HH:mm:ss",
        ),
        userId: item?.user_id || "",
        userName: item?.user_name || "",
        userType: item?.user_type || "",
        gameId: item?.game_id || "",
        gameIdentifier: item?.game_identifier || "",
        game_title: item?.game_title || "",
        currencyId: item?.currencyId || "",
        currency: item?.currency || "",
        currencyLogo: item?.currency_logo || "",

        status: item?.status,
        amount: Number(item?.amount || 0),
        amount_usd: Number(item?.amount_usd || 0),
        profitMultiplier: Number(item?.profit_multiplier || 0),
        profit_amount: Number(item?.profit_amount || 0),
        profit_amount_usd: Number(item?.profit_amount_usd || 0),
        actionId: item.action_id,
        originalActionId: item.original_action_id,
        jackPotContribution: item.jackpot_contribution,
        jackPotWin: item.jackpot_win,
      }));
      return {
        data: _response,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [activeTab, userId],
  );

  const getBalances = useCallback(
    async (page: number, page_size: number) => {
      const response = await getUserBalace({ user_id: String(userId) });
      const _response = response
        .map((item: any) => ({
          symbol: item.symbol_name,
          balance: Number(item.balance || 0),
          balanceUsd: Number(item.balance_usd || 0),
        }))
        .sort((a: any, b: any) => b.balanceUsd - a.balanceUsd);
      return {
        data: _response,
        page: 1,
        pageSize: 10,
        totalCount: 0,
        total_page: 0,
      };
    },
    [activeTab, userId],
  );

  const getStatistics = useCallback(async () => {
    const response = await getUserStatisticsData({ user_id: String(userId) });
    const userResponse = await getUserDataById({ id: String(userId) });
    const _tempUserInfo = { ...userInfo };

    let role = 'Solo';
    if (userResponse.tier1) {
      role = 'Tier1'
    }
    if (userResponse.tier2) {
      role = 'Tier2'
    }
    if (userResponse.tier3) {
      role = 'Tier3'
    }

    setInfo({
      betCount: {
        ...info.betCount,
        data: [
          { label: "Today", val: response.today_bet_count, type: "integer" },
          { label: "Total", val: response.total_bet_count, type: "integer" },
        ],
      },

      deposit: {
        ...info.deposit,
        data: [
          {
            label: "Today",
            val: response.today_deposit_amount_usd,
            type: "currency",
          },
          {
            label: "Total",
            val: response.total_deposit_amount_usd,
            type: "currency",
          },
        ],
      },
      bonus: {
        ...info.bonus,
        data: [
          {
            label: "Claimed Bonus",
            val: response.total_claimed_bonus_amount_usd,
            type: "currency",
          },
          {
            label: "Unclaimed Bonus",
            val: response.total_unclaimed_bonus_amount_usd,
            type: "currency",
          },
        ],
      },

      profit: {
        ...info.profit,
        data: [
          {
            label: "Today",
            val: (
              <span
                className={cn({
                  "text-[orangered]": response.today_profit_amount_usd < 0,
                  "text-[limegreen]": response.today_profit_amount_usd > 0,
                })}
              >
                {formatCompactNumber(response.today_profit_amount_usd, {
                  maximumFractionDigits: 4,
                  miniumFractionDigits: 2,
                  currency: "USD",
                  style: "currency",
                })}
              </span>
            ),
            type: "",
          },
          {
            label: "Total",
            val: (
              <span
                className={cn({
                  "text-[orangered]": response.total_profit_amount_usd < 0,
                  "text-[limegreen]": response.total_profit_amount_usd > 0,
                })}
              >
                {formatCompactNumber(response.total_profit_amount_usd, {
                  maximumFractionDigits: 4,
                  miniumFractionDigits: 2,
                  currency: "USD",
                  style: "currency",
                })}
              </span>
            ),
            type: "",
          },
        ],
      },

      betAmount: {
        ...info.betAmount,
        data: [
          {
            label: "Today",
            val: response.today_bet_amount_usd,
            type: "currency",
          },
          {
            label: "Total",
            val: response.total_bet_amount_usd,
            type: "currency",
          },
        ],
      },
      withdraw: {
        ...info.withdraw,
        data: [
          {
            label: "Today",
            val: response.today_withdraw_amount_usd,
            type: "currency",
          },
          {
            label: "Total",
            val: response.total_withdraw_amount_usd,
            type: "currency",
          },
        ],
      },

      balance: {
        ...info.balance,
        data: [
          {
            label: "",
            val: response.total_balance_amount_usd,
            type: "currency",
          },
        ],
      },
      last: {
        ...info.last,
        data: [
          {
            label: "Last Joined",
            val: moment(response.last_joined_at).format("yyyy-MM-DD HH:mm:ss"),
            type: "",
          },
          {
            label: "IP",
            val: response.ip || "-",
            type: "",
          },
        ],
      },
    });

    setUserInfo({
      ..._tempUserInfo,
      basic: {
        ..._tempUserInfo.basic,
        id: { ..._tempUserInfo.basic.id, val: userResponse.id },
        name: { ..._tempUserInfo.basic.name, val: userResponse.name },
        avatar: { ..._tempUserInfo.basic.avatar, val: userResponse.avatar },
        role: {
          ..._tempUserInfo.basic.role,
          val: role,
        },
        vip: { ..._tempUserInfo.basic.vip, val: userResponse.vip_level },
        timezone: {
          ..._tempUserInfo.basic.timezone,
          val: userResponse.timezone,
        },
        country: { ..._tempUserInfo.basic.country, val: userResponse.country },
        referralCode: {
          ..._tempUserInfo.basic.referralCode,
          val: userResponse.referral_code,
        },
        kyc: {
          ..._tempUserInfo.basic.kyc,
          val: getKycStatus(userResponse.kyc),
        },
        kycFront: {
          ..._tempUserInfo.basic.kycFront,
          val: userResponse.kyc_photo_front,
        },
        kycBack: {
          ..._tempUserInfo.basic.kycBack,
          val: userResponse.kyc_photo_back,
        },
        registered: {
          ..._tempUserInfo.basic.registered,
          val: moment(userResponse.created_at).format("yyyy-MM-DD HH:mm:ss"),
        },
      },
      contact: {
        ..._tempUserInfo.contact,
        email: {
          ..._tempUserInfo.contact.email,
          val: userResponse.email,
          status: userResponse.email_verified,
        },
        phone: {
          ..._tempUserInfo.contact.phone,
          val: userResponse.phone,
          status: userResponse.phone_verified,
        },
        tg: {
          ..._tempUserInfo.contact.tg,
          val: userResponse.telegram_user_name,
        },
        wallet: {
          ..._tempUserInfo.contact.wallet,
          val: userResponse.wallet_address,
          status: !!userResponse.wallet_signature,
        },
      },
      settings: {
        ..._tempUserInfo.settings,
        language: {
          ..._tempUserInfo.settings.language,
          val: userResponse.setting_language,
        },
        fiatCurrency: {
          ..._tempUserInfo.settings.fiatCurrency,
          val: userResponse.setting_fiat_currency?.symbol,
        },
        showFullNameCrypto: {
          ..._tempUserInfo.settings.showFullNameCrypto,
          val: userResponse.setting_show_full_name_crypto,
        },
        hideGamingData: {
          ..._tempUserInfo.settings.hideGamingData,
          val: userResponse.setting_hide_gaming_data,
        },
        hideUserName: {
          ..._tempUserInfo.settings.hideUserName,
          val: userResponse.setting_hide_user_name,
        },
        refuseTipsFromStrangers: {
          ..._tempUserInfo.settings.refuseTipsFromStrangers,
          val: userResponse.setting_refuse_tip_from_strangers,
        },
        viewInFiat: {
          ..._tempUserInfo.settings.viewInFiat,
          val: userResponse.setting_view_in_fiat,
        },

        disabled: {
          ..._tempUserInfo.settings.disabled,
          val: userResponse.disabled_to
            ? moment(userResponse.disabled_to * 1000).format("yyyy-MM-DD")
            : "-",
        },
        restricted: {
          ..._tempUserInfo.settings.restricted,
          val: userResponse.restricted_to
            ? moment(userResponse.restricted_to * 1000).format("yyyy-MM-DD")
            : "No Restrict",
        },
        withrawRestricted: {
          ..._tempUserInfo.settings.withrawRestricted,
          val: userResponse.disabled_withdraw,
          isHide: admin.role !== ROLES.ADMIN,
        },
      },
    });
  }, [userId, admin]);

  const getWallets = useCallback(async () => {
    const response = await getUserWallets({ user_id: String(userId) });
    const _response = response.map((item: any) => ({
      network: item.network,
      address: item.address,
    }));
    return {
      data: _response,
      page: 1,
      pageSize: 10,
      totalCount: 0,
      total_page: 0,
    };
  }, [activeTab, userId]);

  const getTipTransactions = useCallback(
    async (
      page: number,
      page_size: number,
      sortData: { column: string; order: SortType },
    ) => {
      const response = await getUserTransactionTips({
        page,
        page_size,
        user_id: String(userId),
        sort_column: sortData.column,
        sort_order: sortData.order,
      });
      const _tips = response.transactions.map((tip: any) => ({
        id: tip.id,
        created_at: moment(new Date(tip.created_at)).format(
          "yyyy-MM-DD HH:mm:ss",
        ),
        transactor_id: tip.transactor_id,
        transactor_name: (
          <Link
            className="hover:underline"
            href={`${PATH_PAGE.management.player.user(tip?.transactor_id)}`}
          >
            {tip?.transactor_name || ""}
          </Link>
        ),
        type: tip?.type,
        symbol: tip?.symbol || "",
        amount: Number(tip?.amount || 0),
        amount_usd: Number(tip?.amount_usd || 0),
        wallet_balance: Number(tip?.wallet_balance || 0),
        wallet_balance_usd: Number(tip?.wallet_balance_usd || 0),
      }));
      return {
        data: _tips,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [activeTab, userId],
  );

  const onWithdrawRestrict = async (status: boolean) => {
    const _res = await updateWithdrawRestrictByUserId(
      { status },
      { id: String(userId) },
    );
    setUserInfo({
      ...userInfo,
      settings: {
        ...userInfo.settings,
        withrawRestricted: {
          ...userInfo.settings.withrawRestricted,
          val: status,
        },
      },
    });
    const message = status
      ? "This Account Withdraw is Disabled."
      : "This Account Withdraw is Enabled.";
    toast.success(message);
  };

  const renderValue = (val: any, type: string) => {
    switch (type) {
      case "bool":
        return val ? (
          <SvgColor
            className="text-[limegreen]"
            src="/assets/icons/tick-squre.svg"
            style={{ width: 30, height: 30 }}
          />
        ) : (
          <SvgColor
            className="text-[orangered]"
            src="/assets/icons/slash.svg"
            style={{ width: 30, height: 30 }}
          />
        );
      case "avatar":
        return (
          <Image
            alt=""
            width={40}
            height={40}
            src={`${avatarUrl}/${val}`}
            onError={(e) => {
              e.currentTarget.src = "/images/default-avatar.png";
            }}
            style={{ width: 40, height: 40 }}
          />
        );
      case "ids":
        return val ? (
          <Image
            alt=""
            width={30}
            height={40}
            src={`${IdUrl}/${val}`}
            style={{ width: 40, height: 40 }}
            onError={(e) => {
              e.currentTarget.src =
                colorMode === "light"
                  ? "/images/empty-light.png"
                  : "/images/empty-dark.png";
            }}
          />
        ) : (
          ""
        );
      case "wallet":
        return val ? transformWalletAddress(String(val)) : "No Data";
      case "edit":
        return (
          <ToggleButton value={val} onChange={() => onWithdrawRestrict(!val)} />
        );
      default:
        return val ? val : "No Data";
    }
  };

  const renderHeaders = useCallback(() => {
    const tabs: Array<{ title: string; key: headerType }> = [
      { title: "Detail", key: "overview" },
      { title: "KYC Setting", key: "kyc" },
      { title: "Deposit", key: "deposit" },
      { title: "Withdraw", key: "withdraw" },
      { title: "Bonus", key: "bonus" },
      { title: "Game", key: "game" },
      { title: "Balance", key: "balance" },
      { title: "Wallet", key: "wallet" },
      { title: "Tips", key: "tip" },
    ];

    return (
      <div className="flex flex-wrap justify-between gap-y-4 rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex w-full max-w-full flex-wrap gap-5">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={cn(
                `flex w-full max-w-30 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center text-primary shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
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

  useEffect(() => {
    getStatistics();
  }, [getStatistics]);

  const RenderStatistic: React.FC<{
    label: string;
    data: { label: string; val: ReactNode; type: string }[];
    onHandler: Function;
  }> = ({ label, data, onHandler }) => {
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

    return (
      <div
        className="cursor-pointer rounded-md border border-stroke bg-white p-5  py-4 text-center shadow-default dark:border-strokedark dark:bg-boxdark"
        onClick={() => onHandler()}
      >
        <h3 className="mb-2 text-lg font-medium capitalize">{label}</h3>
        {data.map((item, _k) => (
          <div
            className={cn("flex dark:text-white", {
              "justify-between text-[16px]": item.label,
              "justify-center  text-[20px]": !item.label,
            })}
            key={_k}
          >
            {item.label && (
              <p className={cn(`text-wrap break-all font-bold`)}>
                {item.label}
              </p>
            )}
            <p className={cn(`text-wrap break-all font-bold `)}>
              {renderValue(item.val, item.type)}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={`Player Information (${userInfo.basic.name.val})`}
      />
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 xl:grid-cols-4">
        {Object.keys(info).map((key: string, _i) => (
          <RenderStatistic
            label={info[key].label}
            data={info[key].data}
            onHandler={info[key].onHandler}
            key={_i}
          />
        ))}
      </div>

      <div className="col-span-12 mt-2 xl:col-span-12">{renderHeaders()}</div>

      {activeTab === "overview" && (
        <>
          <div className="mt-2 grid w-full grid-cols-12 gap-4">
            <div className="col-span-4 xl:col-span-4">
              <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
                  Basic Info
                </h4>
                <div className="flex flex-col gap-1">
                  {Object.keys(userInfo.basic).map(
                    (key: string, _i: number) => (
                      <div className="flex justify-between" key={_i}>
                        <div>{userInfo.basic[key].label}</div>
                        <div className="flex gap-1">
                          {renderValue(
                            userInfo.basic[key].val,
                            userInfo.basic[key].type || "",
                          )}
                          {key === "id" && (
                            <CopyButton
                              text={String(userInfo.basic[key].val)}
                            />
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-4 xl:col-span-4">
              <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
                  Contact Info
                </h4>
                <div className="flex flex-col gap-1">
                  {Object.keys(userInfo.contact).map(
                    (key: string, _i: number) => (
                      <div className="flex justify-between" key={_i}>
                        <div>{userInfo.contact[key].label}</div>
                        <div className="flex items-center justify-center gap-1 text-center">
                          {renderValue(userInfo.contact[key].val, key)}
                          {userInfo.contact[key].status && (
                            <div className="flex items-center">
                              {key === "wallet" && (
                                <CopyButton
                                  text={String(userInfo.contact[key].val)}
                                />
                              )}
                              <SvgColor
                                src="/assets/icons/verified.svg"
                                className="text-primary"
                                style={{ width: 20, height: 20 }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-4 xl:col-span-4">
              <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
                <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
                  Settings Info
                </h4>
                <div className="flex flex-col gap-1">
                  {Object.keys(userInfo.settings).map(
                    (key: string, _i: number) => (
                      <>
                        {!userInfo.settings[key].isHide && (
                          <div className="flex justify-between" key={_i}>
                            <div>{userInfo.settings[key].label}</div>
                            <div className="capitalize">
                              {renderValue(
                                userInfo.settings[key].val,
                                userInfo.settings[key].type || "",
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "kyc" && (
        <>
          <div className="col-span-12 mt-2 xl:col-span-12">
            <div className="rounded-lg border border-stroke bg-white px-4 shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="flex w-full justify-between">
                <div className="flex items-center justify-center gap-2 text-[18px]">
                  <span>Status:</span>
                  <span
                    style={{
                      color: getStatusColor(String(userInfo.basic.kyc.val)),
                    }}
                  >
                    {userInfo.basic.kyc.val}
                  </span>
                </div>
                <div className="flex w-full justify-end gap-4 p-4">
                  <button
                    className={cn(
                      `flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center text-primary shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
                    )}
                    onClick={() => onKyc(3)}
                  >
                    KYC Accept
                  </button>

                  <button
                    className={cn(
                      `flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center text-primary shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
                    )}
                    onClick={() => onKyc(4)}
                  >
                    KYC Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 grid w-full grid-cols-12 gap-4">
            <div className="col-span-6 xl:col-span-6">
              <div className="flex w-full justify-center rounded-lg border border-stroke bg-white p-4 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
                <Image
                  alt=""
                  width={300}
                  height={300}
                  src={`${IdUrl}/${userInfo.basic.kycFront.val}`}
                  onError={(e) => {
                    e.currentTarget.src =
                      colorMode === "light"
                        ? "/images/empty-light.png"
                        : "/images/empty-dark.png";
                  }}
                />
              </div>
            </div>
            <div className="col-span-6 xl:col-span-6">
              <div className="flex w-full justify-center rounded-lg border border-stroke bg-white p-4 text-center shadow-default dark:border-strokedark dark:bg-boxdark">
                <Image
                  alt=""
                  width={300}
                  height={300}
                  src={`${IdUrl}/${userInfo.basic.kycBack.val}`}
                  onError={(e) => {
                    e.currentTarget.src =
                      colorMode === "light"
                        ? "/images/empty-light.png"
                        : "/images/empty-dark.png";
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === "deposit" && (
        <div className="col-span-12 mt-2 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="flew-root">
              <CustomTable
                getData={getDepositsTransactions}
                columns={DEPOSIT_USER_COLUMN}
                onRow={(row) => {
                  setSelectedData(row);
                  handleModal("deposit");
                }}
                defaultSort={{ column: "created_at", order: SortType.DESC }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "withdraw" && (
        <div className="col-span-12 mt-2 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="flew-root">
              <CustomTable
                getData={getWithdrawTransactions}
                columns={DEPOSIT_USER_COLUMN}
                onRow={(row) => {
                  setSelectedData(row);
                  handleModal("withdraw");
                }}
                defaultSort={{ column: "created_at", order: SortType.DESC }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "bonus" && (
        <div className="col-span-12 mt-2 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="flew-root">
              <CustomTable
                getData={getBonusTransactions}
                columns={BONUS_USER_COLUMN}
                defaultSort={{ column: "created_at", order: SortType.DESC }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "game" && (
        <div className="col-span-12 mt-2 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="flew-root">
              <CustomTable
                getData={getGameTransactions}
                columns={USER_DETAIL_WAGER_COLUMN}
                onRow={(row) => {
                  setSelectedData(row);
                  handleModal("game");
                }}
                defaultSort={{ column: "created_at", order: SortType.DESC }}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "balance" && (
        <div className="col-span-12 mt-2 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="flew-root">
              <CustomTable
                getData={getBalances}
                columns={BALANCE_USER_COLUMN}
                isPagniation={false}
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === "wallet" && (
        <div className="col-span-12 mt-2 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="flew-root">
              <CustomTable getData={getWallets} columns={WALLET_COLUMN} />
            </div>
          </div>
        </div>
      )}

      {activeTab === "tip" && (
        <div className="col-span-12 mt-2 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="flew-root">
              <CustomTable
                getData={getTipTransactions}
                columns={USER_TIP_TRANSACTION_COLUMN}
                defaultSort={{ column: "created_at", order: SortType.DESC }}
              />
            </div>
          </div>
        </div>
      )}

      {/* </div> */}
      <DepositDetailModal
        show={isShowModal.deposit}
        setShow={(show) => handleModal("deposit", show)}
        onClose={() => handleModal("deposit", false)}
        transaction={selectedData}
      />

      <WithdrawDetailModal
        show={isShowModal.withdraw}
        setShow={(show) => handleModal("withdraw", show)}
        onClose={() => handleModal("withdraw", false)}
        transaction={selectedData}
        setAction={(val) => setIsUpdated(val)}
      />

      <WagerDetailModal
        show={isShowModal.game}
        setShow={(show) => handleModal("game", show)}
        onClose={() => handleModal("game", false)}
        transaction={selectedData}
      />
    </DefaultLayout>
  );
};

const UserAuth = withAuth(User);
export default UserAuth;
