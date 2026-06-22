"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useCallback, useEffect, useState } from "react";
import withAuth from "@/hooks/withAuth";
import Filters from "@/components/filter/FilterBox";
import CustomTable from "@/components/common/Table/CustomTable";
import { SWAP_COLUMN } from "@/config/columns";
import { getSwapTransactions } from "@/services/apis/swap";
import { getCryptoSymbols } from "@/services/apis/currency";
import SwapDetailModal from "@/components/DetailModals/SwapDetailModal";
import Link from "next/link";
import { PATH_PAGE } from "@/config/path";
import { SortType } from "@/types";
import moment from "moment-timezone";

const SwapHistory: React.FC = () => {
  const [symbols, setSymbols] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [filters, setFilters] = useState({
    startTime: Date.now() - 30 * 24 * 60 * 60 * 1000,
    endTime: Date.now(),
    fromSymbols: [],
    toSymbols: [],
    user: "",
  });

  const [isTransaction, setIsTransaction] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>();

  const getTransactions = useCallback(
    async (page: number, page_size: number, sortData: { column: string; order: SortType }) => {
      const response = await getSwapTransactions({
        page,
        page_size,
        user: filters.user,
        from_symbols: JSON.stringify(filters.fromSymbols),
        to_symbols: JSON.stringify(filters.toSymbols),
        start_time: filters.startTime / 1000,
        end_time: filters.endTime / 1000,
        sort_column: sortData.column,
        sort_order: sortData.order
      });

      const _Transactions =
        response?.transactions?.map((item: any) => ({
          created_at: moment(new Date(item?.created_at)).format(
            "yyyy-MM-DD HH:mm:ss",
          ),
          from_amount: Number(item?.from_amount || 0),
          from_amount_usd: Number(item?.from_amount_usd || 0),
          from_symbol: item?.from_symbol || "",
          id: item?.id || "",
          to_amount: Number(item?.to_amount || 0),
          to_amount_usd: Number(item?.to_amount_usd || 0),
          to_symbol: item?.to_symbol || "",
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
    setSymbols(_options);
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <DefaultLayout>
      <div className=" grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
              Swap Transactions
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
                  options: symbols,
                  value: filters.fromSymbols,
                  placeholder: "Select FromSymbol",
                  setValue: (value) =>
                    setFilters({ ...filters, fromSymbols: value }),
                },
                {
                  type: "multiselect",
                  options: symbols,
                  value: filters.toSymbols,
                  placeholder: "Select ToSymbol",
                  setValue: (value) =>
                    setFilters({ ...filters, toSymbols: value }),
                },
              ]}
            />

            <div className="flow-root">
              <CustomTable
                getData={getTransactions}
                columns={SWAP_COLUMN}
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

      <SwapDetailModal
        show={isTransaction}
        setShow={setIsTransaction}
        onClose={() => setIsTransaction(false)}
        transaction={selectedTransaction}
      />
    </DefaultLayout>
  );
};

const SwapHistoryAuth = withAuth(SwapHistory);
export default SwapHistoryAuth;
