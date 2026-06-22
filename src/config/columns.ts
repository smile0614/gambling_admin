import { SortType } from "@/types";

export const COUNTRY_COLUMN = [
  { title: "Country", key: "countryFullName", type: "dom" },
  { title: "Users", key: "value", type: "integer" },
  { title: "Bet Amount", key: "betAmount", type: "currency" },
  { title: "Total Earning", key: "profitAmount", type: "currency" },
];

export const TOP_DEPOSIT_COLUMN = [
  // { title: 'User Id', key: 'userId' },
  { title: "Name", key: "name", type: "dom" },
  { title: "Amount", key: "amount", type: "currency" },
];

export const TOP_WITHDRAW_COLUMN = [
  // { title: 'User Id', key: 'userId' },
  { title: "Name", key: "name", type: "dom" },
  { title: "Amount", key: "amount", type: "currency" },
];

export const TOP_WAGER_COLUMN = [
  // { title: 'User Id', key: 'userId' },
  { title: "Name", key: "name", type: "dom" },
  { title: "Amount", key: "amount", type: "currency" },
];

export const TOP_GAME_COLUMN = [
  // { title: 'Id', key: 'id' },
  { title: "Name", key: "name", type: "dom" },
  // { title: "Identifier", key: "identifier", type: "text" },
  { title: "Bets", key: "bets", type: "currency" },
];

export const TOP_WINNER_COLUMN = [
  // { title: 'User Id', key: 'userId' },
  { title: "Name", key: "name", type: "dom" },
  { title: "Amount", key: "amount", type: "currency" },
];

export const TIER_LIST_COLUMN = [
  { title: "Name", key: "name", type: "text" },
  { title: "Wager Settlement (%)", key: "wager_settlement", type: "decimal" },
  { title: "Losing Settlement (%)", key: "losing_settlement", type: "decimal" },
  { title: "Wager Commission ($)", key: "wager_commission", type: "decimal" },
  { title: "Losing Commission ($)", key: "losing_commission", type: "decimal" },
  { title: "Total Wager", key: "total_wager", type: "currency" },
  { title: "Total Win", key: "total_win", type: "currency" },
  // { title: 'Total Lose', key: 'total_lose', type: 'decimal' },
  { title: "Total Bonus Payout", key: "total_bonus_payout", type: "currency" },
  { title: "Total Profit", key: "total_profit", type: "currency" },
  { title: "Total Deposit", key: "total_deposit", type: "currency" },
  { title: "Total Withdraw", key: "total_withdraw", type: "currency" },
  { title: "Date", key: "date", type: "text" },
  { title: "Action", key: "edit", type: "dom" },
];

export const TIER2_LIST_COLUMN = [
  { title: "Name", key: "name", type: "text" },
  { title: "Parent", key: "parent_tier1", type: "text" },
  { title: "Wager Settlement (%)", key: "wager_settlement", type: "decimal" },
  { title: "Losing Settlement (%)", key: "losing_settlement", type: "decimal" },
  { title: "Wager Commission ($)", key: "wager_commission", type: "decimal" },
  { title: "Losing Commission ($)", key: "losing_commission", type: "decimal" },
  { title: "Total Wager", key: "total_wager", type: "currency" },
  { title: "Total Win", key: "total_win", type: "currency" },
  // { title: 'Total Lose', key: 'total_lose', type: 'currency' },
  { title: "Total Bonus Payout", key: "total_bonus_payout", type: "currency" },
  { title: "Total Profit", key: "total_profit", type: "currency" },
  { title: "Total Deposit", key: "total_deposit", type: "currency" },
  { title: "Total Withdraw", key: "total_withdraw", type: "currency" },
  { title: "Date", key: "date", type: "text" },
  { title: "Action", key: "edit", type: "dom" },
];

