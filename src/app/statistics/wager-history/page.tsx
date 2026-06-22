"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useCallback, useEffect, useState } from "react";
import withAuth from "@/hooks/withAuth";
import Filters from "@/components/filter/FilterBox";
import moment from "moment-timezone";
import CustomTable from "@/components/common/Table/CustomTable";
import { WAGER_COLUMN } from "@/config/columns";
import {
  getGameById,
  getGameStatistics,
  getTransactionInfo,
  getWagerTransactions,
} from "@/services/apis/game";
import TopStatsSection from "@/components/SummaryInfo/TopStatsSection";
import { getCryptoSymbols } from "@/services/apis/currency";
import { currencyFormat } from "@/utils/format";
import WagerDetailModal from "@/components/DetailModals/WagerDetailModal";
import Link from "next/link";
import { PATH_PAGE } from "@/config/path";
import GameDetailModal from "@/components/DetailModals/GaneDetailModal";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { SortType } from "@/types";

const WagerHistory: React.FC = () => {
  const [summaryInfo, setSummaryInfo] = useState<
    { title: string; value: string }[]
  >([]);

  const [currencies, setCurrencies] = useState<
    { label: string; value: string }[]
  >([]);

  const [isTransaction, setIsTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>();

  const [isSelectedGame, setIsSelectedGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>();

  const [filters, setFilters] = useState({
    startTime: Date.now() - 30 * 24 * 60 * 60 * 1000,
    endTime: Date.now(),
    currencies: [],
    game: "",
    user: "",
  });

  const getTransactions = useCallback(
    async (
      page: number,
      page_size: number,
      sortData: { column: string; order: SortType },
    ) => {
      const response = await getWagerTransactions({
        page,
        page_size,
        user: filters.user,
        game: filters.game,
        currencies: JSON.stringify(filters.currencies),
        start_time: filters.startTime / 1000,
        end_time: filters.endTime / 1000,
        sort_column: sortData.column,
        sort_order: sortData.order
      });

      const _Transactions =
        response?.transactions?.map((item: any) => ({
          id: item?.id || "",
          created_at: moment(new Date(item.created_at)).format(
            "yyyy-MM-DD HH:mm:ss",
          ),
          userId: item?.user_id || "",
          userName: (
            <Link
              className="hover:underline"
              href={`${PATH_PAGE.management.player.user(item?.user_id)}`}
            >
              {item?.user_name || ""}
            </Link>
          ),
          userType: item?.user_type || "",
          gameId: item?.game_id || "",
          gameIdentifier: item?.game_identifier || "",
          game_title: (
            <div className="block" onClick={() => getGameDetail(item?.game_id)}>
              {item?.game_title || ""}
            </div>
          ),
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
        })) || [];
      return {
        data: _Transactions,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [filters],
  );

  const getCurrencies = async () => {
    const response = await getCryptoSymbols();
    const _options = response.map((item: any) => ({
      label: `${item.symbol}`,
      value: item.id,
    }));
    setCurrencies(_options);
  };

  const getSummaryInfo = useCallback(async () => {
    const response = await getTransactionInfo({
      start_time: filters.startTime / 1000,
      end_time: filters.endTime / 1000,
    });
    const _summary = [
      {
        title: "Period",
        value: `${moment(filters.startTime).format("yyyy-MM-DD HH:mm:ss")} - ${moment(filters.endTime).format("yyyy-MM-DD HH:mm:ss")}`,
      },
      {
        title: "Betting Amount (Count of Bet)",
        value: `${currencyFormat(response.total_wager_amount_usd, 2)} (${response.total_wager_count})`,
      },
      {
        title: "Win Amount (Count of Win)",
        value: `${currencyFormat(response.total_win_amount_usd, 2)} (${response.total_win_count})`,
      },
      {
        title: "Profit",
        value: `${currencyFormat(response.total_lose_amount_usd - response.total_win_amount_usd, 2)}`,
      },
    ];

    setSummaryInfo(_summary);
  }, [filters.startTime, filters.endTime]);

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

  useEffect(() => {
    getSummaryInfo();
  }, [getSummaryInfo]);

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Wager History" />
      <div className=" grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
              Wager Transactions
            </h4>
            <Filters
              data={[
                {
                  type: "text",
                  value: filters.user,
                  placeholder: "User",
                  setValue: (val) => setFilters({ ...filters, user: val }),
                },
                {
                  type: "datepicker",
                  value: filters.startTime,
                  placeholder: "Start Date",
                  setValue: (value) =>
                    setFilters({ ...filters, startTime: value }),
                },
                {
                  type: "datepicker",
                  value: filters.endTime,
                  placeholder: "End Date",
                  setValue: (value) =>
                    setFilters({ ...filters, endTime: value }),
                },
                {
                  type: "multiselect",
                  value: filters.currencies,
                  placeholder: "Select Symbol",
                  options: currencies,
                  setValue: (value) =>
                    setFilters({ ...filters, currencies: value }),
                },
              ]}
            />
            <TopStatsSection sections={summaryInfo} />
            <div className="flow-root">
              <CustomTable
                getData={getTransactions}
                columns={WAGER_COLUMN}
                onRow={(row) => {
                  setSelectedTransaction(row);
                  setIsTransaction(true);
                }}
                defaultSort={{ column: "created_at", order: SortType.DESC }}
              />
            </div>
          </div>
        </div>
      </div>

      <WagerDetailModal
        show={isTransaction}
        setShow={setIsTransaction}
        onClose={() => setIsTransaction(false)}
        transaction={selectedTransaction}
      />

      <GameDetailModal
        show={isSelectedGame}
        setShow={setIsSelectedGame}
        onClose={() => setIsSelectedGame(false)}
        gameInfo={selectedGame}
      />
    </DefaultLayout>
  );
};

const WagerHistoryAuth = withAuth(WagerHistory);
export default WagerHistoryAuth;
