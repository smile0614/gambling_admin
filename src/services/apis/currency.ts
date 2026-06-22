import { CurrencyType } from "@/types";
import Api from "../api";
import {
  API_CRYPTO_FULL_LIST,
  API_CRYPTO_LIST,
  API_CRYPTO_NETWORKS,
  API_CRYPTO_SYMBOLS,
} from "@/config";

export const getNetworks = async () => {
  return Api.get(API_CRYPTO_NETWORKS);
};

export const getCryptoCurrencyList = async (data: {
  page: number;
  page_size: number;
  networks: string;
  symbols: string;
  type: CurrencyType;
}) => {
  return Api.get(API_CRYPTO_LIST, data);
};

export const getCryptoSymbols = async () => {
  return Api.get(API_CRYPTO_SYMBOLS);
};

export const getCryptoCurrencyFullList = async () => {
  return Api.get(API_CRYPTO_FULL_LIST);
};