export const TIER3_LIST_COLUMN = [
  { title: "Name", key: "name", type: "text" },
  { title: "Parent Tier1", key: "parent_tier1", type: "text" },
  { title: "Parent Tier2", key: "parent_tier2", type: "text" },
  { title: "Wager Settlement (%)", key: "wager_settlement", type: "decimal" },
  { title: "Losing Settlement (%)", key: "losing_settlement", type: "decimal" },
  { title: "Wager Commission ($)", key: "wager_commission", type: "decimal" },
  { title: "Losing Commission ($)", key: "losing_commission", type: "decimal" },
  { title: "Total Wager", key: "total_wager", type: "currency" },
  { title: "Total Win", key: "total_win", type: "currency" },
  // { title: 'Total Lose', key: 'total_lose', type: 'currency' },
  { title: "Total Bonus Payout", key: "total_bonus_payout", type: "currency" },
  { title: "Total Profit", key: "total_profit", type: "currency" },
  { title: "Total Deposit", key: "total_deposit", type: "currency" },
  { title: "Total Withdraw", key: "total_withdraw", type: "currency" },
  { title: "Date", key: "date", type: "text" },
  { title: "Action", key: "edit", type: "dom" },
  // { title: 'Action', key: 'action' }
];

export const DEPOSIT_COLUMN = [
  { title: "User Name", key: "userName", type: "dom" },
  { title: "User Type", key: "userType", type: "text" },
  { title: "Order Id", key: "id", type: "id" },
  { title: "Hash", key: "hash", type: "dom" },
  { title: "Time", key: "created_at", type: "text", sort: true },
  { title: "Amount", key: "amount", type: "decimal", sort: true },
  { title: "Amount-USD", key: "amount_usd", type: "currency", sort: true },
  { title: "Token", key: "symbol", type: "token" },
  { title: "Network", key: "network", type: "text" },
  { title: "From", key: "from_address", type: "address" },
  { title: "To", key: "to_address", type: "address" },

  { title: "Status", key: "status", type: "status", sort: true },
  // { title: "Created At", key: 'created_at', type: 'text', sort: true }
];

export const Tier_DEPOSIT_COLUMN = [
  { title: "User Name", key: "userName", type: "dom" },
  // { title: "User Type", key: "userType", type: "text" },
  { title: "Order Id", key: "id", type: "id" },
  { title: "Hash", key: "hash", type: "dom" },
  { title: "Time", key: "created_at", type: "text", sort: true },
  { title: "Amount", key: "amount", type: "decimal", sort: true },
  { title: "Amount-USD", key: "amount_usd", type: "currency", sort: true },
  { title: "Token", key: "symbol", type: "token" },
  { title: "Network", key: "network", type: "text" },
  { title: "From", key: "from_address", type: "address" },
  { title: "To", key: "to_address", type: "address" },

  { title: "Status", key: "status", type: "status", sort: true },
  // { title: "Created At", key: 'created_at', type: 'text', sort: true }
];

export const DEPOSIT_USER_COLUMN = [
  { title: "Order Id", key: "id", type: "id" },
  { title: "Hash", key: "hash", type: "dom" },
  { title: "Time", key: "created_at", type: "text", sort: true },
  { title: "Amount", key: "amount", type: "decimal", sort: true },
  { title: "Amount-USD", key: "amount_usd", type: "currency", sort: true },
  { title: "Token", key: "symbol", type: "token", sort: true },
  { title: "Network", key: "network", type: "text", sort: true },
  { title: "From", key: "from_address", type: "address", sort: true },
  { title: "To", key: "to_address", type: "address", sort: true },

  { title: "Status", key: "status", type: "status", sort: true },
];

export const SWAP_COLUMN = [
  { title: "Order Id", key: "id", type: "id" },
  { title: "User Id", key: "userId", type: "id" },
  { title: "User Name", key: "userName", type: "dom" },
  { title: "User Type", key: "userType", type: "text" },
  { title: "From Amount", key: "from_amount", type: "decimal", sort: true },
  {
    title: "From Amount USD",
    key: "from_amount_usd",
    type: "currency",
    sort: true,
  },
  { title: "From Token", key: "from_symbol", type: "token", sort: true },
  { title: "To Amount", key: "to_amount", type: "decimal", sort: true },
  {
    title: "To Amount USD",
    key: "to_amount_usd",
    type: "currency",
    sort: true,
  },
  { title: "To Token", key: "to_symbol", type: "token", sort: true },
  { title: "Time", key: "created_at", type: "text", sort: true },
];

