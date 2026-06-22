import {
  API_CRYPTO_CURRENCY_BY_ID,
  API_USER_TRANSACTION_WITHDRAW,
  API_WITHDRAW_COUNT,
  API_WITHDRAW_HIGHEST,
  API_WITHDRAW_PENDING_COUNT,
  API_WITHDRAW_TOP,
  API_WITHDRAW_TOTAL,
  API_WITHDRAW_TRANSACTION_APPROVE,
  API_WITHDRAW_TRANSACTION_REJECT,
  API_WITHDRAW_TRANSACTIONS,
} from "@/config";
import Api from "../api";
import { SortType, WithdrawStatus } from "@/types";

export const getTotalWithdraw = async (data: {
  start_time: number;
  end_time: number;
  interval: number;
}) => {
  return Api.get(API_WITHDRAW_TOTAL, data);
};

export const getHighestWithdraw = async () => {
  return Api.get(API_WITHDRAW_HIGHEST);
};

export const getTopWithdraw = async (data: {
  start_time: number;
  end_time: number;
  count: number;
}) => {
  return Api.get(API_WITHDRAW_TOP, data);
};

export const getWithdrawTransactions = async (data: {
  page: number;
  page_size: number;
  user?: string;
  from_address?: string;
  to_address?: string;
  cryptocurrencies: string;
  status: WithdrawStatus;
  start_time: number;
  end_time: number;
  sort_column: string;
  sort_order: SortType;
}) => {
  return Api.get(API_WITHDRAW_TRANSACTIONS, data);
};

export const getWithdrawPendingCounts = async () => {
  return Api.get(API_WITHDRAW_PENDING_COUNT);
};

export const getWithdrawCount = async () => {
  return Api.get(API_WITHDRAW_COUNT);
};

export const approveWithdraw = async (data: { transaction_id: string }) => {
  return Api.post(API_WITHDRAW_TRANSACTION_APPROVE, data);
};

export const rejectWithdraw = async (data: { transaction_id: string }) => {
  return Api.post(API_WITHDRAW_TRANSACTION_REJECT, data);
};

export const changeCurrency = async (
  data: {
    decimals: number;
    contract_address: string;
    withdraw_fee: number;
    type: number;
  },
  params: { id: string },
) => {
  return Api.put(API_CRYPTO_CURRENCY_BY_ID, data, params);
};

export const getWithdrawTransactionsByUser = async (data: {
  user_id: string;
  page: number;
  page_size: number;
  sort_column: string;
  sort_order: SortType
}) => {
  return Api.get(API_USER_TRANSACTION_WITHDRAW, data);
};
