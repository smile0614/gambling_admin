"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useCallback, useState } from "react";
import withAuth from "@/hooks/withAuth";
import Filters from "@/components/filter/FilterBox";
import moment from "moment-timezone";
import CustomTable from "@/components/common/Table/CustomTable";
import { GAME_LIST_COLUMN, PRODUCER_LIST_COLUMN } from "@/config/columns";
import { getProviders } from "@/services/apis/game";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ProviderDetailModal from "@/components/DetailModals/ProviderDetailModa";

const ProducerList: React.FC = () => {
  const [filters, setFilters] = useState({
    name: "",
  });

  const [isProvider, setIsProvider] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<any>();
  const [isUpdated, setIsUpdated] = useState(0);


  const getProducerList = useCallback(
    async (page: number, page_size: number) => {
      const response = await getProviders({ name: filters.name });

      const providers =
        response?.map((item: any) => ({
          id: item?.id || "",
          name: item?.name || "",
          identifier: item?.identifier || "",
          count: Number(item?.count || 0),
          releasedAt: moment(item?.created_at).format("yyyy-MM-DD HH:mm:ss"),
          icon: `https://cdn.softswiss.net/logos/providers/color/${item.identifier}.svg`,
          isVisible: item.is_visible,
          priority: item.priority
        })) || [];
      return {
        data: providers,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [filters, isUpdated],
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Provider List" />
      <div className=" grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="flex justify-between">
              <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
                Provider List
              </h4>
              <button
                className={`flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center text-primary shadow-sm hover:bg-primary hover:text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                onClick={() => { setSelectedProvider({}); setIsProvider(true) }}
              >
                Add Provider
              </button>
            </div>
            <Filters
              data={[
                {
                  type: "text",
                  value: filters.name,
                  placeholder: "Name",
                  setValue: (val) => setFilters({ ...filters, name: val }),
                },
              ]}
            />

            <div className="flow-root">
              <CustomTable
                getData={getProducerList}
                columns={PRODUCER_LIST_COLUMN}
                onRow={(row) => {
                  setSelectedProvider(row)
                  setIsProvider(true)
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <ProviderDetailModal
        show={isProvider}
        onClose={() => setIsProvider(false)}
        setShow={setIsProvider}
        provider={selectedProvider}
        onChanged={setIsUpdated}
      />
    </DefaultLayout>
  );
};

const ProducerListAuth = withAuth(ProducerList);
export default ProducerListAuth;