export const WAGER_COLUMN = [
  { title: "Order Id", key: "id", type: "id" },
  { title: "User Id", key: "userId", type: "id" },
  { title: "User Name", key: "userName", type: "dom" },
  { title: "User Type", key: "userType", type: "text" },
  { title: "Game", key: "game_title", type: "dom", sort: true },
  // { title: "Game Id", key: "gameId", type: "id" },
  { title: "Currency", key: "currency", type: "token" },
  { title: "Amount", key: "amount", type: "decimal", sort: true },
  { title: "Amount USD", key: "amount_usd", type: "currency", sort: true },
  { title: "Profit", key: "profit_amount", type: "decimal" },
  { title: "Profit USD", key: "profit_amount_usd", type: "currency" },
  { title: "Time", key: "created_at", type: "text", sort: true },
  { title: "Status", key: "status", type: "status", sort: true },
];

export const USER_DETAIL_WAGER_COLUMN = [
  { title: "Order Id", key: "id", type: "id" },
  { title: "Game", key: "game_title", type: "text", sort: true },
  { title: "Game Id", key: "gameId", type: "id" },
  { title: "Currency", key: "currency", type: "token" },
  { title: "Amount", key: "amount", type: "decimal", sort: true },
  { title: "Amount USD", key: "amount_usd", type: "currency", sort: true },
  { title: "Profit", key: "profit_amount", type: "decimal", sort: true },
  {
    title: "Profit USD",
    key: "profit_amount_usd",
    type: "currency",
    sort: true,
  },
  { title: "Time", key: "created_at", type: "text", sort: true },
  { title: "Status", key: "status", type: "status", sort: true },
];

export const BONUS_COLUMN = [
  { title: "Order Id", key: "id", type: "id" },
  { title: "User Id", key: "userId", type: "id" },
  { title: "User Name", key: "userName", type: "dom" },
  { title: "User Type", key: "userType", type: "text" },
  { title: "Amount", key: "amount", type: "decimal", sort: true },
  { title: "Amount USD", key: "amount_usd", type: "currency", sort: true },
  { title: "Claim Status", key: "status", type: "boolean" },
  {
    title: "Wallet Balance",
    key: "wallet_balance",
    type: "decimal",
    sort: true,
  },
  {
    title: "Wallet Balance USD",
    key: "wallet_balance_usd",
    type: "currency",
    sort: true,
  },
  // { title: "Claimed At", key: "claimedAt", type: "text" },
  { title: "Created At", key: "created_at", type: "text", sort: true },
];

export const DIRECT_USER_COLUMN = [
  { title: "Name", key: "name", type: "dom" },
  // { title: "User Id", key: "id", type: "id" },
  { title: "Vip", key: "vipLevel", type: "text" },
  { title: "Total Deposit", key: "depositAmountUsd", type: "currency" },
  { title: "Total Withdraw", key: "withdrawAmountUsd", type: "currency" },
  { title: "Total Wager", key: "wagerAmountUsd", type: "currency" },
  { title: "Total Win", key: "winAmountUsd", type: "currency" },
  // { title: "Total Lose", key: "loseAmountUsd", type: "currency" },
  { title: "Total Bonus", key: "bonusAmountUsd", type: "currency" },
  { title: "Total Profit", key: "profitAmountUsd", type: "currency" },
];

