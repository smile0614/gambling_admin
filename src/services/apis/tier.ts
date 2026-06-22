import {
  API_TIER_CONFIRM_PAYOUT,
  API_TIER_CREATE,
  API_TIER_CREATE_PAYOUT_TRANSACTIONS,
  API_TIER_DATA,
  API_TIER_GENERATE_CODE,
  API_TIER_LIST,
  API_TIER_PAYOUT_HISTORY,
  API_TIER_PAYOUT_LIST,
  API_TIER_SMALL_TIER1,
  API_TIER_SMALL_TIER2,
  API_TIER_TIER1_LIST,
  API_TIER_TIER2_LIST,
  API_TIER_TIER3_LIST,
  API_TIER_TOTAL_MONTHLY_PAYOUT,
  API_TIER_TREE_VIEW,
  API_TIER_UPDATE,
  API_TIER_USERS_BY_TIER,
} from "@/config";
import Api from "../api";

export const createTier = async (data: {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: number;
  parent_tier: string | null;
  // code: string;
  wager_settlement_percent: number;
  losing_settlement_percent: number;
}) => {
  return Api.post(API_TIER_CREATE, data);
};

export const getUserByTier = async (data: {
  tier_id: string;
  page: number;
  page_size: number;
  start_time: number;
  end_time: number;
}) => {
  return Api.get(API_TIER_USERS_BY_TIER, data);
};

export const getTierTreeDataById = async (data: { id: string }) => {
  return Api.get(API_TIER_TREE_VIEW, data);
};

export const getTierDataById = async (data: { id: string }) => {
  return Api.get(API_TIER_DATA, data);
};

export const createTierGenerateCode = async () => {
  return Api.get(API_TIER_GENERATE_CODE);
};

export const updateTier = async (data: {
  id: string;
  name: string;
  email: string;
  phone: string;
  wager_settlement_percent: number;
  losing_settlement_percent: number;
}) => {
  return Api.post(API_TIER_UPDATE, data);
};

export const getTreeList = async () => {
  return Api.get(API_TIER_LIST);
};

export const getTier1SmallList = async () => {
  return Api.get(API_TIER_SMALL_TIER1);
};

export const getTier2SmallList = async (data: { tier1_id: string }) => {
  return Api.get(API_TIER_SMALL_TIER2, data);
};

export const getTier1List = async (data: {
  page: number;
  page_size: number;
}) => {
  return Api.get(API_TIER_TIER1_LIST, data);
};

export const getTier2List = async (data: {
  page: number;
  page_size: number;
}) => {
  return Api.get(API_TIER_TIER2_LIST, data);
};

export const getTier3List = async (data: {
  page: number;
  page_size: number;
}) => {
  return Api.get(API_TIER_TIER3_LIST, data);
};

export const confirmPayout = async (data: {
  tier_id: string;
  year: number;
  month: number;
}) => {
  return Api.post(API_TIER_CONFIRM_PAYOUT, data);
};

export const getPayoutList = async (data: {
  year: number;
  page: number;
  page_size: number;
}) => {
  return Api.get(API_TIER_PAYOUT_LIST, data);
};

export const getPayoutHistory = async (data: {
  page: number;
  page_size: number;
}) => {
  return Api.get(API_TIER_PAYOUT_HISTORY, data);
};

export const getTotalMonthlyPayout = async (data: { months: number }) => {
  return Api.get(API_TIER_TOTAL_MONTHLY_PAYOUT, data);
};

export const createPayoutTransactions = async () => {
  return Api.post(API_TIER_CREATE_PAYOUT_TRANSACTIONS);
};
