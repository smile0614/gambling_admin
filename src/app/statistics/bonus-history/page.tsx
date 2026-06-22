"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useCallback, useState } from "react";
import withAuth from "@/hooks/withAuth";
import { bonusType, SortType } from "@/types";
import Filters from "@/components/filter/FilterBox";
import moment from "moment-timezone";
import CustomTable from "@/components/common/Table/CustomTable";
import { BONUS_COLUMN } from "@/config/columns";
import cn from "classnames";
import { getBonusTransaction } from "@/services/apis/bonus";
import Link from "next/link";
import { PATH_PAGE } from "@/config/path";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const filterAvailableTabs: bonusType[] = [
  "levelups",
  "cashbacks",
  "claims",
  "deposits",
];

const headerAvailableTabs: bonusType[] = [
  "levelups",
  "cashbacks",
  "claims",
  "deposits",
  "wagercontests"
]

const DepositWithdraw: React.FC = () => {
  const [activeTab, setActivetab] = useState<bonusType>("levelups");
  const [filters, setFilters] = useState({
    user: "",
  });

  const handleActiveTab = (value: bonusType) => {
    setActivetab(value);
  };

  const getTransactions = useCallback(
    async (
      page: number,
      page_size: number,
      sortData: { column: string; order: SortType },
    ) => {
      const response = await getBonusTransaction(
        {
          page,
          page_size,
          user: filters.user,
          sort_column: sortData.column,
          sort_order: sortData.order,
        },
        activeTab,
      );

      const _Transactions =
        response?.bonuses?.map((item: any) => ({
          id: item?.id || "",
          created_at: moment(item?.created_at).format("yyyy-MM-DD HH:mm:ss"),
          claimedAt: moment(item?.claimed_at).format("yyyy-MM-DD HH:mm:ss"),
          amount: Number(item?.amount || 0),
          amount_usd: Number(item?.amount_usd || 0),
          status: item?.claim_status,
          wallet_balance: Number(item?.wallet_balance || 0),
          wallet_balance_usd: Number(item?.wallet_balance_usd || 0),
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
        total_claimed_count: response.total_claimed_count
      };
    },
    [filters, activeTab],
  );

  const renderHeaders = useCallback(() => {
    const tabs: Array<{ title: string; key: bonusType }> = [
      { title: "Level Ups", key: "levelups" },
      { title: "CashBacks", key: "cashbacks" },
      { title: "RakeBack", key: "claims" },
      { title: "Deposits", key: "deposits" },
      { title: "Wager Contests", key: "wagercontests" },
      { title: "AirDrop", key: "airDrop" },
    ];

    return (
      <div className="flex flex-wrap justify-between gap-y-4 rounded-lg border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex w-full max-w-full flex-wrap gap-5">
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
      </div>
    );
  }, [activeTab]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bonus History" />
      <div className=" grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">{renderHeaders()}</div>

        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            {headerAvailableTabs.findIndex((filter) => filter === activeTab) !==
              -1 && (
              <h4 className="text-xl font-semibold capitalize text-black dark:text-white mb-4">
                {activeTab} Bonus Transactions
              </h4>
            )}

            {filterAvailableTabs.findIndex((filter) => filter === activeTab) !==
              -1 && (
              <Filters
                data={[
                  {
                    type: "text",
                    value: filters.user,
                    placeholder: "User",
                    setValue: (val) => setFilters({ ...filters, user: val }),
                  },
                ]}
              />
            )}

            <div className="flow-root">
              <CustomTable
                getData={getTransactions}
                columns={BONUS_COLUMN}
                defaultSort={{ column: "created_at", order: SortType.ASC }}
                header={
                  activeTab !== "airDrop"
                    ? ""
                    : `${activeTab} Bonus Transactions`
                }
              />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

const DepositWithdrawAuth = withAuth(DepositWithdraw);
export default DepositWithdrawAuth;
