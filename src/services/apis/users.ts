import {
  API_COUNTRY,
  API_SOLO_LIST,
  API_USER_ACTIVE,
  API_USER_BY_COUNTRY,
  API_USER_DATA,
  API_USER_LIST,
  API_USER_LIVE_LIST,
  API_USER_STATISTICS,
  API_USER_TOTAL_COUNT,
  API_USER_TRANSACTION_TIP,
  API_USER_UPDATE_KYC,
  API_USER_WALLET,
  API_USER_WITHDRAW_RESTRICT,
} from "@/config";
import Api from "../api";
import { SortType } from "@/types";

export const getUserCount = async (data: {
  start_time: number;
  end_time: number;
  interval: number;
}) => {
  return Api.get(API_USER_TOTAL_COUNT, data);
};

export const getPlayerList = async (data: {
  page: number;
  page_size: number;
  search: string;
  sort_column?: string;
  sort_order?: SortType;
}) => {
  return Api.get(API_USER_LIST, data);
};

export const getSolorUser = async (data: {
  page: number;
  page_size: number;
  search: string;
  sort_column?: string;
  sort_order?: SortType;
}) => {
  return Api.get(API_SOLO_LIST, data);
};

export const getCountryListWithUsers = async (data: {
  start_time: number;
  end_time: number;
}) => {
  return Api.get(API_COUNTRY, data);
};

export const getLiveUserList = async (data: {
  page: number;
  page_size: number;
  search: string;
  sort_column?: string;
  sort_order?: SortType;
}) => {
  return Api.get(API_USER_LIVE_LIST, data);
};

export const getUserDataById = async (data: { id: string }) => {
  return Api.get(API_USER_DATA, {}, data);
};

export const getUserStatisticsData = async (data: { user_id: string }) => {
  return Api.get(API_USER_STATISTICS, data);
};

export const getUserWallets = async (data: { user_id: string }) => {
  return Api.get(API_USER_WALLET, data);
};

export const updateKyc = async (data: { user_id: string; type: number }) => {
  return Api.post(API_USER_UPDATE_KYC, data);
};

export const getUserByCountry = async (data: {
  page: number;
  page_size: number;
  code: string;
  search?: string;
  sort_column?: string;
  sort_order?: SortType;
}) => {
  return Api.get(API_USER_BY_COUNTRY, data);
};

export const getUserTransactionTips = async (data: {
  page: number;
  page_size: number;
  user_id: string;
  sort_column: string;
  sort_order: SortType
}) => {
  return Api.get(API_USER_TRANSACTION_TIP, data);
};

export const getUserActive = async (data: {
  start_time: number;
  end_time: number;
}) => {
  return Api.get(API_USER_ACTIVE, data);
};

export const updateWithdrawRestrictByUserId = async (
  data: { status: boolean },
  params: { id: string },
) => {
  return Api.put(API_USER_WITHDRAW_RESTRICT, data, params);
};
