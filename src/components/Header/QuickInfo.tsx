import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";
import { ROLES } from "@/types";
import { copyClipBoard } from "@/utils/format";
import RoleBasedGuard from "@/hooks/RoleBaseGuard";
import { userSiteUrl } from "@/config";

interface QuickInfoProps {
  totalPlayers: number;
  onlineUsers: number;
  todayRegisteredUsers: number;
  todayBettingUsers: number;
  todayBettingCount: number;
}

const QuickInfo: React.FC<QuickInfoProps> = ({
  totalPlayers,
  onlineUsers,
  todayRegisteredUsers,
  todayBettingUsers,
  todayBettingCount,
}) => {
  const userInfo = useSelector((state: AppState) => state.auth.user);
  return (
    <div className="flex gap-2 divide-x divide-stroke dark:divide-strokedark">
      <RoleBasedGuard roles={[ROLES.TIER1, ROLES.TIER2, ROLES.TIER3]}>
        <div>
          <h4 className="text-center">
            Affilliate Link:{" "}
            <span
              className="cursor-copy font-medium text-black dark:text-white"
              onClick={() => {
                copyClipBoard(
                  `${userSiteUrl}/?referral=${userInfo.code}`,
                  "Referral link copied.",
                );
              }}
            >
              {userInfo.code}
            </span>
          </h4>
        </div>
      </RoleBasedGuard>
    </div>
  );
};

export default QuickInfo;
