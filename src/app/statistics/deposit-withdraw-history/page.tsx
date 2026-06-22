"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useCallback, useState } from "react";
import withAuth from "@/hooks/withAuth";
import DepositNav from "@/components/DepositWithdarw/DepositNav";
import { getDepositTransactions, getTotalDeposit } from "@/services/apis/deposit";
import { DepositStatus, SortType, WithdrawStatus } from "@/types";
import Filters from "@/components/filter/FilterBox";
import moment from "moment-timezone";
import CustomTable from "@/components/common/Table/CustomTable";
import { DEPOSIT_COLUMN } from "@/config/columns";
import { getTotalWithdraw, getWithdrawTransactions } from "@/services/apis/withdraw";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  getCryptoCurrencyFullList,
  getCryptoCurrencyList,
} from "@/services/apis/currency";
import DepositDetailModal from "@/components/DetailModals/DepositDetailModal";
import WithdrawDetailModal from "@/components/DetailModals/WithdrawDetailModal";
import { currencyFormat, getTransactionLink } from "@/utils/format";
import { transformWalletAddress } from "../../../utils/format";
import Link from "next/link";
import { PATH_PAGE } from "@/config/path";
import cn from "classnames";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

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

const DepositWithdraw: React.FC = () => {
  const params = useSearchParams();
  const [activeTab, setActivetab] = useState<"deposit" | "withdraw">(
    params?.get("type")
      ? params?.get("type") === "withdraw"
        ? "withdraw"
        : "deposit"
      : "deposit",
  );
  const [currencies, setCurrencies] = useState<
    { label: string; value: string }[]
  >([]);

  const [selectedTransaction, setSelectedTransaction] = useState<any>();
  const [isTransaction, setIsTransaction] = useState(false);
  const [isAction, setIsAction] = useState<string | number>(0);
  const [totalData, setTotalData] = useState({
    deposit: 0,
    withdraw: 0,
  });

  const [filters, setFilters] = useState({
    depositStatus: DepositStatus.ALL,
    withdrawStatus: params?.get("status")
      ? params?.get("status") === "pending"
        ? WithdrawStatus.PENDING
        : WithdrawStatus.ALL
      : WithdrawStatus.ALL,
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

  const renderHeaders = useCallback((deposit: number, withdraw: number) => {
    const tabs: Array<{ title: string; key: "deposit" | "withdraw" }> = [
      { title: "Deposit List", key: "deposit" },
      { title: "Withdraw List", key: "withdraw" },
    ];

    return (
      <div className="flex flex-wrap justify-between gap-y-4 rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex w-full max-w-full flex-wrap gap-5 lg:max-w-[560px]">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={cn(
                `flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center   text-primary shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`,
                {
                  "bg-primary text-white": activeTab === tab.key,
                },
              )}
              onClick={() => handleActiveTab(tab.key)}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="flex gap-6 ">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">Total deposit</span>
            <h4 className="text-title-sm font-bold text-black dark:text-white ">
              {currencyFormat(deposit, 2)}
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">Total withdrawal</span>
            <h4 className="text-title-sm font-bold text-black dark:text-white ">
              {currencyFormat(withdraw, 2)}
            </h4>
          </div>
        </div>
      </div>
    );
  }, [activeTab]);

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
          sort_column: sortData.column,
          sort_order: sortData.order,
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
          sort_column: sortData.column,
          sort_order: sortData.order,
        });
      }

      const _response =
        response?.transactions?.map((item: any) => ({
          amount: Number(item?.amount || 0),
          amount_usd: Number(item?.amount_usd || 0).toFixed(4),
          fee: Number(item?.fee || 0),
          fee_usd: Number(item?.fee_usd || 0),
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
          userName: (
            <Link
              className="hover:underline"
              href={`${PATH_PAGE.management.player.user(item?.user_id)}`}
            >
              {item?.user_name || ""}
            </Link>
          ),
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
    [filters, activeTab, isAction],
  );

  const getTotalData = useCallback(async () => {
    const timeData = {
      start_time: filters.startTime / 1000,
      end_time: filters.endTime / 1000,
      interval: -1,
    };
    const [_resDeposit, _resWithdraw] = await Promise.all([
      getTotalDeposit(timeData),
      getTotalWithdraw(timeData),
    ]);

    setTotalData({
      deposit: Number(_resDeposit[0]?.sum || 0),
      withdraw: Number(_resWithdraw[0]?.sum || 0),
    });
  }, [filters.startTime, filters.endTime]);

  useEffect(() => {
    getTotalData();
  }, [getTotalData]);

  const getCurrencies = async () => {
    const response = await getCryptoCurrencyFullList();
    const _options = response.map((item: any) => ({
      label: `${item.network} - ${item.symbol}`,
      value: item.id,
    }));
    setCurrencies(_options);
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={activeTab === "deposit" ? "Deposit" : "Withdraw"} />
      <div className=" grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">{renderHeaders(totalData.deposit, totalData.withdraw)}</div>

        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
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
                  setValue: (value) =>
                    setFilters({ ...filters, endTime: value }),
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
                {
                  type: "multiselect",
                  options: currencies,
                  value: filters.cryptoCurrencies,
                  placeholder: "Select Currency",
                  setValue: (value) =>
                    setFilters({ ...filters, cryptoCurrencies: value }),
                },
              ]}
            />

            <div className="flow-root">
              <CustomTable
                getData={getTransactions}
                columns={DEPOSIT_COLUMN}
                onRow={(data) => {
                  setSelectedTransaction(data);
                  setIsTransaction(true);
                }}
                defaultSort={{ column: "created_at", order: SortType.DESC }}
              />
            </div>
          </div>
        </div>
      </div>

      <DepositDetailModal
        onClose={() => setIsTransaction(false)}
        show={isTransaction && activeTab === "deposit"}
        setShow={setIsTransaction}
        transaction={selectedTransaction}
      />

      <WithdrawDetailModal
        onClose={() => setIsTransaction(false)}
        show={isTransaction && activeTab === "withdraw"}
        setShow={setIsTransaction}
        transaction={selectedTransaction}
        setAction={setIsAction}
      />
    </DefaultLayout>
  );
};

const DepositWithdrawAuth = withAuth(DepositWithdraw);
export default DepositWithdrawAuth;
