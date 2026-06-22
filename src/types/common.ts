export enum SortType {
  ASC = "ASC",
  DESC = "DESC",
}

export enum CurrencyType {
  COIN = 1,
  TOKEN = 2,
  All = -1,
}

export enum DepositStatus {
  PROCESSING = 0,
  COMPLETE = 1,
  FAILED = 2,
  ALL = -1,
}

export enum WithdrawStatus {
  PENDING = 0,
  PROCESSING = 1,
  COMPLETE = 2,
  FAILED = 3,
  APPROVED = 4,
  REJECTED = 5,
  ALL = -1,
}

export enum GameAction {
  BET = 1,
  WIN = 2,
  ROLLBACK = 3,
  ALL = -1,
}

export enum ROLES {
  ADMIN = 1,
  SOLO = 2,
  TIER1 = 3,
  TIER2 = 4,
  TIER3 = 5,
}

export type UserType = {
  id: string;
  code: string;
  name: string;
  email: string;
  loosingSettlementPercent: number;
  wagerSettlementPercent: number;
  role: ROLES;
};

export type bonusType =
  | "levelups"
  | "cashbacks"
  | "claims"
  | "deposits"
  | "wagercontests"
  | 'airDrop';

export type BETTING = {
  rank: string;
  id: string;
  nickname: string;
  betting: string;
};
export type BonusHistoryType = {
  username: string;
  date: string;
  type: string;
  token: string;
  amount_usd: string;
  amount: string;
  status: string;
};

export type CardItemProps = {
  imageSrc?: string;
  name?: string;
  role?: string;
  cardImageSrc?: string;
  cardTitle?: string;
  cardContent?: string;
};

export type Chat = {
  avatar: string;
  name: string;
  text: string;
  time: number;
  textCount: number;
  dot: number;
};
export type COUNTRY = {
  country: string;
  online: string;
  game: string;
  bet: string;
  earning: string;
};
export type DailyRevenueType = {
  partner: string;
  deposit: string;
  withdrawal: string;
  betting_amount: string;
  win_amount: string;
  profit_loss: string;
  wager_amount: string;
  balance: string;
  bonus_point: string;
  daily_revenue: string;
};
export type DEPOSIT = {
  rank: string;
  id: string;
  nickname: string;
  deposit: string;
};
export type DepositWithdrawType = {
  id: string;
  userId: string;
  userName: string;
  userType: string;
  token: string;
  network: string;
  hash: string;
  fromAddress: string;
  toAddress: string;
  amount: number;
  amountUsd: number;
  createdAt: string;
  status: string;
};
export type FAQ = {
  header: string;
  id: number;
  text: string;
};
export type FaqItem = {
  active: number | null;
  handleToggle: (index: number) => void;
  faq: FAQ;
};
export type Lead = {
  avatar: string;
  name: string;
  email: string;
  project: string;
  duration: number;
  status: string;
};
export type LoosingHistoryType = {
  date: string;
  partner: string;
  slot: { profit_loss: string; wager_fee: string; loosing_fee: string };
  live_casino: { profit_loss: string; wager_fee: string; loosing_fee: string };
};

export type LoosingSettlementType = {
  partner_id: string;
  settlement_date: string;
  settlement_period: string;
  carryover_settlement__amount: string;
  loosing_settlement_slot: string;
  loosing_settlement_casino: string;
  loosing_settlement_total: string;
  status: string;
  done: string;
};
export type Package = {
  name: string;
  price: number;
  invoiceDate: string;
  status: string;
};
export type PRIZE = {
  rank: string;
  id: string;
  nickname: string;
  prize: string;
};
export type Product = {
  image: string;
  name: string;
  category: string;
  price: number;
  sold: number;
  profit: number;
};
export type PROFIT = {
  rank: string;
  id: string;
  nickname: string;
  profit: string;
};
export type STATISTICS = {
  date: string;
  level: string;
  userId: string;
  username: string;
  role: string;
  phone: string;
  email: string;
  country: string;

  os: string;
  provider: string;
  balance: string;
  referral: string;
  source: string;
  bet: string;
  wager: string;
  bonus: string;
  profit: string;
};
export type SwapHistoryType = {
  username: string;
  date: string;
  swap_from: string;
  from_amount: string;
  swap_to: string;
  to_amount: string;
  swap_fee: string;
};
export type Tiers = {
  level: string;
  balance: string;
  wagerCommission: string;
  loosingCommission: string;
  wager: string;
  losing: string;
  profit: string;
  bonus: string;
  withdraw: string;
  bet: string;
  win: string;
  losingAmt: string;
  date: string;
  status: string;
};
export type WagerHistoryType = {
  username: string;
  date: string;
  game: string;
  game_link: string;
  bet_token: string;
  bet_amount: string;
  bet_amount_usd: string;
  status: string;
};
export type WalletHistoryType = {
  date: string;
  username: string;
  type: string;
  amount_usd: string;
  amount: string;
  token: string;
  in_out: string;
};

export type WITHDRAW = {
  rank: string;
  id: string;
  nickname: string;
  withdraw: string;
};

export type COLUMNTYPE = Array<{
  title: string;
  width?: string | number;
  key: string;
  type: string;
  sort?: boolean;
}>;

export type NotificationType = {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
};