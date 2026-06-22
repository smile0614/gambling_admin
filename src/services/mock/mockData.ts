/**
 * Mock data layer.
 *
 * The backend has been disconnected for client demo purposes. Every request
 * that used to hit the API now resolves against this file instead (see
 * `src/services/api.ts`, which routes all calls through `getMockResponse`).
 *
 * To go back to the real backend, restore the axios implementation in
 * `src/services/api.ts` — nothing else in the app needs to change.
 */

import * as R from "@/config/api.url.constant";

/* -------------------------------------------------------------------------- */
/*  Deterministic helpers (seeded so pagination stays consistent across pages) */
/* -------------------------------------------------------------------------- */

let _seed = 0x2f6e2b1;
const rng = () => {
  _seed = (_seed * 1103515245 + 12345) & 0x7fffffff;
  return _seed / 0x7fffffff;
};
const rint = (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min;
const ramt = (min: number, max: number) => +(rng() * (max - min) + min).toFixed(2);
const pick = <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];
const pastISO = (daysAgo: number) =>
  new Date(Date.now() - daysAgo * 86400000 - rint(0, 86399) * 1000).toISOString();

/* -------------------------------------------------------------------------- */
/*  Static pools                                                               */
/* -------------------------------------------------------------------------- */

const USER_NAMES = [
  "CryptoKing", "LuckySpin", "HighRoller777", "DiamondHands", "MoonGambler",
  "SatoshiPlays", "VegasVibes", "RoyalFlush", "BetMaster", "GoldenAce",
  "NeonNights", "TurboWin", "JackpotJoe", "SpinDoctor", "CoinFlipper",
  "AceOfSpades", "WildBison", "SilentBet", "MidnightLuck", "RocketRoller",
  "EmeraldFox", "BlazeWin", "FrostByte", "QuantumBet", "NovaStreak",
  "ShadowDealer", "CrimsonChip", "ZenGambler", "PixelPirate", "IronOdds",
  "VelvetVegas", "OrbitWin", "SolarFlare", "ThunderBet", "MaverickX",
  "NebulaSpin", "PhantomChip", "TitanRoll", "EchoStake", "LunarLuck",
  "ByteBaron", "CobraCash", "DriftKing", "FlashFold", "GhostStreak",
  "HaloHands", "IndigoBet",
];