export const SOLO_PLAYER_COLUMN = [
  // { title: "Id", key: "id", type: "id" },
  // { title: "Avatar", key: "avatar", type: "avatar" },
  { title: "Name", key: "name", type: "dom", sort: true, width: "5%" },
  { title: "VIP", key: "vip_level", type: "integer", sort: true, width: "5%" },
  { title: "Email", key: "email", type: "text", sort: true, width: "10%" },
  // { title: "Phone", key: "phone", type: "text" },
  // { title: "Telegram", key: "tg", type: "text" },
  // { title: "Wallet", key: "walletAddress", type: "address" },
  // { title: "Referral Code", key: "referralCode", type: "text" },
  {
    title: "Registered At",
    key: "registered_at",
    type: "text",
    sort: true,
    width: "10%",
  },
  {
    title: "Total Balance",
    key: "total_balance_usd",
    type: "currency",
    sort: false,
    width: "10%",
  },
  {
    title: "Total Depoist",
    key: "total_deposit_amount_usd",
    type: "currency",
    sort: true,
    width: "10%",
  },
  {
    title: "Total Withdraw",
    key: "total_withdraw_amount_usd",
    type: "currency",
    sort: true,
    width: "10%",
  },
  {
    title: "Total Wager",
    key: "total_wager_amount_usd",
    type: "currency",
    sort: true,
    width: "10%",
  },
  {
    title: "Total Win",
    key: "total_win_amount_usd",
    type: "currency",
    sort: true,
    width: "10%",
  },
  // { title: "Total Lose Amount", key: "totalLoseAmountUsd", type: "currency" },
  {
    title: "Total Bonus",
    key: "total_bonus_amount_usd",
    type: "currency",
    sort: true,
    width: "10%",
  },
  {
    title: "Total Profit",
    key: "total_profit_amount_usd",
    type: "currency",
    sort: true,
    width: "10%",
  },
];

export const USER_REVENUE_LIST = [
  { title: "Name", key: "name", type: "dom", sort: true, width: "5%" },
  { title: "VIP", key: "vip_level", type: "integer", sort: true, width: "5%" },
  { title: "Email", key: "email", type: "text", sort: true, width: "20%" },
  {
    title: "Registered At",
    key: "registered_at",
    type: "text",
    sort: true,
    width: "10%",
  },
  {
    title: "Total Profit",
    key: "total_profit_amount_usd",
    type: "currency",
    sort: true,
    width: "10%",
  },
];

export const GAME_LIST_COLUMN = [
  { title: "Id", key: "id", type: "id" },
  { title: "Avatar", key: "icon", type: "dom" },
  { title: "Title", key: "title", type: "text" },
  { title: "Identifier", key: "identifier", type: "text" },
  { title: "Producer", key: "producerIdentifier", type: "text" },
  { title: "Category", key: "category", type: "text" },
  { title: "Theme", key: "theme", type: "text" },
  { title: "Released At", key: "releasedAt", type: "text" },
];

export const GAME_REVENUE_LIST_COLUMN = [
  { title: "Id", key: "id", type: "id" },
  { title: "Avatar", key: "icon", type: "dom" },
  { title: "Title", key: "title", type: "text", sort: true },
  { title: "Identifier", key: "identifier", type: "text", sort: true },
  { title: "GGR", key: "ggr_amount_usd", type: "text", sort: true },
];

export const GAME_PROVIDER_REVENUE_LIST_COLUMN = [
  { title: "Id", key: "id", type: "id" },
  { title: "Name", key: "name", type: "text", sort: true },
  { title: "Identifier", key: "identifier", type: "text", sort: true },
  { title: "GGR", key: "ggr_amount_usd", type: "text", sort: true },
];

export const GAME_LIST = [
  { title: "Id", key: "id", type: "id" },
  { title: "Title", key: "title", type: "text" },
  { title: "" },
];

export const CURRENCY_LIST_COLUMN = [
  { title: "Id", key: "id", type: "id" },
  { title: "Network Id", key: "networkId", type: "id" },
  { title: "Network", key: "network", type: "text" },
  { title: "Symbol Id", key: "symbolId", type: "id" },
  { title: "Symbol", key: "symbol", type: "token" },
  { title: "Decimals", key: "decimals", type: "integer" },
  { title: "Contract", key: "contractAddress", type: "address" },
  { title: "Withdraw Fee", key: "withdrawFee", type: "decimal" },
];

export const PRODUCER_LIST_COLUMN = [
  { title: "Id", key: "id", type: "id" },
  { title: "Icon", key: "icon", type: "image" },
  { title: "Name", key: "name", type: "text" },
  { title: "Identifier", key: "identifier", type: "text" },
  { title: "Count", key: "count", type: "integer" },
];

