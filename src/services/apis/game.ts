import {
  API_GAME_HIGHEST_BET,
  API_GAME_HIGHEST_LOSE,
  API_GAME_HIGHEST_PROFIT,
  API_GAME_HIGHEST_WIN,
  API_GAME_LIST,
  API_GAME_LIST_BY_ID,
  API_GAME_PRODUERS,
  API_GAME_PRODUERS_ID,
  API_GAME_PROVIDER_REVENUE_LIST,
  API_GAME_REVENUE_LIST,
  API_GAME_STATISTICS,
  API_GAME_TOP_GAMES,
  API_GAME_TOP_WAGERS,
  API_GAME_TOP_WINNERS,
  API_GAME_TOTAL_GGR,
  API_GAME_TOTAL_LOSE,
  API_GAME_TOTAL_PROFIT,
  API_GAME_TOTAL_WAGER,
  API_GAME_TRANSACTIONS,
  API_GAME_TRANSACTIONS_INFO,
  API_GAME_WAGER_TRANSACTIONS,
  API_USER_TRANSACTION_GAME,
} from "@/config";
import Api from "../api";
import { GameAction, SortType } from "@/types";

export const getTotalWager = async (data: {
  start_time: number;
  end_time: number;
  interval: number;
}) => {
  return Api.get(API_GAME_TOTAL_WAGER, data);
};

export const getTotalProfit = async (data: {
  start_time: number;
  end_time: number;
  interval: number;
}) => {
  return Api.get(API_GAME_TOTAL_PROFIT, data);
};

export const getTotalGGR = async (data: {
  start_time: number;
  end_time: number;
  interval: number;
}) => {
  return Api.get(API_GAME_TOTAL_GGR, data);
};

export const getTotalLose = async (data: {
  start_time: number;
  end_time: number;
  interval: number;
}) => {
  return Api.get(API_GAME_TOTAL_LOSE, data);
};

export const getHighestBet = async () => {
  return Api.get(API_GAME_HIGHEST_BET);
};

export const getHighestWin = async () => {
  return Api.get(API_GAME_HIGHEST_WIN);
};

export const getHighestProfit = async () => {
  return Api.get(API_GAME_HIGHEST_PROFIT);
};

export const getHighestLose = async () => {
  return Api.get(API_GAME_HIGHEST_LOSE);
};

export const getTopWagers = async (data: {
  start_time: number;
  end_time: number;
  count: number;
}) => {
  return Api.get(API_GAME_TOP_WAGERS, data);
};

export const getTopWinners = async (data: {
  start_time: number;
  end_time: number;
  count: number;
}) => {
  return Api.get(API_GAME_TOP_WINNERS, data);
};

export const getTopGames = async (data: {
  start_time: number;
  end_time: number;
  count: number;
}) => {
  return Api.get(API_GAME_TOP_GAMES, data);
};

export const getGameTransactions = async (data: {
  page: number;
  page_size: number;
  user?: string;
  game?: string;
  action: GameAction;
  currencies: string;
  start_time: number;
  end_time: number;
}) => {
  return Api.get(API_GAME_TRANSACTIONS, data);
};

export const getGameList = async (data: {
  page: number;
  page_size: number;
  title?: string;
  identifier?: string;
  producers: string;
}) => {
  return Api.get(API_GAME_LIST, data);
};

export const getGameRevenueList = async (data: {
  page: number;
  page_size: number;
  sort_column: string;
  sort_order: SortType;
}) => {
  return Api.get(API_GAME_REVENUE_LIST, data);
};

export const getGameProviderRevenueList = async (data: {
  page: number;
  page_size: number;
  sort_column: string;
  sort_order: SortType;
}) => {
  return Api.get(API_GAME_PROVIDER_REVENUE_LIST, data);
};

export const getProviders = async (data: { name: string }) => {
  return Api.get(API_GAME_PRODUERS, data);
};

export const getWagerTransactions = async (data: {
  page: number;
  page_size: number;
  user?: string;
  game?: string;
  currencies: string;
  start_time: number;
  end_time: number;
  sort_column: string;
  sort_order: SortType
}) => {
  return Api.get(API_GAME_WAGER_TRANSACTIONS, data);
};

export const getTransactionInfo = async (data: {
  start_time: number;
  end_time: number;
}) => {
  return Api.get(API_GAME_TRANSACTIONS_INFO, data);
};

export const getGameTransactionByUser = async (data: {
  page: number;
  page_size: number;
  user_id: string;
  sort_order: SortType,
  sort_column: string
}) => {
  return Api.get(API_USER_TRANSACTION_GAME, data);
};

export const getGameById = async (data: { id: string }) => {
  return Api.get(API_GAME_LIST_BY_ID, {}, data);
};

export const getGameStatistics = async (data: { game_id: string }) => {
  return Api.get(API_GAME_STATISTICS, data);
};

export const updateProvider = async (data: { name: string, identifier: string, priority: number, is_visible: boolean }, params: { id: string, }) => {
  return Api.put(API_GAME_PRODUERS_ID, data, params);
}

export const insertProvider = async (data: { name: string, identifier: string, priority: number, is_visible: boolean }) => {
  return Api.post(API_GAME_PRODUERS, data)
}