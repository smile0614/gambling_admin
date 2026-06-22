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
import Link from "next/link";
import SelectDropdown from "../Select/selectDropdown";
import { COLUMNTYPE, SortType } from "@/types";
import SvgColor from "@/assets/svgs/SvgColor";

type CustomTableProps = {
  header?: string;
  columns: COLUMNTYPE;
  getData: Function;
  isPagniation?: boolean;
  tableClassName?: string;
  theaderClassName?: string;
  tbodyClassName?: string;
  thClassName?: string;
  tdClassName?: string;
  onRow?: (data: any) => void;
  defaultSort?: { column: string; order: SortType };
};

export default function CustomTable({
  header = "",
  columns,
  getData,
  isPagniation = true,
  tableClassName = "",
  theaderClassName = "",
  tbodyClassName = "",
  thClassName = "",
  tdClassName = "",
  onRow = () => {},
  defaultSort = { column: "registered_at", order: SortType.ASC },
}: CustomTableProps) {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [redeemedCnt, setRedeemedCnt] = useState<number>(0);
  const [sortData, setSortData] = useState<{ column: string; order: SortType }>(
    { column: defaultSort.column, order: defaultSort.order },
  );

  const [data, setData] = useState<Array<{ [key: string]: string | number }>>(
    [],
  );

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const {
        data,
        page: currentPage,
        pageSize: currentLimit,
        totalCount,
        total_page,
        total_claimed_count, // for only redeem
      } = await getData(page, limit, {
        column: sortData.column,
        order: sortData.order,
      });

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
      setRedeemedCnt(total_claimed_count || 0);
      if (currentPage) {
        setPage(currentPage);
      } else {
        setPage(0);
      }
      if (totalCount) {
        setTotalRows(totalCount);
      } else {
        setTotalRows(0);
      }
      setLoading(false);
    } catch (error) {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, getData, sortData]);

  const handlePageChange = (currentPage: number) => {
    setPage(currentPage);
  };

  const renderValue = useCallback((val: any, type: string) => {
    switch (type) {
      case "text":
        return String(val);
      case "amount":
      case "decimal":
        return (
          <p className={cn({ "text-[orangered]": val < 0 })}>
            {formatCompactNumber(val, {
              maximumFractionDigits: 4,
              miniumFractionDigits: 2,
            })}
          </p>
        );
      case "currency":
        return (
          <p
            className={cn({
              "text-[orangered]": val < 0,
              "text-[limegreen]": val > 0,
            })}
          >
            {formatCompactNumber(val, {
              maximumFractionDigits: 4,
              miniumFractionDigits: 2,
              currency: "USD",
              style: "currency",
            })}
          </p>
        );
      case "address":
        return transformWalletAddress(val);
      case "hash":
        return transformWalletAddress(val);
      case "id":
        return transformId(val);
      case "boolean":
        return <CustomCheckbox checked={val} name="status" />;
      case "status":
        return <p style={{ color: getStatusColor(val) }}>{val}</p>;
      case "avatar":
        return (
          <>
            {" "}
            {val && (
              <Image
                width={30}
                height={40}
                src={`${avatarUrl}/${val}`}
                alt=""
                style={{ width: 40, height: 40 }}
              />
            )}
          </>
        );
      case "image":
        return (
          <Image
            height={50}
            width={50}
            src={val}
            alt=""
            className="max-h-[40px] rounded-[5px] !object-contain"
          />
        );
      case "token":
        return (
          <Image
            alt=""
            width={30}
            height={30}
            src={`/images/fiats/${String(val).toUpperCase()}.png`}
            onError={(e) => {
              return `/images/fiats/USDT.png`;
            }}
          />
        );
      case "dom":
        return val;
      case 'capitalize':
        return <span className="capitalize">{val}</span>
      default:
        return String(val);
    }
    // return (
    //   <>
    //     {typeof val === "boolean" && <CustomCheckbox checked={val} />}
    //     {typeof val === "number" &&
    //       formatCompactNumber(val, { maximumFractionDigits: 7 })}
    //     {typeof val !== "boolean" && typeof val !== 'number' && val}
    //   </>
    // );
  }, []);

  // useEffect(() => {
  //   setSortData({ column: defaultSort.column, order: defaultSort.order });
  // }, [defaultSort]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {header && (
        <div className="mb-4 flex justify-between">
          <h4 className="text-xl font-semibold capitalize text-black dark:text-white">
            {header}
          </h4>
          <div className="flex gap-4">
            <h4 className="text-xl font-semibold capitalize text-black dark:text-white">
              {`Total Redeem: ${totalRows}`}
            </h4>
            <h4 className="text-xl font-semibold capitalize text-black dark:text-white">
              {`Total Claim: ${redeemedCnt}`}
            </h4>
          </div>
        </div>
      )}

      <div className="overflow-x-auto border border-solid border-slate-200 shadow dark:border-strokedark sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
          <div className="min-h-[300px] overflow-hidden sm:rounded-lg">
            <table
              className={cn(
                "divide-gray-300 w-full min-w-full divide-y",
                tableClassName,
              )}
            >
              <thead
                className={cn(
                  "bg-slate-100 dark:bg-boxdark-2 dark:text-bodydark ",
                  theaderClassName,
                )}
              >
                <tr>
                  {columns.map((column, index) => (
                    <th
                      scope="col"
                      key={index}
                      className={cn(
                        "text-gray-900 cursor-pointer p-2 text-left text-sm font-semibold",
                        thClassName,
                        { "pl-6": index === 0, "pl-2": index !== 0 },
                      )}
                      style={column.width ? { width: column.width } : {}}
                      onClick={() => {
                        if (!column.sort) return;
                        const _sortData = { ...sortData };
                        const _column = _sortData.column;

                        if (_column === column.key) {
                          setSortData({
                            ..._sortData,
                            order:
                              _sortData.order === SortType.ASC
                                ? SortType.DESC
                                : SortType.ASC,
                          });
                        } else {
                          setSortData({
                            column: column.key,
                            order: SortType.DESC,
                          });
                        }
                      }}
                    >
                      <div className="relative flex items-center">
                        {column.title}
                        {column.sort && (
                          <div className="flex cursor-pointer items-center justify-center">
                            <SvgColor
                              src="/assets/icons/arrowBold.svg"
                              className={cn({
                                "rotate-180":
                                  column.key === sortData.column &&
                                  sortData.order === SortType.ASC,
                              })}
                              style={{ width: 20, height: 20 }}
                            />
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody
                className={cn(
                  "bg-white dark:bg-boxdark dark:text-bodydark",
                  tbodyClassName,
                )}
              >
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
                    <tr key={index} className={cn({ "cursor-pointer": onRow })}>
                      {columns.map((col, _k) => (
                        <td
                          key={_k}
                          className={cn(
                            "text-gray-500 truncate whitespace-nowrap border-t border-solid border-slate-200 p-2 text-sm dark:border-strokedark",
                            tdClassName,
                            { "pl-6": _k === 0, "pl-2": _k !== 0 },
                          )}
                          style={col.width ? { width: col.width } : {}}
                          onClick={() => {
                            if (col.type !== "dom") {
                              onRow(item);
                            }
                          }}
                        >
                          <div className="flex items-center truncate">
                            {renderValue(item[col.key], col.type)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isPagniation && (
        <div className="flex justify-end">
          <CustomPagination
            totalResults={totalRows}
            resultsPerPage={limit}
            onPageChange={handlePageChange}
            onPerPageChange={(val) => {
              setLimit(val);
              setPage(1);
            }}
          />
          <div className="flex py-3"></div>
        </div>
      )}
    </>
  );
}