export const TIER_PAYOUT_COLUMN = [
  // { title: 'Id', key: 'id', type: 'id' },
  { title: "Name", key: "name", type: "text" },
  { title: "Role", key: "role", type: "text" },
  { title: "Wager Settlement (%)", key: "wagerSettlement", type: "percent" },
  { title: "Losing Settlement (%)", key: "losingSettlement", type: "percent" },
  { title: "Jan", key: "jan", type: "object" },
  { title: "Feb", key: "feb", type: "object" },
  { title: "Mar", key: "mar", type: "object" },
  { title: "Apr", key: "apr", type: "object" },
  { title: "May", key: "may", type: "object" },
  { title: "Jun", key: "jun", type: "object" },
  { title: "Jul", key: "jul", type: "object" },
  { title: "Aug", key: "aug", type: "object" },
  { title: "Sep", key: "sep", type: "object" },
  { title: "Oct", key: "oct", type: "object" },
  { title: "Nov", key: "nov", type: "object" },
  { title: "Dec", key: "dec", type: "object" },
];

export const TIER_PAYOUT_HISTORY_COLULMN = [
  { title: "Id", key: "id", type: "id" },
  { title: "Confirm At", key: "confirmationAt", type: "text" },
  { title: "Payout At", key: "payoutAt", type: "text" },
  { title: "Payout Amount", key: "payoutAmountUsd", type: "currency" },
  { title: "Wager settlement (%)", key: "wagerSettlement", type: "decimal" },
  { title: "Losing Settlement (%)", key: "losingSettlement", type: "decimal" },
  {
    title: "Wager Commission",
    key: "wagerCommissionAmountUsd",
    type: "currency",
  },
  {
    title: "Losing Commision",
    key: "losingCommissionAmountUsd",
    type: "currency",
  },
  { title: "Status", key: "status", type: "boolean" },
];

export const BONUS_USER_COLUMN = [
  { title: "Amount", key: "amount", type: "decimal", sort: true },
  { title: "Amount USD", key: "amount_usd", type: "currency", sort: true },
  { title: "Claim Status", key: "claimStatus", type: "boolean" },
  { title: "Type", key: "type", type: "text", sort: true },
  { title: "Created At", key: "created_at", type: "text", sort: true },
];

export const BALANCE_USER_COLUMN = [
  { title: "Symbol", key: "symbol", type: "token" },
  { title: "Balance", key: "balance", type: "decimal" },
  { title: "Balance USD", key: "balanceUsd", type: "currency" },
];

export const WALLET_COLUMN = [
  { title: "Network", key: "network", type: "text" },
  { title: "Address", key: "address", type: "text" },
];

export const COUNTRY_REVENUE_LIST_COLUMN = [
  { title: "Name", key: "country", type: "text", sort: true },
  {
    title: "Revenue",
    key: "total_profit_amount_usd",
    type: "text",
    sort: true,
  },
];

export const MESSAGE_LIST_COLUMN = [
  { title: "Id", key: "id", type: "id" },
  { title: "Text", key: "text", type: "text" },
  { title: "Ip", key: "ip", type: "text" },
  { title: "Device", key: "device", type: "text" },
  { title: "Time", key: "created_at", type: "text" },
];

export const NOTIFICATION_LIST_COLUMN = [
  { title: "Title", key: "title", type: "text", sort: true, width: "10%" },
  { title: "Description", key: "description", type: "text", width: "20%" },

  { title: "Link", key: "link", type: "text", sort: true, width: "50%" },
  {
    title: "Created At",
    key: "created_at",
    type: "text",
    sort: true,
    width: "10%",
  },
  {
    title: "Updated At",
    key: "updated_at",
    type: "text",
    sort: true,
    width: "10%",
  },
];

export const USER_TIP_TRANSACTION_COLUMN = [
  { title: "Id", key: "id", type: "id" },
  { title: "Type", key: "type", type: "capitalize", sort: true },
  { title: "Sender", key: "transactor_name", type: "dom" },
  { title: "Currency", key: "symbol", type: "token" },
  { title: "Amount", key: "amount", type: "decimal", sort: true },
  { title: "Amount USD", key: "amount_usd", type: "currency", sort: true },
  {
    title: "Wallet Balance",
    key: "wallet_balance",
    type: "decimal",
    sort: true,
  },
  {
    title: "Wallet Balance USD",
    key: "wallet_balance_usd",
    type: "currency",
    sort: true,
  },
  { title: "Created At", key: "created_at", type: "text", sort: true },
];