const COUNTRIES = [
  { code: "US", name: "United States" }, { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" }, { code: "DE", name: "Germany" },
  { code: "FR", name: "France" }, { code: "JP", name: "Japan" },
  { code: "BR", name: "Brazil" }, { code: "AU", name: "Australia" },
  { code: "IN", name: "India" }, { code: "PH", name: "Philippines" },
  { code: "KR", name: "South Korea" }, { code: "NL", name: "Netherlands" },
  { code: "ES", name: "Spain" }, { code: "IT", name: "Italy" },
  { code: "TR", name: "Turkey" }, { code: "MX", name: "Mexico" },
  { code: "ZA", name: "South Africa" }, { code: "SE", name: "Sweden" },
  { code: "VN", name: "Vietnam" }, { code: "TH", name: "Thailand" },
];

const SYMBOLS = ["BTC", "ETH", "USDT", "USDC", "LTC", "TRX", "BNB", "XRP", "DOGE", "SOL"];
const NETWORKS = ["ERC20", "TRC20", "BTC", "BSC", "SOL"];

const PROVIDERS = [
  { name: "Pragmatic Play", identifier: "pragmatic" },
  { name: "Evolution", identifier: "evolution" },
  { name: "NetEnt", identifier: "netent" },
  { name: "Hacksaw Gaming", identifier: "hacksaw" },
  { name: "Play'n GO", identifier: "playngo" },
  { name: "Nolimit City", identifier: "nolimit" },
  { name: "Push Gaming", identifier: "push" },
  { name: "Big Time Gaming", identifier: "btg" },
  { name: "Relax Gaming", identifier: "relax" },
  { name: "Spribe", identifier: "spribe" },
];

const GAMES = [
  { title: "Sweet Bonanza", identifier: "pragmatic:sweet_bonanza", producer: "pragmatic" },
  { title: "Gates of Olympus", identifier: "pragmatic:gates_of_olympus", producer: "pragmatic" },
  { title: "Sugar Rush", identifier: "pragmatic:sugar_rush", producer: "pragmatic" },
  { title: "The Dog House", identifier: "pragmatic:the_dog_house", producer: "pragmatic" },
  { title: "Fruit Party", identifier: "pragmatic:fruit_party", producer: "pragmatic" },
  { title: "Wanted Dead or a Wild", identifier: "hacksaw:wanted_dead_or_a_wild", producer: "hacksaw" },
  { title: "Book of Dead", identifier: "playngo:book_of_dead", producer: "playngo" },
  { title: "Crazy Time", identifier: "evolution:crazy_time", producer: "evolution" },
  { title: "Lightning Roulette", identifier: "evolution:lightning_roulette", producer: "evolution" },
  { title: "Money Train 3", identifier: "relax:money_train_3", producer: "relax" },
  { title: "Aviator", identifier: "spribe:aviator", producer: "spribe" },
  { title: "Mental", identifier: "nolimit:mental", producer: "nolimit" },
  { title: "Starburst", identifier: "netent:starburst", producer: "netent" },
  { title: "Razor Shark", identifier: "push:razor_shark", producer: "push" },
  { title: "Bonanza Megaways", identifier: "btg:bonanza_megaways", producer: "btg" },
];

const TX_STATUS = ["COMPLETE", "PROCESSING", "PENDING", "FAILED"];
const USER_TYPES = ["Solo", "Tier1", "Tier2", "Tier3"];

/* -------------------------------------------------------------------------- */
/*  Pagination + time-series helpers                                          */
/* -------------------------------------------------------------------------- */

const paginate = (arr: any[], data: any, key: string) => {
  const page = Number(data?.page) || 1;
  const pageSize = Number(data?.page_size) || 10;
  const start = (page - 1) * pageSize;
  return {
    [key]: arr.slice(start, start + pageSize),
    page,
    page_size: pageSize,
    total_count: arr.length,
    total_page: Math.max(1, Math.ceil(arr.length / pageSize)),
  };
};

/**
 * Time-series points. Each point carries both `sum` and `count` so the same
 * generator satisfies amount-series and user-count-series consumers.
 * interval === -1 → a single aggregate point (consumers read array[0]).
 */
const series = (data: any, total: number, countTotal = 0) => {
  const interval = Number(data?.interval);
  const now = Math.floor(Date.now() / 1000);
  const start = Number(data?.start_time) || now - 30 * 86400;
  const end = Number(data?.end_time) || now;

  if (interval === -1 || !interval || Number.isNaN(interval)) {
    return [{ from: start, sum: +total.toFixed(2), count: countTotal }];
  }

  const points = 20;
  const step = Math.max(1, (end - start) / points);
  const out: { from: number; sum: number; count: number }[] = [];
  for (let i = 0; i < points; i++) {
    const factor = 0.4 + rng() * 1.2;
    out.push({
      from: Math.floor(start + i * step),
      sum: +((total / points) * factor).toFixed(2),
      count: Math.round((countTotal / points) * factor),
    });
  }
  return out;
};

/* -------------------------------------------------------------------------- */
/*  Stable datasets (built once)                                              */
/* -------------------------------------------------------------------------- */

const buildUser = (i: number) => {
  const name = USER_NAMES[i % USER_NAMES.length] + (i >= USER_NAMES.length ? i : "");
  const country = pick(COUNTRIES);
  const deposit = ramt(500, 80000);
  const withdraw = ramt(100, deposit);
  const wager = ramt(deposit, deposit * 12);
  const win = ramt(wager * 0.85, wager * 1.05);
  const wallet = "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[rint(0, 15)]).join("");
  return {
    id: `usr_${1000 + i}`,
    avatar: "",
    name,
    vip_level: rint(0, 8),
    email: `${name.toLowerCase()}@example.com`,
    phone: `+1${rint(200, 999)}${rint(1000000, 9999999)}`,
    telegram_user_name: `@${name.toLowerCase()}`,
    wallet_address: wallet,
    referral_code: `REF${rint(10000, 99999)}`,
    registered_at: pastISO(rint(1, 720)),
    created_at: Date.now() - rint(1, 720) * 86400000,
    kyc: rint(0, 4),
    kyc_photo_front: "",
    kcy_photo_back: "",
    country: country.code,
    country_full_name: country.name,
    setting_language: "en",
    role: "user",
    restricted_to: null,
    disabled_to: null,
    tier1: false, tier2: false, tier3: false,
    email_verified: rng() > 0.3,
    phone_verified: rng() > 0.5,
    wallet_signature: null,
    setting_fiat_currency: { symbol: "USD" },
    setting_show_full_name_crypto: false,
    setting_hide_gaming_data: false,
    setting_hide_user_name: false,
    setting_refuse_tip_from_strangers: false,
    setting_view_in_fiat: true,
    disabled_withdraw: false,
    total_deposit_amount_usd: deposit,
    total_withdraw_amount_usd: withdraw,
    total_wager_amount_usd: wager,
    total_win_amount_usd: win,
    total_profit_amount_usd: +(deposit - withdraw + (wager - win)).toFixed(2),
    total_bonus_amount_usd: ramt(0, 2000),
    total_balance_usd: ramt(0, 15000),
  };
};

const USERS = Array.from({ length: 47 }, (_, i) => buildUser(i));
const LIVE_USERS = USERS.slice(0, 18);
const SOLO_USERS = USERS.slice(0, 31);

const buildGame = (i: number) => {
  const g = GAMES[i % GAMES.length];
  return {
    id: `game_${100 + i}`,
    title: i >= GAMES.length ? `${g.title} ${Math.floor(i / GAMES.length) + 1}` : g.title,
    identifier: g.identifier,
    producer_id: `prod_${g.producer}`,
    producer_identifier: g.producer,
    provider: PROVIDERS.find((p) => p.identifier === g.producer)?.name || g.producer,
    category: pick(["slot", "live", "crash", "table"]),
    theme: pick(["Adventure", "Fruits", "Egypt", "Fantasy", "Classic"]),
    released_at: pastISO(rint(30, 1000)),
    payout: ramt(94, 98),
    ggr_amount_usd: ramt(5000, 500000),
  };
};
const GAME_LIST = Array.from({ length: 33 }, (_, i) => buildGame(i));

const PROVIDER_LIST = PROVIDERS.map((p, i) => ({
  id: `prov_${i + 1}`,
  name: p.name,
  identifier: p.identifier,
  count: rint(20, 480),
  created_at: pastISO(rint(100, 1200)),
  is_visible: true,
  priority: i + 1,
  ggr_amount_usd: ramt(50000, 2000000),
}));

const CURRENCY_LIST = (() => {
  const out: any[] = [];
  let id = 1;
  for (const net of NETWORKS) {
    for (const sym of SYMBOLS.slice(0, rint(3, 6))) {
      out.push({
        id: `cur_${id++}`,
        network_id: `net_${net}`,
        network: net,
        symbol_id: `sym_${sym}`,
        symbol: sym,
        contract_address: net === "BTC" ? "" : "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[rint(0, 15)]).join(""),
        withdraw_fee: ramt(0.1, 5),
        decimals: net === "TRC20" ? 6 : 18,
        type: rng() > 0.5 ? "TOKEN" : "COIN",
        created_at: pastISO(rint(50, 800)),
      });
    }
  }
  return out;
})();

const buildTx = (i: number, kind: "deposit" | "withdraw" | "game") => {
  const u = USERS[i % USERS.length];
  const sym = pick(SYMBOLS);
  const amount = ramt(10, 12000);
  const game = pick(GAMES);
  const profitMul = +(rng() * 4).toFixed(2);
  return {
    id: `tx_${kind}_${10000 + i}`,
    created_at: pastISO(rint(0, 120)),
    user_id: u.id,
    user_name: u.name,
    user_type: pick(USER_TYPES),
    amount,
    amount_usd: amount,
    fee: ramt(0.1, 5),
    fee_usd: ramt(0.1, 5),
    cryptocurrency_id: `cur_${rint(1, 20)}`,
    currencyId: `cur_${rint(1, 20)}`,
    currency: sym,
    currency_logo: `/images/fiats/${sym}.png`,
    symbol: sym,
    network: pick(NETWORKS),
    hash: "0x" + Array.from({ length: 64 }, () => "0123456789abcdef"[rint(0, 15)]).join(""),
    from_address: "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[rint(0, 15)]).join(""),
    to_address: "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[rint(0, 15)]).join(""),
    status: pick(TX_STATUS),
    pending_reason: "",
    // game-specific
    game_id: game.identifier,
    game_identifier: game.identifier,
    game_title: game.title,
    profit_multiplier: profitMul,
    profit_amount: +(amount * profitMul).toFixed(2),
    profit_amount_usd: +(amount * profitMul).toFixed(2),
    action_id: `act_${rint(100000, 999999)}`,
    original_action_id: `act_${rint(100000, 999999)}`,
    jackpot_contribution: null,
    jackpot_win: null,
  };
};
const DEPOSIT_TX = Array.from({ length: 60 }, (_, i) => buildTx(i, "deposit"));
const WITHDRAW_TX = Array.from({ length: 45 }, (_, i) => buildTx(i, "withdraw"));
const GAME_TX = Array.from({ length: 80 }, (_, i) => buildTx(i, "game"));

const SWAP_TX = Array.from({ length: 40 }, (_, i) => {
  const u = USERS[i % USERS.length];
  const from = pick(SYMBOLS);
  let to = pick(SYMBOLS);
  if (to === from) to = SYMBOLS[(SYMBOLS.indexOf(from) + 1) % SYMBOLS.length];
  const usd = ramt(50, 9000);
  return {
    id: `swap_${5000 + i}`,
    created_at: pastISO(rint(0, 120)),
    user_id: u.id,
    user_name: u.name,
    user_type: pick(USER_TYPES),
    from_symbol: from,
    from_amount: ramt(0.01, 50),
    from_amount_usd: usd,
    to_symbol: to,
    to_amount: ramt(0.01, 50),
    to_amount_usd: +(usd * 0.99).toFixed(2),
  };
});

const buildBonus = (i: number, type: string) => {
  const u = USERS[i % USERS.length];
  const sym = pick(SYMBOLS);
  const amount = ramt(5, 800);
  const claimed = rng() > 0.4;
  return {
    id: `bonus_${7000 + i}`,
    user_id: u.id,
    user_name: u.name,
    user_type: pick(USER_TYPES),
    amount,
    amount_usd: amount,
    claim_status: claimed ? "claimed" : "pending",
    claimed_at: claimed ? pastISO(rint(0, 60)) : null,
    created_at: pastISO(rint(0, 90)),
    wallet_balance: ramt(0, 5000),
    wallet_balance_usd: ramt(0, 5000),
    symbol: sym,
    type,
  };
};

const COUNTRY_USERS = COUNTRIES.map((c) => {
  const bet = ramt(20000, 4000000);
  return {
    country: c.code,
    country_full_name: c.name,
    count: rint(50, 5000),
    bet_amount_usd: bet,
    earning_amount_usd: ramt(-bet * 0.05, bet * 0.08),
    total_profit_amount_usd: ramt(-50000, 300000),
  };
});

const buildTier = (i: number, role: number) => {
  const name = `Team ${pick(COUNTRIES).name} ${i + 1}`;
  const wager = ramt(50000, 2000000);
  const win = ramt(wager * 0.85, wager);
  return {
    id: `tier${role - 2}_${i + 1}`,
    parent_tier1: role > 3 ? "tier1_1" : undefined,
    parent_tier2: role > 4 ? "tier2_1" : undefined,
    name,
    email: `team${i + 1}@example.com`,
    phone: `+1${rint(200, 999)}${rint(1000000, 9999999)}`,
    role,
    wager_settlement_percent: rint(20, 60),
    losing_settlement_percent: rint(10, 40),
    wager_commission_amount_usd: { total: ramt(2000, 60000) },
    losing_commission_amount_usd: { total: ramt(1000, 30000) },
    player_wager_amount_usd: { total: wager },
    player_win_amount_usd: { total: win },
    player_lose_amount_usd: { total: +(wager - win).toFixed(2) },
    player_bonus_amount_usd: { total: ramt(1000, 20000) },
    system_profit_amount_usd: { total: ramt(5000, 80000) },
    total_deposit_amount_usd: ramt(20000, 500000),
    total_withdraw_amount_usd: ramt(10000, 300000),
    registered_at: pastISO(rint(60, 900)),
  };
};
const TIER1 = Array.from({ length: 6 }, (_, i) => buildTier(i, 3));
const TIER2 = Array.from({ length: 11 }, (_, i) => buildTier(i, 4));
const TIER3 = Array.from({ length: 17 }, (_, i) => buildTier(i, 5));

/* -------------------------------------------------------------------------- */
/*  Composite object builders                                                 */
/* -------------------------------------------------------------------------- */

const adminUser = {
  id: "admin_001",
  code: "ADMIN",
  name: "Demo Admin",
  email: "admin@bonenza.com",
  role: 1,
  losing_settlement_percent: 0,
  wager_settlement_percent: 0,
};

const mainWalletBalance = () => {
  const make = (cap: number) => {
    const out: Record<string, any[]> = {};
    for (const net of NETWORKS.slice(0, 3)) {
      out[net] = SYMBOLS.slice(0, 4).map((sym) => {
        const usd = ramt(1000, cap);
        return { symbol: sym, balance: ramt(1, 50), balance_usd: usd };
      });
    }
    return out;
  };
  return { balances: { deposit: make(120000), withdraw: make(60000) } };
};

const tierTreeData = () => {
  const mk = (t: number) => ({ total: t, direct: +(t * 0.4).toFixed(2), subtier: +(t * 0.6).toFixed(2) });
  const deposit = ramt(200000, 900000);
  const withdraw = ramt(100000, deposit);
  const wager = ramt(deposit * 3, deposit * 10);
  const win = ramt(wager * 0.85, wager);
  const bonus = ramt(5000, 60000);
  const profit = ramt(20000, 200000);
  const payout = ramt(20000, 120000);
  const paid = +(payout * 0.7).toFixed(2);
  return {
    // flat fields (statistics.reducer)
    total_deposit_amount_usd: deposit,
    total_withdraw_amount_usd: withdraw,
    player_wager_amount_usd: wager,
    player_win_amount_usd: win,
    player_bonus_amount_usd: bonus,
    // nested fields (TierDashboard) — note: these override the flat keys above
    // where names collide, so they must stay objects with total/direct/subtier.
    user_count: { total: rint(500, 5000), direct: rint(100, 500), subtier: rint(400, 4500) },
    tier_count: { tier1: TIER1.length, tier2: TIER2.length, tier3: TIER3.length },
    deposit_amount_usd: mk(deposit),
    withdraw_amount_usd: mk(withdraw),
    system_profit_amount_usd: mk(profit),
    wager_settlement_percent: rint(3000, 6000),
    losing_settlement_percent: rint(1500, 4000),
    wager_commission_amount_usd: mk(ramt(10000, 80000)),
    losing_commission_amount_usd: mk(ramt(5000, 40000)),
    payout_amount_usd: mk(payout),
    paid_payout_amount_usd: paid,
    unpaid_payout_amount_usd: +(payout - paid).toFixed(2),
  };
};
// keep nested wager/win/bonus objects too (TierDashboard reads .total on them)
const tierTreeFull = () => {
  const base: any = tierTreeData();
  const wagerT = base.player_wager_amount_usd as number;
  const winT = base.player_win_amount_usd as number;
  const bonusT = base.player_bonus_amount_usd as number;
  const mk = (t: number) => ({ total: t, direct: +(t * 0.4).toFixed(2), subtier: +(t * 0.6).toFixed(2) });
  base.player_wager_amount_usd = mk(wagerT);
  base.player_win_amount_usd = mk(winT);
  base.player_bonus_amount_usd = mk(bonusT);
  // re-expose flat aliases for the statistics reducer (different keys, no clash)
  base.total_deposit_amount_usd = base.total_deposit_amount_usd;
  return base;
};

const userStatistics = (deposit = ramt(1000, 50000)) => ({
  today_bet_count: rint(0, 200),
  total_bet_count: rint(200, 20000),
  today_deposit_amount_usd: ramt(0, 3000),
  total_deposit_amount_usd: deposit,
  total_claimed_bonus_amount_usd: ramt(0, 2000),
  total_unclaimed_bonus_amount_usd: ramt(0, 500),
  today_profit_amount_usd: ramt(-2000, 2000),
  total_profit_amount_usd: ramt(-10000, 30000),
  today_bet_amount_usd: ramt(0, 20000),
  total_bet_amount_usd: ramt(20000, 800000),
  today_withdraw_amount_usd: ramt(0, 2000),
  total_withdraw_amount_usd: ramt(500, 30000),
  total_balance_amount_usd: ramt(0, 15000),
  last_joined_at: Math.floor(Date.now() / 1000) - rint(0, 86400),
  ip: `${rint(1, 255)}.${rint(0, 255)}.${rint(0, 255)}.${rint(1, 255)}`,
});

const userWallets = () =>
  NETWORKS.slice(0, 4).map((net) => ({
    network: net,
    address: net === "BTC"
      ? "bc1q" + Array.from({ length: 38 }, () => "0123456789abcdefghijklmnopqrstuvwxyz"[rint(0, 35)]).join("")
      : "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[rint(0, 15)]).join(""),
  }));

const treeList = () =>
  TIER1.map((t1) => ({
    id: t1.id,
    name: t1.name,
    role: 3,
    children: TIER2.slice(0, 2).map((t2) => ({
      id: t2.id,
      name: t2.name,
      role: 4,
      children: TIER3.slice(0, 2).map((t3) => ({
        id: t3.id,
        name: t3.name,
        role: 5,
        children: [],
      })),
    })),
  }));

const payoutList = (data: any) => {
  const tiers = [...TIER1, ...TIER2].map((t) => {
    const months: Record<string, any> = {};
    for (let m = 1; m <= 12; m++) {
      months[String(m)] = { amount_usd: ramt(2000, 12000), status: m < 7 };
    }
    return {
      id: t.id, name: t.name, email: t.email, phone: t.phone, role: t.role,
      wager_settlement_percent: t.wager_settlement_percent,
      losing_settlement_percent: t.losing_settlement_percent,
      data: months,
    };
  });
  return paginate(tiers, data, "tiers");
};

const payoutHistory = () =>
  Array.from({ length: 12 }, (_, i) => ({
    id: `payout_${i + 1}`,
    confirmed_at: pastISO((11 - i) * 30 + 2),
    payout_at: pastISO((11 - i) * 30),
    payout_amount_usd: ramt(3000, 15000),
    wager_settlement_percent: rint(20, 60),
    losing_settlement_percent: rint(10, 40),
    wager_commission_amount_usd: ramt(200, 2000),
    losing_commission_amount_usd: ramt(100, 1000),
    status: "completed",
  }));

const monthlyPayout = () =>
  Array.from({ length: 12 }, (_, i) => {
    const d = new Date();
    d.setMonth(d.getMonth() - (11 - i));
    return { payout_at: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`, sum: ramt(30000, 90000) };
  });

const usersByTier = (data: any) => {
  const users = USERS.slice(0, 25).map((u) => ({
    id: u.id,
    registered_at: u.registered_at,
    name: u.name,
    vip_level: u.vip_level,
    deposit_amount_usd: u.total_deposit_amount_usd,
    withdraw_amount_usd: u.total_withdraw_amount_usd,
    total_wager_amount_usd: u.total_wager_amount_usd,
    total_win_amount_usd: u.total_win_amount_usd,
    total_lose_amount_usd: ramt(0, 5000),
    total_bonus_amount_usd: u.total_bonus_amount_usd,
    total_profit_amount_usd: u.total_profit_amount_usd,
  }));
  return paginate(users, data, "users");
};

const topPlayers = (nameKey: "user_name" | "name", count: number) =>
  Array.from({ length: count || 5 }, (_, i) => {
    const u = USERS[i];
    return { id: u.id, user_id: u.id, [nameKey]: u.name, name: u.name, sum: ramt(5000, 200000), amount_usd: ramt(5000, 200000) };
  });

const topGames = (count: number) =>
  Array.from({ length: count || 5 }, (_, i) => {
    const g = GAME_LIST[i];
    return { id: g.id, name: g.title, title: g.title, identifier: g.identifier, sum: ramt(10000, 400000), bet_count: rint(500, 20000) };
  });

const success = (message: string) => ({ status: true, success: true, message });

/* -------------------------------------------------------------------------- */
/*  Generic safe fallback (array-like + object-like)                          */
/* -------------------------------------------------------------------------- */

const fallback = () => {
  const fb: any = [];
  fb.page = 1; fb.page_size = 10; fb.total_count = 0; fb.total_page = 1;
  fb.data = []; fb.transactions = []; fb.users = []; fb.tiers = [];
  fb.games = []; fb.providers = []; fb.countries = []; fb.bonuses = [];
  fb.notifications = []; fb.currencies = [];
  fb.balances = { deposit: {}, withdraw: {} };
  fb.count = 0; fb.amount_usd = 0; fb.fee = 0;
  return fb;
};

/* -------------------------------------------------------------------------- */
/*  Router                                                                     */
/* -------------------------------------------------------------------------- */

export function getMockResponse(
  route: string,
  method: string,
  data: any = {},
  _params: any = {},
): any {
  // path-param routes that arrive with the id already appended
  if (route.startsWith(R.API_NOTIFICATION_DELETE)) return success("Notification deleted");

  switch (route) {
    /* ----- auth ----- */
    case R.API_USER_LOGIN:
      return { user: adminUser, token: "mock-demo-token" };
    case R.API_USER_VALIDATE_TOKEN:
      return adminUser;
    case R.API_USER_CHANGE_PASSWORD:
      return success("Password updated");

    /* ----- tier ----- */
    case R.API_TIER_CREATE: return success("Tier is created successfully");
    case R.API_TIER_UPDATE: return success("Tier updated successfully");
    case R.API_TIER_USERS_BY_TIER: return usersByTier(data);
    case R.API_TIER_DATA: return TIER1[0];
    case R.API_TIER_TREE_VIEW: return tierTreeFull();
    case R.API_TIER_GENERATE_CODE: return { code: `Tier1${rint(1000, 9999)}AB` };
    case R.API_TIER_LIST: return treeList();
    case R.API_TIER_SMALL_TIER1: return TIER1.map((t) => ({ id: t.id, name: t.name }));
    case R.API_TIER_SMALL_TIER2: return TIER2.map((t) => ({ id: t.id, name: t.name }));
    case R.API_TIER_TIER1_LIST: return paginate(TIER1, data, "tiers");
    case R.API_TIER_TIER2_LIST: return paginate(TIER2, data, "tiers");
    case R.API_TIER_TIER3_LIST: return paginate(TIER3, data, "tiers");
    case R.API_TIER_PAYOUT_LIST: return payoutList(data);
    case R.API_TIER_CONFIRM_PAYOUT: return success("Payout confirmed");
    case R.API_TIER_PAYOUT_HISTORY: return payoutHistory();
    case R.API_TIER_TOTAL_MONTHLY_PAYOUT: return monthlyPayout();
    case R.API_TIER_CREATE_PAYOUT_TRANSACTIONS: return success("Payout transactions created");

    /* ----- users ----- */
    case R.API_USER_TOTAL_COUNT: return series(data, 0, rint(3000, 12000));
    case R.API_USER_ACTIVE: return series(data, 0, rint(50, 500));
    case R.API_USER_LIST: return paginate(USERS, data, "users");
    case R.API_USER_LIVE_LIST: return paginate(LIVE_USERS, data, "users");
    case R.API_SOLO_LIST: return paginate(SOLO_USERS, data, "users");
    case R.API_USER_BY_COUNTRY: return paginate(USERS.slice(0, 20), data, "users");
    case R.API_USER_DATA: return USERS[0];
    case R.API_USER_STATISTICS: return userStatistics();
    case R.API_USER_WALLET: return userWallets();
    case R.API_USER_BALANCE: return { balance: ramt(0, 15000), balance_usd: ramt(0, 15000) };
    case R.API_USER_UPDATE_KYC: return success("KYC updated");
    case R.API_USER_WITHDRAW_RESTRICT: return success("Withdraw restriction updated");
    case R.API_USER_GENERATE_ERC_WALLET:
    case R.API_USER_GENERATE_TRX_WALLET: return success("Wallet generated");
    case R.API_USER_TRANSACTION_DEPOSIT: return paginate(DEPOSIT_TX, data, "transactions");
    case R.API_USER_TRANSACTION_WITHDRAW: return paginate(WITHDRAW_TX, data, "transactions");
    case R.API_USER_TRANSACTION_GAME: return paginate(GAME_TX, data, "transactions");
    case R.API_USER_TRANSACTION_BONUS: {
      const list = Array.from({ length: 18 }, (_, i) => buildBonus(i, "levelup"));
      return { ...paginate(list, data, "bonuses"), total_claimed_count: 12 };
    }
    case R.API_USER_TRANSACTION_TIP: {
      const tips = Array.from({ length: 22 }, (_, i) => {
        const u = USERS[i % USERS.length];
        const sym = pick(SYMBOLS);
        const amt = ramt(1, 500);
        return {
          id: `tip_${i + 1}`,
          created_at: pastISO(rint(0, 90)),
          transactor_id: USERS[(i + 3) % USERS.length].id,
          transactor_name: USERS[(i + 3) % USERS.length].name,
          type: rng() > 0.5 ? "tip_in" : "tip_out",
          symbol: sym,
          amount: amt,
          amount_usd: amt,
          wallet_balance: ramt(0, 5000),
          wallet_balance_usd: ramt(0, 5000),
        };
      });
      return paginate(tips, data, "transactions");
    }

    /* ----- crypto ----- */
    case R.API_CRYPTO_SYMBOLS: return SYMBOLS.map((s, i) => ({ id: `sym_${i}`, symbol: s }));
    case R.API_CRYPTO_NETWORKS: return NETWORKS.map((n, i) => ({ id: `net_${i}`, network: n }));
    case R.API_CRYPTO_LIST: return paginate(CURRENCY_LIST, data, "currencies");
    case R.API_CRYPTO_FULL_LIST: return CURRENCY_LIST;
    case R.API_CRYPTO_CURRENCY:
    case R.API_CRYPTO_CURRENCY_BY_ID:
    case R.API_CRYPTO_SYMBOL:
    case R.API_CRYPTO_SYMBOL_BY_ID:
    case R.API_CRYPTO_NETWORK:
    case R.API_CRYPTO_NETWORK_BY_ID: return success("Saved successfully");

    /* ----- deposit ----- */
    case R.API_DEPOSIT_TOTAL: return series(data, ramt(200000, 900000));
    case R.API_DEPOSIT_HIGHEST: return { amount_usd: ramt(20000, 150000) };
    case R.API_DEPOSIT_TOP: return topPlayers("user_name", Number(data?.count) || 5);
    case R.API_DEPOSIT_TRANSACTIONS: return paginate(DEPOSIT_TX, data, "transactions");
    case R.API_DEPOSIT_COUNT: return { count: rint(500, 5000) };

    /* ----- withdraw ----- */
    case R.API_WITHDRAW_TOTAL: return series(data, ramt(100000, 600000));
    case R.API_WITHDRAW_HIGHEST: return { amount_usd: ramt(15000, 90000) };
    case R.API_WITHDRAW_TOP: return topPlayers("name", Number(data?.count) || 5);
    case R.API_WITHDRAW_TRANSACTIONS: return paginate(WITHDRAW_TX, data, "transactions");
    case R.API_WITHDRAW_COUNT: return { count: rint(300, 3000) };
    case R.API_WITHDRAW_PENDING_COUNT: return { count: rint(0, 40) };
    case R.API_WITHDRAW_TRANSACTION_APPROVE: return success("Withdraw is approved");
    case R.API_WITHDRAW_TRANSACTION_REJECT: return success("Withdraw is rejected");

    /* ----- wallet / balance ----- */
    case R.API_WALLET_LIST: return [];
    case R.API_BALANCE_LIST: return [];
    case R.API_BALANCE_MAIN: return mainWalletBalance();
    case R.API_BALANCE_TOTAL: return { amount_usd: ramt(500000, 2000000) };

    /* ----- game ----- */
    case R.API_GAME_TOTAL_WAGER: return series(data, ramt(2000000, 9000000));
    case R.API_GAME_TOTAL_PROFIT: return series(data, ramt(100000, 800000));
    case R.API_GAME_TOTAL_GGR: return series(data, ramt(200000, 1500000));
    case R.API_GAME_TOTAL_LOSE: return series(data, ramt(100000, 700000));
    case R.API_GAME_HIGHEST_BET: return { amount_usd: ramt(20000, 120000) };
    case R.API_GAME_HIGHEST_WIN: return { amount_usd: ramt(50000, 500000) };
    case R.API_GAME_HIGHEST_PROFIT: return { amount_usd: ramt(20000, 200000) };
    case R.API_GAME_HIGHEST_LOSE: return { amount_usd: ramt(20000, 200000) };
    case R.API_GAME_TOP_WAGERS: return topPlayers("name", Number(data?.count) || 5);
    case R.API_GAME_TOP_WINNERS: return topPlayers("name", Number(data?.count) || 5);
    case R.API_GAME_TOP_GAMES: return topGames(Number(data?.count) || 5);
    case R.API_GAME_TRANSACTIONS: return paginate(GAME_TX, data, "transactions");
    case R.API_GAME_WAGER_TRANSACTIONS: return paginate(GAME_TX, data, "transactions");
    case R.API_GAME_LIST: return paginate(GAME_LIST, data, "games");
    case R.API_GAME_REVENUE_LIST: return paginate(GAME_LIST, data, "games");
    case R.API_GAME_PROVIDER_REVENUE_LIST: return paginate(PROVIDER_LIST, data, "providers");
    case R.API_GAME_PRODUERS: {
      const arr: any = [...PROVIDER_LIST];
      arr.page = 1; arr.page_size = PROVIDER_LIST.length;
      arr.total_count = PROVIDER_LIST.length; arr.total_page = 1;
      return method === "post" ? success("Provider created") : arr;
    }
    case R.API_GAME_PRODUERS_ID: return success("Provider updated");
    case R.API_GAME_LIST_BY_ID: return GAME_LIST[0];
    case R.API_GAME_STATISTICS:
      return { total_wager_amount_usd: ramt(50000, 900000), total_profit_amount_usd: ramt(5000, 90000) };
    case R.API_GAME_TRANSACTIONS_INFO:
      return {
        total_wager_amount_usd: ramt(500000, 5000000),
        total_wager_count: rint(5000, 50000),
        total_win_amount_usd: ramt(400000, 4500000),
        total_win_count: rint(4000, 45000),
        total_lose_amount_usd: ramt(50000, 500000),
      };
    case R.API_GAME_TOTAL_PLAYERS: return { count: rint(3000, 12000) };
    case R.API_GAME_TOTAL_LIVE_PLAYERS: return { count: rint(50, 800) };

    /* ----- swap ----- */
    case R.API_SWAP_TRANSACTIONS: return paginate(SWAP_TX, data, "transactions");
    case R.API_SWAP_FEE: return method === "put" ? success("Swap fee updated") : { fee: 1.5 };

    /* ----- vip ----- */
    case R.API_VIP_LEVELS: return Array.from({ length: 10 }, (_, i) => ({ id: `vip_${i}`, level: i, name: `VIP ${i}` }));
    case R.API_VIP_MEDALS: return [];

    /* ----- bonus ----- */
    case R.API_BONUS_TOTAL: return series(data, ramt(50000, 300000));
    case R.API_BONUS_LEVELUP:
    case R.API_BONUS_CASHBACKS:
    case R.API_BONUS_CLAIMS:
    case R.API_BONUS_DEPOSITS:
    case R.API_BONUS_WAGERCONTESTS:
    case R.API_BONUS_AIRDROP: {
      const type = route.split("/").pop() || "bonus";
      const list = Array.from({ length: 30 }, (_, i) => buildBonus(i, type));
      return { ...paginate(list, data, "bonuses"), total_claimed_count: rint(5, 25) };
    }

    /* ----- affiliate ----- */
    case R.API_AFFILIATE_RULE: return method === "get" ? { rule: {} } : success("Saved");
    case R.API_AFFILIATE_REFERRAL_TRANSACTIONS:
    case R.API_AFFILIATE_COMMISSION_TRANSACTIONS: return paginate([], data, "transactions");

    /* ----- country ----- */
    case R.API_COUNTRY: return COUNTRY_USERS;
    case R.API_COUNTRY_REVENUE_LIST: return paginate(COUNTRY_USERS, data, "countries");

    /* ----- message / notification ----- */
    case R.API_MESSAGE_HISTORY: {
      const msgs = Array.from({ length: 24 }, (_, i) => ({
        id: `msg_${i + 1}`,
        text: pick([
          "Great offer, thanks!", "How do I claim my bonus?", "Love the new games 🎰",
          "When is the next tournament?", "Withdrawal received, cheers!",
          "Can you check my account?", "VIP support is amazing", "Keep up the good work 💪",
        ]),
        ip: `${rint(1, 255)}.${rint(0, 255)}.${rint(0, 255)}.${rint(1, 255)}`,
        device: pick(["iPhone 14", "Chrome/Windows", "Safari/iOS", "Samsung S23", "Firefox/Linux"]),
        created_at: pastISO(rint(0, 30)),
      }));
      return paginate(msgs, data, "data");
    }
    case R.API_NOTIFICATION_LIST: {
      const notifs = Array.from({ length: 15 }, (_, i) => ({
        id: `notif_${i + 1}`,
        title: pick([
          "Weekend Reload Bonus", "New Game Release", "Tournament Starting Soon",
          "VIP Program Update", "Maintenance Notice", "Cashback Friday",
        ]),
        description: "Don't miss out on our latest promotion. Terms and conditions apply.",
        link: "https://example.com/promo",
        image: "",
        created_at: pastISO(rint(0, 60)),
        updated_at: pastISO(rint(0, 60)),
      }));
      return paginate(notifs, data, "notifications");
    }
    case R.API_NOTIFICATION_ADD: return success("Notification saved successfully");

    default:
      return fallback();
  }
}
