import { API_USER_LOGIN, API_USER_VALIDATE_TOKEN } from "@/config";
import Api from "../api";
import { ROLES, UserType } from "@/types";

export const convertRole1 = (val: number) => {
  let role = "";

  switch (val) {
    case 1:
      role = "Admin";
      break;
    case 2:
      role = "Solo";
      break;
    case 3:
      role = "Tier1";
      break;
    case 4:
      role = "TIER2";
      break;
    case 5:
      role = "TIER3";
      break;

    default:
      role = "TIER3";
      break;
  }
  return role;
};

export const convertRole = (val: number) => {
  let role: ROLES;

  switch (val) {
    case 1:
      role = ROLES.ADMIN;
      break;
    case 2:
      role = ROLES.SOLO;
      break;
    case 3:
      role = ROLES.TIER1;
      break;
    case 4:
      role = ROLES.TIER2;
      break;
    case 5:
      role = ROLES.TIER3;
      break;

    default:
      role = ROLES.TIER3;
      break;
  }
  return role;
};

export const convertUser = (user: any) => {
  let role: ROLES = convertRole(user?.role);
  const convertedUser: UserType = {
    id: user?.id,
    code: user?.code,
    name: user?.name,
    email: user?.email,
    loosingSettlementPercent: Number(user?.losing_settlement_percent || 0),
    wagerSettlementPercent: Number(user?.wager_settlement_percent || 0),
    role: role,
  };
  return convertedUser;
};

export const signInRequest = async (data: {
  email: string;
  password: string;
}) => {
  const response = await Api.post(API_USER_LOGIN, data);
  const { user, token } = response;
  localStorage.setItem("accessToken", token);
  const convertedUser = convertUser(user);
  return {
    token,
    user: convertedUser,
  };
};

export const validateToken = async (data: { token: string }) => {
  const response = await Api.get(API_USER_VALIDATE_TOKEN, {}, data);
  let role: ROLES;

  switch (response.role) {
    case 1:
      role = ROLES.ADMIN;
      break;
    case 3:
      role = ROLES.TIER1;
      break;
    case 4:
      role = ROLES.TIER2;
      break;
    case 5:
      role = ROLES.TIER3;
      break;

    default:
      role = ROLES.TIER3;
      break;
  }
  const convertedUser: UserType = {
    id: response.id,
    code: response.code,
    name: response.name,
    email: response.email,
    loosingSettlementPercent: Number(response.losing_settlement_percent || 0),
    wagerSettlementPercent: Number(response.wager_settlement_percent || 0),
    role: role,
  };
  return convertedUser;
};
