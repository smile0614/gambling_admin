const ROOTS_ROOT = "";

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

export const PATH_LOGIN = path(ROOTS_ROOT, "/login");

export const PATH_PAGE = {
  root: ROOTS_ROOT,
  dashboard: path(ROOTS_ROOT, "/dashboard"),
  statistics: {
    root: path(ROOTS_ROOT, "/statistics"),
    dashboard: path(ROOTS_ROOT, "/statistic-dashboard"),
    systemGrowth: path(ROOTS_ROOT, "/system-growth"),
    depositAndWithdraw: path(
      ROOTS_ROOT,
      "/statistics/deposit-withdraw-history",
    ),
    swap: path(ROOTS_ROOT, "/statistics/swap-history"),
    wager: path(ROOTS_ROOT, "/statistics/wager-history"),
    wallet: path(ROOTS_ROOT, "/statistics/wallet-history"),
    bonus: path(ROOTS_ROOT, "/statistics/bonus-history"),
  },
  notification: {
    root: path(ROOTS_ROOT, '/notification'),
    message: path(ROOTS_ROOT, '/notification/message')
  },
  management: {
    tier: {
      root: path(ROOTS_ROOT, "/tier"),
      dashboard: path(ROOTS_ROOT, "/tier/dashboard"),
      tier1List: path(ROOTS_ROOT, "/tier/tier1-list"),
      tier2List: path(ROOTS_ROOT, "/tier/tier2-list"),
      tier3List: path(ROOTS_ROOT, "/tier/tier3-list"),
      list: path(ROOTS_ROOT, "/tier/tier-list"),
      payout: path(ROOTS_ROOT, "/tier/tier-payout"),
    },
    player: {
      root: path(ROOTS_ROOT, "/player"),
      soloList: path(ROOTS_ROOT, "/player/solo-list"),
      soloDepositAndWithdraw: path(ROOTS_ROOT, "/player/solo-deposit-withdraw"),
      onlinePlayer: path(ROOTS_ROOT, "/player/online-players"),
      users: path(ROOTS_ROOT, "/player/all-users"),
      user: (id: string) => path(ROOTS_ROOT, `/player/user?user=${id}`),
    },
    insight: {
      notificationList: path(ROOTS_ROOT, "/insight/notification"),
      inquiryList: path(ROOTS_ROOT, "/insight/inquiry")
    },
    data: {
      root: path(ROOTS_ROOT, "/data"),
      liveCasinoBettingHistory: path(
        ROOTS_ROOT,
        "/data/live-casino-betting-history",
      ),
      slotsGameBettingHistory: path(
        ROOTS_ROOT,
        "/data/slot-game-betting-history",
      ),
      gameList: path(ROOTS_ROOT, "/data/game-list"),
      producerList: path(ROOTS_ROOT, "/data/producer-list"),
      cryptoList: path(ROOTS_ROOT, "/data/crypto-currency-list"),
    },
  },
};
