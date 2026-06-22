"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useCallback, useState } from "react";
import withAuth from "@/hooks/withAuth";
import Filters from "@/components/filter/FilterBox";
import moment from "moment-timezone";
import CustomTable from "@/components/common/Table/CustomTable";
import { GAME_LIST_COLUMN } from "@/config/columns";
import {
  getGameById,
  getGameList,
  getGameStatistics,
} from "@/services/apis/game";
import { userSiteUrl } from "@/config";
import { convertToUrlCase } from "@/utils/convertor";
import SvgColor from "@/assets/svgs/SvgColor";
import Image from "next/image";
import GameDetailModal from "@/components/DetailModals/GaneDetailModal";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const GameList: React.FC = () => {
  const [filters, setFilters] = useState({
    title: "",
    identifier: "",
    producers: [],
  });

  const [isSelectedGame, setIsSelectedGame] = useState(false);
  const [selectedGame, setSelectedGame] = useState<any>();

  const getGame = useCallback(
    async (page: number, page_size: number) => {
      const response = await getGameList({
        page,
        page_size,
        title: filters.title,
        identifier: filters.identifier,
        producers: JSON.stringify(filters.producers),
      });

      const _games =
        response?.games?.map((item: any) => ({
          id: item?.id || "",
          title: item?.title || "",
          identifier: item?.identifier || "",
          producerId: item?.producer_id || "",
          producerIdentifier: item?.producer_identifier || "",
          category: item?.category || "",
          theme: item?.theme,
          releasedAt: moment(item?.released_at).format("yyyy-MM-DD HH:mm:ss"),
          icon: (
            <>
              <a
                href={`${userSiteUrl}/game/?gameId=${convertToUrlCase(item.identifier)}`}
                target="_blank"
              >
                <Image
                  src={`https://cdn.softswiss.net/i/s4/${(item.identifier || "").replace(":", "/")}.png`}
                  alt=""
                  width={160}
                  height={160}
                  className="h-[40px] w-[40px]"
                />
              </a>
            </>
          ),
        })) || [];
      return {
        data: _games,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [filters],
  );

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

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Game List" />
      <div className=" grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
              Game List
            </h4>
            <Filters
              data={[
                {
                  type: "text",
                  value: filters.title,
                  placeholder: "Title",
                  setValue: (val) => setFilters({ ...filters, title: val }),
                },
                {
                  type: "text",
                  value: filters.identifier,
                  placeholder: "Identifier",
                  setValue: (value) =>
                    setFilters({ ...filters, identifier: value }),
                },
              ]}
            />

            <div className="flow-root">
              <CustomTable
                getData={getGame}
                columns={GAME_LIST_COLUMN}
                onRow={(row) => {
                  getGameDetail(row.id);
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <GameDetailModal
        show={isSelectedGame}
        onClose={() => setIsSelectedGame(false)}
        setShow={setIsSelectedGame}
        gameInfo={selectedGame}
      />
    </DefaultLayout>
  );
};

const GameListAuth = withAuth(GameList);
export default GameListAuth;
