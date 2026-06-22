export const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export const userSiteUrl = process.env.NEXT_PUBLIC_USER_URL;
export const avatarUrl = `${process.env.NEXT_PUBLIC_STORAGE_URL}avatar`;
export const notificationUrl = `${process.env.NEXT_PUBLIC_STORAGE_URL}notification`;
export const IdUrl = `${process.env.NEXT_PUBLIC_STORAGE_URL}ids`;

export const API_USER_LOGIN = "/auth/login";
export const API_USER_VALIDATE_TOKEN = "/auth/validate/:token";
export const API_USER_CHANGE_PASSWORD = "/auth/change-password";

export const API_TIER_CREATE = "/tier/create-tier";
export const API_TIER_UPDATE = "/tier/update-tier";
export const API_TIER_USERS_BY_TIER = "/tier/get-direct-users-by-tier";
export const API_TIER_DATA = "/tier/get-tier";
export const API_TIER_TREE_VIEW = "/tier/get-tier-for-treeview";
export const API_TIER_GENERATE_CODE = "/tier/generate-code";
export const API_TIER_LIST = "/tier/get-tree-list";
export const API_TIER_SMALL_TIER1 = "/tier/get-tier1-small-list";
export const API_TIER_SMALL_TIER2 = "/tier/get-tier2-small-list";
export const API_TIER_TIER1_LIST = "/tier/get-tier1-list";
export const API_TIER_TIER2_LIST = "/tier/get-tier2-list";
export const API_TIER_TIER3_LIST = "/tier/get-tier3-list";
export const API_TIER_PAYOUT_LIST = "/tier/payout-list";
export const API_TIER_CONFIRM_PAYOUT = "/tier/confirm-payout";
export const API_TIER_PAYOUT_HISTORY = "/tier/payout-history";
export const API_TIER_TOTAL_MONTHLY_PAYOUT = "/tier/total-monthly-payout";
export const API_TIER_CREATE_PAYOUT_TRANSACTIONS =
  "/tier/create-payout-transactions";

export const API_USER_LIST = "/user/list";
export const API_USER_DATA = "/user/list/:id";
export const API_USER_LIVE_LIST = "/user/live-list";
export const API_USER_BY_COUNTRY = "/user/country-user-list";
export const API_SOLO_LIST = "/user/solo-list";
export const API_USER_GENERATE_ERC_WALLET = "/user/generate_erc_wallet";
export const API_USER_GENERATE_TRX_WALLET = "/user/generate_trx_wallet";
export const API_USER_UPDATE_KYC = "/user/update-user-kyc";
export const API_USER_TOTAL_COUNT = "/user/total";
export const API_USER_TRANSACTION_DEPOSIT = "/user/transactions/deposit";
export const API_USER_TRANSACTION_WITHDRAW = "/user/transactions/withdraw";
export const API_USER_TRANSACTION_BONUS = "/user/transactions/bonus";
export const API_USER_TRANSACTION_GAME = "/user/transactions/game";
export const API_USER_TRANSACTION_TIP = '/user/transactions/tip';
export const API_USER_BALANCE = "/user/balance";
export const API_USER_WALLET = "/user/wallet";
export const API_USER_STATISTICS = "/user/statistics";
export const API_USER_ACTIVE = '/user/total-active-user';
export const API_USER_WITHDRAW_RESTRICT = '/user/restrict/:id';

export const API_CRYPTO_SYMBOLS = "/cryptocurrency/symbols";
export const API_CRYPTO_SYMBOL_BY_ID = "/cryptocurrency/symbol/:id";
export const API_CRYPTO_SYMBOL = "/cryptocurrency/symbol";
export const API_CRYPTO_NETWORKS = "/cryptocurrency/networks";
export const API_CRYPTO_NETWORK_BY_ID = "/cryptocurrency/network/:id";
export const API_CRYPTO_NETWORK = "/cryptocurrency/network";
export const API_CRYPTO_LIST = "/cryptocurrency/list";
export const API_CRYPTO_FULL_LIST = "/cryptocurrency/full-list";
export const API_CRYPTO_CURRENCY_BY_ID = "/cryptocurrency/currency/:id";
export const API_CRYPTO_CURRENCY = "/cryptocurrency/currency";

