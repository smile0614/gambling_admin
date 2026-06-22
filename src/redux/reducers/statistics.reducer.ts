import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ROLES } from "@/types";
import { TransactionState } from "@/types/reducer-types";

import { AppDispatch } from "../store";
import { getMainWalletBalance } from "@/services/apis/balance";
import { getTierTreeDataById } from "@/services/apis/tier";

const initialState: TransactionState = {
  deposit: 0,
  withdraw: 0,
  wager: 0,
  adminDepositBalance: 0,
  adminWithdrawBalance: 0,
  win: 0,

  bonus: 0,
  playerLostAmount: 0,

  totalPlayers: 0,
  onlinePlayers: 0,
  todayRegisteredPlayers: 0,
  todayBettingUsers: 0,
  todayBettingCount: 0,
  depositMainWalletBalance: [],
  withdrawMainWalletBalance: [],
};

export const statisticsSlice = createSlice({
  name: "statistics",
  initialState: initialState,
  reducers: {
    setDeposit: (state: TransactionState, action: PayloadAction<number>) => {
      state.deposit = action.payload;
    },
    setWithdraw: (state: TransactionState, action: PayloadAction<number>) => {
      state.withdraw = action.payload;
    },
    setWager: (state: TransactionState, action: PayloadAction<number>) => {
      state.wager = action.payload;
    },
    setAdminBalance: (
      state: TransactionState,
      action: PayloadAction<{ deposit: number; withdraw: number }>,
    ) => {
      state.adminDepositBalance = action.payload.deposit;
      state.adminWithdrawBalance = action.payload.withdraw;
    },
    setWin: (state: TransactionState, action: PayloadAction<number>) => {
      state.win = action.payload;
    },

    setBonus: (state: TransactionState, action: PayloadAction<number>) => {
      state.bonus = action.payload;
    },
    setPlayerLost: (state: TransactionState, action: PayloadAction<number>) => {
      state.playerLostAmount = action.payload;
    },
    setTotalPlayers: (
      state: TransactionState,
      action: PayloadAction<number>,
    ) => {
      state.totalPlayers = action.payload;
    },
    setOnlinePlayers: (
      state: TransactionState,
      action: PayloadAction<number>,
    ) => {
      state.onlinePlayers = action.payload;
    },
    setTodayRegisteredPlayers: (
      state: TransactionState,
      action: PayloadAction<number>,
    ) => {
      state.todayRegisteredPlayers = action.payload;
    },
    setTodayBettingUsers: (
      state: TransactionState,
      action: PayloadAction<number>,
    ) => {
      state.todayBettingUsers = action.payload;
    },
    setTodayBettingCount: (
      state: TransactionState,
      action: PayloadAction<number>,
    ) => {
      state.todayBettingCount = action.payload;
    },
    setDepositMainWalletBalance: (
      state: TransactionState,
      action: PayloadAction<
        Array<{ name: string; balance: number; balanceUsd: number }>
      >,
    ) => {
      state.depositMainWalletBalance = action.payload;
    },
    setWithdrawMainWalletBalance: (
      state: TransactionState,
      action: PayloadAction<
        Array<{ name: string; balance: number; balanceUsd: number }>
      >,
    ) => {
      state.withdrawMainWalletBalance = action.payload;
    },
  },
});

export const {
  setDeposit,
  setWithdraw,
  setWager,
  setAdminBalance,
  setWin,
  setBonus,
  setPlayerLost,
  setTotalPlayers,
  setOnlinePlayers,
  setTodayRegisteredPlayers,
  setTodayBettingUsers,
  setTodayBettingCount,
  setDepositMainWalletBalance,
  setWithdrawMainWalletBalance,
} = statisticsSlice.actions;
export default statisticsSlice.reducer;

export const getStatistics =
  (userId: string, userRole: ROLES) => async (dispatch: AppDispatch) => {
    const now = new Date();
    const endTime = now.getTime() / 1000;

    now.setHours(0, 0, 0, 0);
    const startTime = now.getTime() / 1000;

    const today = {
      id: userId,
      start_time: startTime,
      end_time: endTime,
      interval: -1,
    };

    if (userRole === ROLES.ADMIN) {
      const _resMainWallet = await getMainWalletBalance();

      let depositBalance = 0;
      let withdrawBalance = 0;
      Object.keys(_resMainWallet.balances.deposit).map((key, index) =>
        _resMainWallet.balances.deposit[key].map(
          (item: any) => (depositBalance += item.balance_usd),
        ),
      );
      Object.keys(_resMainWallet.balances.withdraw).map((key, index) =>
        _resMainWallet.balances.withdraw[key].map(
          (item: any) => (withdrawBalance += item.balance_usd),
        ),
      );

      dispatch(
        setAdminBalance({ deposit: depositBalance, withdraw: withdrawBalance }),
      );
    }

    const [_resTierData] = await Promise.all([
      getTierTreeDataById(today),
      // getUserCount(today),
      // getUserCount({ start_time: 0, end_time: endTime, interval: -1 }),
      // getLiveUserList({ page: 1, page_size: 20, search: '' })
    ]);

    dispatch(setDeposit(Number(_resTierData?.total_deposit_amount_usd || 0)));
    dispatch(setWithdraw(Number(_resTierData?.total_withdraw_amount_usd || 0)));
    dispatch(setWager(Number(_resTierData?.player_wager_amount_usd || 0)));
    dispatch(setWin(Number(_resTierData?.player_win_amount_usd || 0)));
    dispatch(setBonus(Number(_resTierData?.player_bonus_amount_usd || 0)));
  };

export const getMainBalance = () => async (dispatch: AppDispatch) => {
  const response = await getMainWalletBalance();
  const _depositWallets: Array<{
    name: string;
    balance: number;
    balanceUsd: number;
  }> = [];
  Object.keys(response.balances.deposit).map((network) => {
    const networkTokens = response.balances.deposit[network];
    const _tokens = networkTokens.map((token: any) => ({
      name: `${network}-${token.symbol}`,
      balance: token.balance,
      balanceUsd: token.balance_usd,
    }));
    _depositWallets.push(..._tokens);
    return _tokens;
  });

  const _withdrawWallets: Array<{
    name: string;
    balance: number;
    balanceUsd: number;
  }> = [];
  Object.keys(response.balances.withdraw).map((network) => {
    const networkTokens = response.balances.withdraw[network];
    const _tokens = networkTokens.map((token: any) => ({
      name: `${network}-${token.symbol}`,
      balance: token.balance,
      balanceUsd: token.balance_usd > 10000 ? 10000 : token.balance_usd,
    }));
    _withdrawWallets.push(..._tokens);
    return _tokens;
  });

  dispatch(setDepositMainWalletBalance(_depositWallets));
  dispatch(setWithdrawMainWalletBalance(_withdrawWallets));
};
