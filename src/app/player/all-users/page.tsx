"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import withAuth from "@/hooks/withAuth";
import moment from "moment-timezone";
import CustomTable from "@/components/common/Table/CustomTable";
import { SOLO_PLAYER_COLUMN } from "@/config/columns";
import {
  getLiveUserList,
  getPlayerList,
  getSolorUser,
  getUserByCountry,
  getUserDataById,
} from "@/services/apis/users";
import Filters from "@/components/filter/FilterBox";
import UserDetailModal from "@/components/DetailModals/UserDetailModal";
import Link from "next/link";
import { PATH_PAGE } from "@/config/path";
import { getKycStatus } from "@/utils/common";
import { SortType } from "@/types";
import { useSearchParams } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const AllUsers: React.FC = () => {
  const route = useSearchParams();
  const country = route?.get("country");
  const sort = route?.get("sort");
  const type = route?.get("type");

  const renderType = () => {
    const _type = String(type);
    switch (_type) {
      case "all":
        return "All";
      case "solo":
        return "Solo";
      case "online":
        return "Online";

      default:
        return "All";
    }
  };

  const [option, setOption] = useState<"All" | "Solo" | "Online">(renderType());
  const [search, setSearch] = useState("");
  const [isUser, setIsUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>();
  const [updated, setUpdated] = useState(0);

  const getPlayers = useCallback(
    async (
      page: number,
      page_size: number,
      sortData?: { column: string; order: SortType },
    ) => {
      let response: any;
      switch (option) {
        case "All":
          response = await getPlayerList({
            page,
            page_size,
            search,
            sort_column: sortData?.column,
            sort_order: sortData?.order,
          });
          break;
        case "Online":
          response = await getLiveUserList({
            page,
            page_size,
            search,
            sort_column: sortData?.column,
            sort_order: sortData?.order,
          });
          break;
        case "Solo":
          response = await getSolorUser({
            page,
            page_size,
            search,
            sort_column: sortData?.column,
            sort_order: sortData?.order,
          });

        default:
          response = await getPlayerList({
            page,
            page_size,
            search,
            sort_column: sortData?.column,
            sort_order: sortData?.order,
          });
          break;
      }

      const data = response?.users?.map((res: any) => ({
        id: res?.id || "",
        avatar: res?.avatar || "",
        name: (
          <Link
            className="hover:underline"
            href={`${PATH_PAGE.management.player.user(res?.id)}`}
          >
            {res?.name || ""}
          </Link>
        ),
        vip_level: res?.vip_level || 0,
        email: res?.email || "",
        phone: res?.phone || "",
        tg: res?.telegram_user_name || "",
        walletAddress: res?.wallet_address || "",
        referralCode: res?.referral_code || "",
        registered_at: moment(res?.registered_at).format("yyyy-MM-DD HH:mm:ss"),
        kyc: res?.kyc,
        kycFront: res?.kyc_photo_front,
        kycBack: res?.kcy_photo_back,
        total_deposit_amount_usd: Number(res?.total_deposit_amount_usd || 0),
        total_withdraw_amount_usd: Number(res?.total_withdraw_amount_usd || 0),
        total_wager_amount_usd: Number(res?.total_wager_amount_usd || 0),
        total_win_amount_usd: Number(res?.total_win_amount_usd || 0),
        // totalLoseAmountUsd: Number(res?.total_lose_amount_usd || 0),
        total_profit_amount_usd: Number(res?.total_profit_amount_usd || 0),
        total_bonus_amount_usd: Number(res?.total_bonus_amount_usd || 0),
        total_balance_usd: Number(res?.total_balance_usd || 0)
      }));
      return {
        data: data,
        page: response.page,
        pageSize: page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [search, updated, option],
  );

  const getPlayersByCountry = useCallback(
    async (
      page: number,
      page_size: number,
      sortData?: { column: string; order: SortType },
    ) => {
      const response = await getUserByCountry({
        page: page,
        page_size: page_size,
        code: String(country),
        search: search,
        sort_column: sortData?.column,
        sort_order: sortData?.order,
      });

      const data = response?.users?.map((res: any) => ({
        id: res?.id || "",
        avatar: res?.avatar || "",
        name: (
          <Link
            className="hover:underline"
            href={`${PATH_PAGE.management.player.user(res?.id)}`}
          >
            {res?.name || ""}
          </Link>
        ),
        vip_level: res?.vip_level || 0,
        email: res?.email || "",
        phone: res?.phone || "",
        tg: res?.telegram_user_name || "",
        walletAddress: res?.wallet_address || "",
        referralCode: res?.referral_code || "",
        registered_at: moment(res?.registered_at).format("yyyy-MM-DD HH:mm:ss"),
        kyc: res?.kyc,
        kycFront: res?.kyc_photo_front,
        kycBack: res?.kcy_photo_back,
        total_deposit_amount_usd: Number(res?.total_deposit_amount_usd || 0),
        total_withdraw_amount_usd: Number(res?.total_withdraw_amount_usd || 0),
        total_wager_amount_usd: Number(res?.total_wager_amount_usd || 0),
        total_win_amount_usd: Number(res?.total_win_amount_usd || 0),
        // totalLoseAmountUsd: Number(res?.total_lose_amount_usd || 0),
        total_profit_amount_usd: Number(res?.total_profit_amount_usd || 0),
        total_bonus_amount_usd: Number(res?.total_bonus_amount_usd || 0),
        total_balance_usd: Number(res?.total_balance_usd || 0)
      }));
      return {
        data: data,
        page: response.page,
        pageSize: page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [country, search],
  );

  const getUser = async (userInfo: any) => {
    const userId = userInfo?.id;
    if (!userId) return;
    const response = await getUserDataById({ id: userId });
    const _response = {
      id: response?.id,
      name: response?.name,
      avatar: response?.avatar,
      email: response?.email,
      vipLevel: response?.vip_level,
      phone: response?.phone,
      tg: response?.telegram_user_name || "",
      walletAddress: response?.wallet_address || "",
      referralCode: response?.referral_code || "",
      country: response?.country,
      language: response?.setting_language,
      role: response?.role,
      kyc: response?.kyc,
      kycFront: response?.kyc_photo_front,
      kycBack: response?.kcy_photo_back,

      registered: moment(response?.created_at).format("yyyy-MM-DD HH:mm:ss"),
      restricted: response?.restricted_to
        ? moment(response?.restricted_to).format("yyyy-MM-DD HH:mm:ss")
        : "No Restrict",
      disabled: response?.disabled_to
        ? moment(response?.disabled_to).format("yyyy-MM-DD HH:mm:ss")
        : "No disable",
    };
    setSelectedUser(_response);
    setIsUser(true);
  };

  const defaultSort = useMemo(() => {
    const _sort = String(sort);
    if (!_sort) return { column: "registered_at", order: SortType.ASC };
    switch (_sort) {
      case "wager":
        return { column: "total_wager_amount_usd", order: SortType.DESC };
      case "deposit":
        return { column: "total_deposit_amount_usd", order: SortType.DESC };
      case "withdraw":
        return { column: "total_withdraw_amount_usd", order: SortType.DESC };
      case "win":
        return { column: "total_win_amount_usd", order: SortType.DESC };
      case "profit":
        return { column: "total_profit_amount_usd", order: SortType.DESC };

      default:
        return { column: "registered_at", order: SortType.ASC };
    }
  }, [sort]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Players" />
      <div className=" grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
              Player List
            </h4>

            <Filters
              data={[
                {
                  type: "select",
                  value: option,
                  placeholder: "Option",
                  options: [
                    { label: "All", value: "All" },
                    { label: "Online", value: "Online" },
                    { label: "Solo", value: "Solo" },
                  ],
                  setValue: (val) => setOption(val),
                },
                {
                  type: "text",
                  value: search,
                  placeholder: "Search Id, Name, Referral, Contact",
                  setValue: (val) => setSearch(val),
                },
              ]}
            />

            <div className="flow-root">
              <CustomTable
                getData={country ? getPlayersByCountry : getPlayers}
                columns={SOLO_PLAYER_COLUMN}
                defaultSort={{
                  column: defaultSort.column,
                  order: defaultSort.order,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <UserDetailModal
        show={isUser}
        setShow={setIsUser}
        onClose={() => {
          setIsUser(false);
          setUpdated(Date.now());
        }}
        userInfo={selectedUser}
      />
    </DefaultLayout>
  );
};

const AllUsersAuth = withAuth(AllUsers);
export default AllUsersAuth;
