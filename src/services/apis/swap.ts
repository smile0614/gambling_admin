import { API_SWAP_FEE, API_SWAP_TRANSACTIONS } from "@/config";
import Api from "../api";
import { SortType } from "@/types";

export const getSwapTransactions = async (data: {
  page: number;
  page_size: number;
  user?: string;
  from_symbols: string;
  to_symbols: string;
  start_time: number;
  end_time: number;
  sort_column: string;
  sort_order: SortType
}) => {
  return Api.get(API_SWAP_TRANSACTIONS, data);
};

export const getFee = async () => {
  return Api.get(API_SWAP_FEE);
};

export const updateFee = async (data: { fee: number }) => {
  return Api.put(API_SWAP_FEE, data);
};
