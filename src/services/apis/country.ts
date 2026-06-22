import { API_COUNTRY_REVENUE_LIST } from "@/config";
import Api from "../api";
import { SortType } from "@/types";

export const getCountryRevenueList = async (data: {
  page: number;
  page_size: number;
  sort_column: string;
  sort_order: SortType;
}) => {
  return Api.get(API_COUNTRY_REVENUE_LIST, data);
};
