import { NotificationType, UserType } from "./common";

export type AuthState = {
  user: UserType;
  isLogin: boolean;
  token: string;
  isLoading: boolean;
};

export type TransactionState = {
  deposit: number;
  withdraw: number;
  wager: number;
  adminDepositBalance: number;
  adminWithdrawBalance: number;
  win: number;
  bonus: number;
  playerLostAmount: number;

  totalPlayers: number;
  onlinePlayers: number;
  todayRegisteredPlayers: number;
  todayBettingUsers: number;
  todayBettingCount: number;
  depositMainWalletBalance: Array<{
    name: string;
    balance: number;
    balanceUsd: number;
  }>;
  withdrawMainWalletBalance: Array<{
    name: string;
    balance: number;
    balanceUsd: number;
  }>;
};

export type ModalState = {
  showTodayStatsModal: boolean;
  showNotificationModal: boolean;
  selectedNotification: NotificationType;
}