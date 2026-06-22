import { AppState } from "@/redux/store";
import { ROLES } from "@/types";
import React from "react";
import { useSelector } from "react-redux";

interface RoleBaseGuardProps {
  hasContent?: boolean;
  roles: Array<ROLES>;
  children: React.ReactNode;
}

export default function RoleBasedGuard({
  hasContent = false,
  roles,
  children,
}: RoleBaseGuardProps) {
  // Logic here to get current user role
  //   const { user } = useAuthContext();
  const userInfo = useSelector((state: AppState) => state.auth.user);

  // const currentRole = 'user';
  const currentRole = userInfo?.role; // admin;

  if (typeof roles !== "undefined" && !roles.includes(currentRole)) {
    return hasContent ? <div>Permission Denied</div> : null;
  }

  return <> {children} </>;
}
