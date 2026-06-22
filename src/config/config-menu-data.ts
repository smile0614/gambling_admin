import { PATH_PAGE } from "./path";
import { ROLES } from "@/types";

const allRoles = [ROLES.ADMIN, ROLES.TIER1, ROLES.TIER2, ROLES.TIER3];

export const navConfig = [
  // MENU
  {
    roles: allRoles,
    items: [
      {
        title: "Dashboard",
        path: PATH_PAGE.dashboard,
        roles: allRoles,
        children: [],
        icon: "dashboard",
      },
    ],
  },
  {
    subheader: "Statistics",
    roles: [ROLES.ADMIN],
    items: [
      {
        title: "Revenue Status",
        path: PATH_PAGE.statistics.dashboard,
        roles: [ROLES.ADMIN],
        children: [],
        icon: "revenue",
      },
      {
        title: "System Growth",
        path: PATH_PAGE.statistics.systemGrowth,
        roles: [ROLES.ADMIN],
        children: [],
        icon: "growth",
      },
    ],
  },
  {
    subheader: "Reward Administration",
    roles: allRoles,
    items: [
      {
        title: "Bonus History",
        path: PATH_PAGE.statistics.bonus,
        roles: allRoles,
        children: [],
        icon: "bonus",
      },
    ],
  },
  {
    subheader: "Report",
    roles: allRoles,
    items: [
      {
        title: "Deposit & Withdraw",
        path: PATH_PAGE.statistics.depositAndWithdraw,
        roles: allRoles,
        children: [],
        icon: "deposit",
      },
      {
        title: "Game History",
        path: PATH_PAGE.statistics.wager,
        roles: allRoles,
        children: [],
        icon: "game",
      },
      {
        title: "Swap History",
        path: PATH_PAGE.statistics.swap,
        roles: allRoles,
        children: [],
        icon: "swap",
      },
    ],
  },
  {
    subheader: "Management",
    roles: [ROLES.ADMIN, ROLES.TIER1, ROLES.TIER2],
    items: [
      {
        title: "Player Management",
        path: PATH_PAGE.management.player.users,
        roles: allRoles,
        children: [],
        icon: "player",
      },
      {
        title: "Tier Management",
        roles: [ROLES.ADMIN, ROLES.TIER1, ROLES.TIER2],
        path: PATH_PAGE.management.tier.root,
        icon: "tree",
        children: [
          {
            title: "Tier 1 List",
            path: PATH_PAGE.management.tier.tier1List,
            roles: [ROLES.ADMIN],
          },
          {
            title: "Tier 2 List",
            path: PATH_PAGE.management.tier.tier2List,
            roles: [ROLES.ADMIN, ROLES.TIER1],
          },
          {
            title: "Tier 3 List",
            path: PATH_PAGE.management.tier.tier3List,
            roles: [ROLES.ADMIN, ROLES.TIER2, ROLES.TIER1],
          },
          {
            title: "All Tier List",
            path: PATH_PAGE.management.tier.list,
            roles: [ROLES.ADMIN, ROLES.TIER1, ROLES.TIER2],
          },
          {
            title: "Payout Management",
            path: PATH_PAGE.management.tier.payout,
            roles: [ROLES.ADMIN],
          },
        ],
      },
    ],
  },
  {
    subheader: "Site Configuration",
    roles: [ROLES.ADMIN],
    items: [
      {
        title: "Providers & Games",
        roles: [ROLES.ADMIN],
        path: PATH_PAGE.management.data.producerList,
        children: [
          {
            title: "Provider List",
            path: PATH_PAGE.management.data.producerList,
            roles: [ROLES.ADMIN],
          },
          {
            title: "Game List",
            path: PATH_PAGE.management.data.gameList,
            roles: [ROLES.ADMIN],
          },
        ],
        icon: "provider",
      },
      {
        title: "Currency List",
        path: PATH_PAGE.management.data.cryptoList,
        roles: [ROLES.ADMIN],
        children: [],
        icon: "cryptocurrency",
      },
    ],
  },
  {
    subheader: "System Insights",
    roles: [ROLES.ADMIN],
    items: [
      {
        title: "System Notification",
        path: PATH_PAGE.management.insight.notificationList,
        roles: [ROLES.ADMIN],
        children: [],
        icon: "notification",
      },
      {
        title: "Users Inquiry",
        path: PATH_PAGE.notification.message,
        roles: [ROLES.ADMIN],
        children: [],
        icon: "inquiry",
      },
    ],
  },
];
