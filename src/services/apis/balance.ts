import { API_BALANCE_LIST, API_BALANCE_MAIN, API_USER_BALANCE } from "@/config";
import Api from "../api";

export const getMainWalletBalance = async () => {
  return Api.get(API_BALANCE_MAIN);
};

export const getUserBalace = async (data: { user_id: string }) => {
  return Api.get(API_USER_BALANCE, data);
};
