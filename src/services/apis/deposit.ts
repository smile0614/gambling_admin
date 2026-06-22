import {
  API_DEPOSIT_COUNT,
  API_DEPOSIT_HIGHEST,
  API_DEPOSIT_TOP,
  API_DEPOSIT_TOTAL,
  API_DEPOSIT_TRANSACTIONS,
  API_USER_TRANSACTION_DEPOSIT,
} from "@/config";
import Api from "../api";
import { DepositStatus, SortType } from "@/types";

export const getTotalDeposit = async (data: {
  start_time: number;
  end_time: number;
  interval: number;
}) => {
  return Api.get(API_DEPOSIT_TOTAL, data);
};

export const getHighestDeposit = async () => {
  return Api.get(API_DEPOSIT_HIGHEST);
};

export const getTopDeposit = async (data: {
  start_time: number;
  end_time: number;
  count: number;
}) => {
  return Api.get(API_DEPOSIT_TOP, data);
};

export const getDepositTransactions = async (data: {
  page: number;
  page_size: number;
  user?: string;
  from_address?: string;
  to_address?: string;
  cryptocurrencies: string;
  status: DepositStatus;
  start_time: number;
  end_time: number;
  sort_column: string;
  sort_order: SortType;
}) => {
  return Api.get(API_DEPOSIT_TRANSACTIONS, data);
};

export const getDepositCount = async () => {
  return Api.get(API_DEPOSIT_COUNT);
};

export const getDepositTransactionsByUser = async (data: {
  page: number;
  page_size: number;
  user_id: string;
  sort_column: string;
  sort_order: SortType
}) => {
  return Api.get(API_USER_TRANSACTION_DEPOSIT, data);
};
