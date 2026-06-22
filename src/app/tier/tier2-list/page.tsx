"use client";
import SvgColor from "@/assets/svgs/SvgColor";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CustomTable from "@/components/common/Table/CustomTable";
import EditTierDetailModal from "@/components/DetailModals/EditTierDetailModal";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddTierPopup from "@/components/Tier/AddTierPopup";
import TierNav from "@/components/Tier/TierNav";
import { TIER2_LIST_COLUMN, TIER_LIST_COLUMN } from "@/config/columns";
import RoleBasedGuard from "@/hooks/RoleBaseGuard";
import withAuth from "@/hooks/withAuth";
import {
  getTier1List,
  getTier2List,
  getTierDataById,
} from "@/services/apis/tier";
import { ROLES } from "@/types";
import moment from "moment-timezone";
import { useCallback, useState } from "react";

function TierSecond() {
  const [addPopup, setAddPopup] = useState(false);
  const [created, setCreated] = useState(0);
  const [popupTitle, setPopupTitle] = useState("");
  const [isSelectedTier, setIsSelectedTier] = useState(false);
  const [selectedTier, setSelectedTier] = useState<any>();

  const getTierData = useCallback(
    async (page: number, page_size: number) => {
      const response = await getTier2List({ page, page_size });
      const data = response?.tiers?.map((res: any) => ({
        id: res?.id,
        name: res?.name || "",
        parent_tier1: res?.parent_tier1 || "",
        wager_settlement: Number(res?.wager_settlement_percent || 0),
        losing_settlement: Number(res?.losing_settlement_percent || 0),
        wager_commission: Number(res?.wager_commission_amount_usd?.total || 0),
        losing_commission: Number(
          res?.losing_commission_amount_usd?.total || 0,
        ),
        total_wager: Number(res?.player_wager_amount_usd?.total || 0),
        total_win: Number(res?.player_win_amount_usd?.total || 0),
        total_lose: Number(res?.player_lose_amount_usd?.total || 0),
        total_bonus_payout: Number(res?.player_bonus_amount_usd?.total || 0),
        total_profit: Number(res?.system_profit_amount_usd?.total || 0),
        total_deposit: Number(res?.total_deposit_amount_usd || 0),
        total_withdraw: Number(res?.total_withdraw_amount_usd || 0),
        date: moment(res?.registered_at).format("yyyy-MM-DD") || "",
        edit: (
          <>
            <div className="block" onClick={() => handleRow(res?.id)}>
              <SvgColor
                src="/assets/icons/edit.svg"
                style={{ width: 20, height: 20 }}
              />
            </div>
          </>
        ),
      }));
      return {
        data,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [created],
  );

  const handleRow = async (tierId: string) => {
    // const tierId = tier?.id;
    if (!tierId) return;
    const response = await getTierDataById({ id: tierId });
    const _selectedTier = {
      id: response?.id,
      name: response?.name,
      email: response?.email,
      phone: response?.phone,
      code: response?.code,
      wagerSettlement: Number(response?.wager_settlement_percent),
      losingSettlement: Number(response?.losing_settlement_percent),
    };
    setSelectedTier(_selectedTier);
    setIsSelectedTier(true);
  };

  const handleCloseAddTier = () => {
    setAddPopup(false);
  };
  return (
    <>
      <DefaultLayout>
        <>
          <Breadcrumb pageName="Tier2 List" />
          <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
            {/* <div className="col-span-12 xl:col-span-12">
              <TierNav />
            </div> */}

            <div className="col-span-12 xl:col-span-12">
              <div className="col-span-12 xl:col-span-5">
                <div className="rounded-sm border border-stroke bg-white px-4 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-4">
                  <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                    Tier 2 Section
                  </h4>
                  <RoleBasedGuard roles={[ROLES.ADMIN, ROLES.TIER1]}>
                    <div className="col-span-12 xl:col-span-12">
                      <div className="flex justify-end">
                        <button
                          onClick={() => setAddPopup(true)}
                          className="inline-block  w-full max-w-30 rounded-sm border border-primary   bg-primary p-2 text-center text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-primary"
                        >
                          Add Tier{" "}
                        </button>
                      </div>
                    </div>
                  </RoleBasedGuard>

                  <div className="mt-2 overflow-x-auto">
                    <CustomTable
                      columns={TIER2_LIST_COLUMN}
                      getData={getTierData}
                      // onRow={(row) => handleRow(row)}
                    />
                  </div>
                </div>
              </div>
              {/* <TierTable tableTitle="Tier 1 Section" /> */}
            </div>
          </div>
          <AddTierPopup
            addPopup={addPopup}
            setAddPopup={setAddPopup}
            handleCloseAddTier={handleCloseAddTier}
            roleType={ROLES.TIER2}
            setCreated={(created: number) => setCreated(created)}
          />

          <EditTierDetailModal
            show={isSelectedTier}
            setShow={setIsSelectedTier}
            onClose={() => {
              setCreated(Date.now());
              setIsSelectedTier(false);
            }}
            tierInfo={selectedTier}
          />
        </>
      </DefaultLayout>
    </>
  );
}

const TierSecondAuth = withAuth(TierSecond);

export default TierSecondAuth;
