"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useCallback, useEffect, useState } from "react";
import withAuth from "@/hooks/withAuth";
import { CurrencyType } from "@/types";
import Filters from "@/components/filter/FilterBox";
import moment from "moment-timezone";
import CustomTable from "@/components/common/Table/CustomTable";
import { CURRENCY_LIST_COLUMN } from "@/config/columns";
import {
  getCryptoCurrencyList,
  getCryptoSymbols,
  getNetworks,
} from "@/services/apis/currency";
import CurrencyDetailModal from "@/components/DetailModals/CurrencyDetailModal";
import { useAppDispatch } from "@/redux/store";
import { setIsLoading } from "@/redux/reducers/auth.reducer";
import SvgColor from "@/assets/svgs/SvgColor";
import SwapFeeEditDeailModal from "@/components/DetailModals/SwapFeeDetailModal";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const CryptoCurrencyList: React.FC = () => {
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState({
    networks: [],
    symbols: [],
    type: CurrencyType.All,
  });

  const [isCurrency, setIsCurrency] = useState(false);
  const [isSwap, setIsSwap] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState<any>();
  const [changed, setChanged] = useState(0);

  const [networks, setNetworks] = useState<{ label: string; value: string }[]>(
    [],
  );

  const [symbols, setSymbols] = useState<{ label: string; value: string }[]>(
    [],
  );

  const initLoad = async () => {
    dispatch(setIsLoading(true));
    const [_resSymbols, _resNetworks] = await Promise.all([
      getCryptoSymbols(),
      getNetworks(),
    ]);

    const _symbols = _resSymbols?.map((item: any) => ({
      label: item?.symbol || "",
      value: item?.id || "",
    }));

    const _networks =
      _resNetworks?.map((item: any) => ({
        label: item?.network || "",
        value: item?.id || "",
      })) || [];
    setNetworks(_networks);
    setSymbols(_symbols);
    dispatch(setIsLoading(false));
  };

  const getList = useCallback(
    async (page: number, page_size: number) => {
      const response = await getCryptoCurrencyList({
        page,
        page_size,
        networks: JSON.stringify(filters.networks),
        symbols: JSON.stringify(filters.symbols),
        type: filters.type,
      });

      const currencies =
        response?.currencies?.map((item: any) => ({
          id: item?.id || "",
          networkId: item?.network_id || "",
          network: item?.network || "",
          symbolId: item?.symbol_id || "",
          symbol: item?.symbol || "",
          contractAddress: item?.contract_address || "",
          withdrawFee: Number(item?.withdraw_fee || 0),
          decimals: Number(item?.decimals || 0),
          type: item?.type,
          createdAt: moment(item?.created_at || "").format(
            "yyyy-MM-DD HH:mm:ss",
          ),
        })) || [];
      return {
        data: currencies,
        page: response.page,
        pageSize: response.page_size,
        totalCount: response.total_count,
        total_page: response.total_page,
      };
    },
    [filters, changed],
  );

  useEffect(() => {
    initLoad();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Crypto Currency" />
      <div className=" grid grid-cols-12 gap-4  md:gap-6 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-12">
          <div className="rounded-lg border border-stroke bg-white px-5 pb-8 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
            <div className="flex justify-between">
              <h4 className="mb-2 text-xl font-semibold capitalize text-black dark:text-white">
                Crypto Currency List
              </h4>
              <button
                className={`flex w-full max-w-40 items-center justify-center gap-2 rounded-lg border border-primary p-2 text-center text-primary shadow-sm hover:bg-primary hover:text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                onClick={() => setIsSwap(true)}
              >
                <SvgColor
                  src="/assets/icons/edit.svg"
                  style={{ width: 20, height: 20 }}
                />{" "}
                Swap Fee Edit
              </button>
            </div>
            <Filters
              data={[
                {
                  type: "select",
                  options: [
                    {
                      label: "All",
                      value: CurrencyType.All,
                    },
                    {
                      label: "COIN",
                      value: CurrencyType.COIN,
                    },
                    {
                      label: "TOKEN",
                      value: CurrencyType.TOKEN,
                    },
                  ],
                  value: filters.type,
                  placeholder: "Identifier",
                  setValue: (value) => setFilters({ ...filters, type: value }),
                },
                {
                  type: "multiselect",
                  options: networks,
                  value: filters.networks,
                  placeholder: "Network",
                  setValue: (value) =>
                    setFilters({ ...filters, networks: value }),
                },
                {
                  type: "multiselect",
                  options: symbols,
                  value: filters.symbols,
                  placeholder: "Symbol",
                  setValue: (value) =>
                    setFilters({ ...filters, symbols: value }),
                },
              ]}
            />

            <div className="flow-root">
              <CustomTable
                onRow={(row) => {
                  setSelectedCurrency(row);
                  setIsCurrency(true);
                }}
                getData={getList}
                columns={CURRENCY_LIST_COLUMN}
              />
            </div>
          </div>
        </div>
      </div>

      <CurrencyDetailModal
        show={isCurrency}
        onClose={() => setIsCurrency(false)}
        setShow={setIsCurrency}
        currency={selectedCurrency}
        onChanged={setChanged}
      />

      <SwapFeeEditDeailModal
        show={isSwap}
        onClose={() => setIsSwap(false)}
        setShow={setIsSwap}
      />
    </DefaultLayout>
  );
};

const CryptoCurrencyListAuth = withAuth(CryptoCurrencyList);
export default CryptoCurrencyListAuth;