export const API_DEPOSIT_TRANSACTIONS = "/deposit/transactions";
export const API_DEPOSIT_COUNT = "/deposit/total-count";
export const API_DEPOSIT_TOTAL = "/deposit/total";
export const API_DEPOSIT_HIGHEST = "/deposit/highest-total";
export const API_DEPOSIT_TOP = "/deposit/top-players";

export const API_WITHDRAW_TRANSACTIONS = "/withdraw/transactions";
export const API_WITHDRAW_COUNT = "/withdraw/total-count";
export const API_WITHDRAW_PENDING_COUNT = "/withdraw/pending-total-count";
export const API_WITHDRAW_TRANSACTION_APPROVE = "/withdraw/transaction/approve";
export const API_WITHDRAW_TRANSACTION_REJECT = "/withdraw/transaction/reject";
export const API_WITHDRAW_TOTAL = "/withdraw/total";
export const API_WITHDRAW_HIGHEST = "/withdraw/highest-total";
export const API_WITHDRAW_TOP = "/withdraw/top-players";

export const API_WALLET_LIST = "/wallet/list";

export const API_BALANCE_LIST = "/balance/list";
export const API_BALANCE_MAIN = "/balance/main-wallet-balances";
export const API_BALANCE_TOTAL = "/balance/total";

export const API_GAME_PRODUERS = "/game/producers";
export const API_GAME_PRODUERS_ID = '/game/producers/:id';
export const API_GAME_LIST = "/game/list";
export const API_GAME_PROVIDER_REVENUE_LIST =
  "/game/game-provider-revenue-list";
export const API_GAME_REVENUE_LIST = "/game/game-revenue-list";
export const API_GAME_LIST_BY_ID = "/game/list/:id";
export const API_GAME_TRANSACTIONS = "/game/transactions";
export const API_GAME_TRANSACTIONS_INFO = "/game/transactions/info";
export const API_GAME_WAGER_TRANSACTIONS = "/game/wager-transactions";
export const API_GAME_TOTAL_PLAYERS = "/game/total-players";
export const API_GAME_TOTAL_LIVE_PLAYERS = "/game/total-live-players";
export const API_GAME_TOTAL_PROFIT = "/game/total-profit";
export const API_GAME_TOTAL_GGR = "/game/total-ggr";
export const API_GAME_TOTAL_LOSE = "/game/total-lose";
export const API_GAME_TOTAL_WAGER = "/game/total-wager";
export const API_GAME_TOP_WAGERS = "/game/top-wagers";
export const API_GAME_TOP_WINNERS = "/game/top-winners";
export const API_GAME_TOP_GAMES = "/game/top-games";
export const API_GAME_HIGHEST_BET = "/game/highest-wager";
export const API_GAME_HIGHEST_WIN = "/game/highest-win";
export const API_GAME_HIGHEST_PROFIT = "/game/highest-profit";
export const API_GAME_HIGHEST_LOSE = "/game/highest-lose";
export const API_GAME_STATISTICS = "/game/statistics";

export const API_SWAP_TRANSACTIONS = "/swap/transactions";
export const API_SWAP_FEE = "/swap/fee";

export const API_VIP_LEVELS = "/vip/levels";
export const API_VIP_MEDALS = "/vip/medals";

export const API_BONUS_TOTAL = "/bonus/total";
export const API_BONUS_LEVELUP = "/bonus/levelups";
export const API_BONUS_CASHBACKS = "/bonus/cashbacks";
export const API_BONUS_CLAIMS = "/bonus/claims";
export const API_BONUS_DEPOSITS = "/bonus/deposits";
export const API_BONUS_WAGERCONTESTS = "/bonus/wagercontests";
export const API_BONUS_AIRDROP = '/bonus/airdrops';

export const API_AFFILIATE_RULE = "/affiliate/rule";
export const API_AFFILIATE_REFERRAL_TRANSACTIONS =
  "/affiliate/referral/transactions";
export const API_AFFILIATE_COMMISSION_TRANSACTIONS =
  "/affiliate/commission/transactions";

export const API_COUNTRY = "/country/list";
export const API_COUNTRY_REVENUE_LIST = "/country/revenue-list";

export const API_MESSAGE_HISTORY = '/message/history';
export const API_NOTIFICATION_LIST = "/notification/latest";
export const API_NOTIFICATION_ADD = "/notification/add";
export const API_NOTIFICATION_DELETE = "/notification/delete";