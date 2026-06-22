"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomTable from "@/components/common/Table/CustomTable";
import PayoutTable from "@/components/common/Table/PayoutTable";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddTierPopup from "@/components/Tier/AddTierPopup";
import TierNav from "@/components/Tier/TierNav";
import { TIER_PAYOUT_COLUMN } from "@/config/columns";
import RoleBasedGuard from "@/hooks/RoleBaseGuard";
import withAuth from "@/hooks/withAuth";
import {
  confirmPayout,
  getPayoutList,
  getTier1List,
  getTier2List,
} from "@/services/apis/tier";
import { ROLES } from "@/types";
import cn from "classnames";
import moment from "moment-timezone";
import { useCallback, useState } from "react";

function TierPayout() {
  const currentYear = new Date().getFullYear();
  const [addPopup, setAddPopup] = useState(false);
  const [created, setCreated] = useState(0);
  const [popupTitle, setPopupTitle] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const getTierData = useCallback(
    async (page: number, page_size: number) => {
      const response = await getPayoutList({
        year: selectedYear,
        page,
        page_size,
      });

      const _data = response.tiers.map((item: any) => ({
        id: item?.id || "",
        name: item?.name || "",
        email: item?.email || "",
        phone: item?.phone || "",
        role: item?.role,
        wagerSettlement: Number(item?.wager_settlement_percent || 0),
        losingSettlement: Number(item?.losing_settlement_percent || 0),
        jan: {
          value: Number(item.data["1"].amount_usd || 0),
          status: item.data["1"].status,
        },
        feb: {
          value: Number(item.data["2"].amount_usd || 0),
          status: item.data["2"].status,
        },
        mar: {
          value: Number(item.data["3"].amount_usd || 0),
          status: item.data["3"].status,
        },
        apr: {
          value: Number(item.data["4"].amount_usd || 0),
          status: item.data["4"].status,
        },
        may: {
          value: Number(item.data["5"].amount_usd || 0),
          status: item.data["5"].status,
        },
        jun: {
          value: Number(item.data["6"].amount_usd || 0),
          status: item.data["6"].status,
        },
        jul: {
          value: Number(item.data["7"].amount_usd || 0),
          status: item.data["7"].status,
        },
        aug: {
          value: Number(item.data["8"].amount_usd || 0),
          status: item.data["8"].status,
        },
        sep: {
          value: Number(item.data["9"].amount_usd || 0),
          status: item.data["9"].status,
        },
        oct: {
          value: Number(item.data["10"].amount_usd || 0),
          status: item.data["10"].status,
        },
        nov: {
          value: Number(item.data["11"].amount_usd || 0),
          status: item.data["11"].status,
        },
        dec: {
          value: Number(item.data["12"].amount_usd || 0),
          status: item.data["12"].status,
        },
      }));
      return {
        data: _data,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [created, selectedYear],
  );

  return (
    <>
      <DefaultLayout>
        <>
          <Breadcrumb pageName="Payout Management" />
          <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
            {/* <div className="col-span-12 xl:col-span-12">
              <TierNav />
            </div> */}

            <div className="col-span-12 xl:col-span-12">
              <div className="col-span-12 xl:col-span-5">
                <div className="rounded-sm border border-stroke bg-white px-4 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4">
                  <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Tier Payout
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {Array(4)
                      .fill("")
                      .map((_, index) => (
                        <div key={index} className="block">
                          <button
                            onClick={() => setSelectedYear(currentYear + index)}
                            className={cn(
                              "inline-block w-full rounded-sm border border-primary p-2 text-center shadow-sm hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-primary",
                              {
                                "bg-primary text-white":
                                  selectedYear === currentYear + index,
                              },
                            )}
                          >
                            {currentYear + index}
                          </button>
                        </div>
                      ))}
                  </div>

                  <div className="mt-2 overflow-x-auto border border-solid border-slate-200 shadow dark:border-strokedark sm:rounded-lg">
                    <PayoutTable
                      selectedYear={selectedYear}
                      columns={TIER_PAYOUT_COLUMN}
                      getData={getTierData}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </DefaultLayout>
    </>
  );
}

const TierPayoutAuth = withAuth(TierPayout);

export default TierPayoutAuth;
