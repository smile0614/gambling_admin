"use client";
import React, { useCallback, useState } from "react";
import withAuth from "@/hooks/withAuth";
import DepositNav from "@/components/DepositWithdarw/DepositNav";
import { getDepositTransactions } from "@/services/apis/deposit";
import { DepositStatus, SortType, WithdrawStatus } from "@/types";
import Filters from "@/components/filter/FilterBox";
import moment from "moment-timezone";
import CustomTable from "@/components/common/Table/CustomTable";
import { DEPOSIT_COLUMN, Tier_DEPOSIT_COLUMN } from "@/config/columns";
import { getWithdrawTransactions } from "@/services/apis/withdraw";
import { getTransactionInfo } from "@/services/apis/game";
import { transformWalletAddress } from "@/utils/format";

const depositOptions = [
  { label: "Processing", value: DepositStatus.PROCESSING },
  { label: "Complete", value: DepositStatus.COMPLETE },
  { label: "Failed", value: DepositStatus.FAILED },
  { label: "All", value: DepositStatus.ALL },
];

const withdrawOptions = [
  { label: "All", value: WithdrawStatus.ALL },
  { label: "Pending", value: WithdrawStatus.PENDING },
  { label: "Processing", value: WithdrawStatus.PROCESSING },
  { label: "Complete", value: WithdrawStatus.COMPLETE },
  { label: "Failed", value: WithdrawStatus.FAILED },
  { label: "Approved", value: WithdrawStatus.APPROVED },
  { label: "Rejected", value: WithdrawStatus.REJECTED },
];

const DepositWithdrawComponents: React.FC = () => {
  const [activeTab, setActivetab] = useState<"deposit" | "withdraw">("deposit");

  const [filters, setFilters] = useState({
    depositStatus: DepositStatus.ALL,
    withdrawStatus: WithdrawStatus.ALL,
    startTime: Date.now() - 30 * 24 * 60 * 60 * 1000,
    endTime: Date.now(),
    fromAddress: "",
    toAddress: "",
    cryptoCurrencies: [],
    user: "",
  });

  const handleActiveTab = (value: "deposit" | "withdraw") => {
    setActivetab(value);
  };

  const getTransactions = useCallback(
    async (
      page: number,
      page_size: number,
      sortData: { column: string; order: SortType },
    ) => {
      let response: any;
      if (activeTab === "deposit") {
        response = await getDepositTransactions({
          page,
          page_size,
          user: filters.user,
          from_address: filters.fromAddress,
          to_address: filters.toAddress,
          cryptocurrencies: JSON.stringify(filters.cryptoCurrencies),
          status: filters.depositStatus,
          start_time: filters.startTime / 1000,
          end_time: filters.endTime / 1000,
          sort_column: "created_at",
          sort_order: SortType.DESC,
        });
      } else {
        response = await getWithdrawTransactions({
          page,
          page_size,
          user: filters.user,
          from_address: filters.fromAddress,
          to_address: filters.toAddress,
          cryptocurrencies: JSON.stringify(filters.cryptoCurrencies),
          status: filters.withdrawStatus,
          start_time: filters.startTime / 1000,
          end_time: filters.endTime / 1000,
          sort_column: "created_at",
          sort_order: SortType.DESC,
        });
      }

      const _Transactions =
        response?.transactions?.map((item: any) => ({
          amount: Number(item.amount || 0),
          amount_usd: Number(item.amount_usd || 0).toFixed(4),
          created_at: moment(new Date(item.created_at)).format(
            "yyyy-MM-DD HH:mm:ss",
          ),
          cryptoCurrencyId: item.cryptocurrency_id,
          from_address: item.from_address,
          to_address: item.to_address,
          hash: (
            <a
              href={`${getTransactionInfo(item.network)}/${item?.hash}`}
              target="_blank"
              className="hover:underline"
            >
              {transformWalletAddress(item?.hash || "")}
            </a>
          ),
          id: item.id,
          network: item.network,
          status: item.status,
          symbol: item.symbol,
          userId: item.user_id,
          userName: item.user_name,
          userType: item?.user_type || ''
        })) || [];
      return {
        data: _Transactions,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [filters, activeTab],
  );

  return (
    <div className=" grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
      <div className="col-span-12 xl:col-span-12">
        <DepositNav handleActiveTab={handleActiveTab} activeTab={activeTab} />
      </div>

      <div className="col-span-12 xl:col-span-12">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
          <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
            {activeTab} Transactions
          </h4>
          <Filters
            data={[
              {
                type: "select",
                value:
                  activeTab === "deposit"
                    ? filters.depositStatus
                    : filters.withdrawStatus,
                options:
                  activeTab === "deposit" ? depositOptions : withdrawOptions,
                setValue: (value) =>
                  setFilters({
                    ...filters,
                    [activeTab === "deposit"
                      ? "depositStatus"
                      : "withdrawStatus"]: value,
                  }),
              },
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
                setValue: (value) => setFilters({ ...filters, endTime: value }),
              },
              {
                type: "text",
                value: filters.fromAddress,
                placeholder: "From Address",
                setValue: (value) =>
                  setFilters({ ...filters, fromAddress: value }),
              },
              {
                type: "text",
                value: filters.toAddress,
                placeholder: "To Address",
                setValue: (value) =>
                  setFilters({ ...filters, toAddress: value }),
              },
            ]}
          />

          <div className="flow-root">
            <CustomTable
              getData={getTransactions}
              columns={Tier_DEPOSIT_COLUMN}
              defaultSort={{
                column: "amount_usd",
                order: SortType.DESC,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(DepositWithdrawComponents);
