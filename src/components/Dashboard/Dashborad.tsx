"use client";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import TierDashboard from "../Tier/TierDashboard";
import DepositWithdrawComponents from "../DepositWithdarw/DepositWithdarwPage";
import { AppState } from "@/redux/store";
import { ROLES } from "@/types";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: AppState) => ({
    user: state.auth.user,
    isLogin: state.auth.isLogin
  }), shallowEqual);

  return (
    <>
      {user.role === ROLES.ADMIN ? (
        <AdminDashboard />
      ) : user.role === ROLES.TIER1 ? (
        <TierDashboard />
      ) : user.role === ROLES.TIER2 ? (
        <TierDashboard />
      ) : user.role === ROLES.TIER3 ? (
        <DepositWithdrawComponents />
      ) : null}
    </>
  );
};

export default Dashboard;
