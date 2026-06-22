import { useCallback, useEffect, useState } from "react";
import CustomPagination from "../pagination/CustomPagination";
import CustomInput from "../Input/CustomInput";
import { CustomCheckbox } from "../Checkbox/CustomCheckBox";
import {
  formatCompactNumber,
  transformId,
  transformWalletAddress,
} from "@/utils/format";
import { avatarUrl } from "@/config";
import Image from "next/image";
import { getStatusColor } from "@/utils/common";
import cn from "classnames";
import CustomPopup from "@/components/Popup/CustomPopup";
import { confirmPayout } from "@/services/apis/tier";
import { toast } from "react-toastify";

type PayoutTableProps = {
  columns: Array<{
    title: string;
    width?: string | number;
    key: string;
    type: string;
  }>;
  getData: Function;
  selectedYear: number;
  onRow?: (data: any) => void;
};

const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export default function PayoutTable({
  columns,
  getData,
  selectedYear,
  onRow = () => {},
}: PayoutTableProps) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [isConfirm, setIsConfirm] = useState(false);
  const [created, setCreated] = useState(0);

  const [data, setData] = useState<Array<{ [key: string]: string | number }>>(
    [],
  );

  const [selectedTier, setSelectedTier] = useState({
    tierId: "",
    year: 2024,
    month: 3,
  });

  const onConfirmPayout = async () => {
    if (!selectedTier.tierId) {
      toast.error("Please select Tier", { toastId: "selectTier" });
      return;
    }
    try {
      const resposne = await confirmPayout({
        tier_id: selectedTier.tierId,
        year: selectedTier.year,
        month: selectedTier.month,
      });
      if (resposne.status) {
        toast.success("You payout to tier", { toastId: "success" });
        setCreated(Date.now());
      } else {
        toast.success("There is some problem", { toastId: "error" });
      }
    } catch (error) {
    } finally {
      setIsConfirm(false);
    }
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data,
        page: currentPage,
        pageSize: currentLimit,
        totalCount,
        total_page,
      } = await getData(page, limit);

      const tableDatas =
        data?.map((item: any, index: number) => {
          const rowData: any = { ...item };
          for (let i = 0; i < columns.length; i++) {
            const key = columns[i].key;
            rowData[key] = item[key];
          }
          return rowData;
        }) || [];
      setData(tableDatas);
      if (currentPage) setPage(currentPage);
      if (totalCount) setTotalRows(totalCount);
      setLoading(false);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, getData, created]);

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };

  const renderValue = useCallback((key: any, type: string, item: any) => {
    const val = item[key];
    switch (type) {
      case "text":
        return String(val);
      case "id":
        return transformId(val);
      case "object":
        return (
          <>
            <div
              className="flex"
              onClick={() => {
                const pos = months.indexOf(key);
                const today = new Date();
                const currentMonth = today.getMonth();
                if (val.value !== 0 && !val.status && currentMonth > pos) {
                  setSelectedTier({
                    tierId: item.id,
                    year: selectedYear,
                    month: pos + 1,
                  });
                  setIsConfirm(true);
                }
              }}
            >
              <CustomCheckbox
                id={`${item.id}-${selectedYear}-${key}`}
                value={val.status}
                readOnly={true}
                // disabled={true}
              />
              <p
                className={cn({
                  "text-[limegreen]": val.value > 0 && !val.status,
                  "text-[orangered]": val.status,
                })}
              >
                {formatCompactNumber(val.value, {
                  currency: "USD",
                  style: "currency",
                  maximumFractionDigits: 4,
                  miniumFractionDigits: 2,
                })}
              </p>
            </div>
          </>
        );
      default:
        return String(val);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <div className="min-h-[300px] overflow-hidden border border-solid border-slate-200 shadow dark:border-strokedark sm:rounded-lg">
            <table className="divide-gray-300 min-w-full divide-y">
              <thead className="bg-slate-100 dark:bg-boxdark-2 dark:text-bodydark">
                <tr>
                  {columns.map((column, index) => (
                    <th
                      scope="col"
                      key={index}
                      className="text-gray-900 py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-boxdark dark:text-bodydark">
                {loading && (
                  <tr className="h-[200px]">
                    <td colSpan={columns.length}>
                      <div className="flex items-center justify-center">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading &&
                  data.map((item, index) => (
                    <tr
                      key={index}
                      className={cn({ "cursor-pointer": onRow })}
                      onClick={() => onRow && onRow(item)}
                    >
                      {columns.map((col, _k) => (
                        <td
                          key={_k}
                          className="text-gray-500 whitespace-nowrap border-t border-solid border-slate-200 py-3.5 pl-4 pr-3 text-sm dark:border-strokedark  sm:pl-6"
                        >
                          {renderValue(col.key, col.type, item)}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <CustomPagination
          totalResults={totalRows}
          resultsPerPage={limit}
          onPageChange={handlePageChange}
          onPerPageChange={(val) => {
            setPage(1);
            setLimit(val);
          }}
        />
      </div>

      <CustomPopup
        showModal={isConfirm}
        onClose={() => setIsConfirm(false)}
        setShowModal={setIsConfirm}
        classNames="max-w-sm"
        title="Confirm Payout"
      >
        <div className="my-[40px] flex items-center justify-center text-sm md:gap-x-10 ">
          <p className="text-[16px]  dark:text-white">
            Are you certain about confirming this payout?
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onConfirmPayout}
            className="m-auto inline-block w-full max-w-xs rounded-sm border border-indigo-600  p-2 text-center text-indigo-500 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Yes
          </button>
          <button
            onClick={() => {
              setIsConfirm(false);
            }}
            className="m-auto inline-block w-full max-w-xs rounded-sm border border-indigo-600 p-2 text-center text-indigo-500 shadow-sm hover:bg-indigo-500 hover:text-white focus-visible:outline focus-visible:outline-2  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            No
          </button>
        </div>
      </CustomPopup>
    </>
  );
}
