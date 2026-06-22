import { bonusType, SortType } from "@/types";
import Api from "../api";
import {
  API_BONUS_AIRDROP,
  API_BONUS_CASHBACKS,
  API_BONUS_CLAIMS,
  API_BONUS_DEPOSITS,
  API_BONUS_LEVELUP,
  API_BONUS_TOTAL,
  API_BONUS_WAGERCONTESTS,
  API_USER_TRANSACTION_BONUS,
} from "@/config";

export const getBonusTransaction = async (
  data: {
    page: number;
    page_size: number;
    user?: string;
    sort_column: string;
    sort_order: SortType;
  },
  type: bonusType,
) => {
  switch (type) {
    case "levelups":
      return Api.get(API_BONUS_LEVELUP, data);
    case "cashbacks":
      return Api.get(API_BONUS_CASHBACKS, data);
    case "claims":
      return Api.get(API_BONUS_CLAIMS, data);
    case "deposits":
      return Api.get(API_BONUS_DEPOSITS, data);
    case "wagercontests":
      return Api.get(API_BONUS_WAGERCONTESTS, data);
    case 'airDrop':
      return Api.get(API_BONUS_AIRDROP, data);
    default:
      break;
  }
};

export const getBonusTransactionByUser = async (data: {
  page: number;
  page_size: number;
  user_id: string;
  sort_column: string;
  sort_order: SortType
}) => {
  return Api.get(API_USER_TRANSACTION_BONUS, data);
};

export const getTotalBonus = async (data: {
  start_time: number;
  end_time: number;
  interval: number;
}) => {
  return Api.get(API_BONUS_TOTAL, data);
};
