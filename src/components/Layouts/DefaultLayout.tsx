"use client";
import React, { useState, ReactNode, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { shallowEqual, useSelector } from "react-redux";
import { AppState, useAppDispatch } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { PATH_LOGIN, PATH_PAGE } from "@/config/path";
import FullScreenLoader from "../common/Loader/FullScreenLoader";
import { convertUser, validateToken } from "@/services/apis/auth";
import { loginSuccess, logoutRequest } from "@/redux/reducers/auth.reducer";
import StatsDetailModal from "../Popup/Stats/StatsDetailPopup";
import {
  setShowNotificationModal,
  setShowTodayStatsModal,
} from "@/redux/reducers/modal.reducer";
import NotificationModal from "../Popup/Notification/NotificationPopup";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { isLogin, showTodayStatsModal, showNotificationModal, isLoading } =
    useSelector(
      (state: AppState) => ({
        showTodayStatsModal: state.modal.showTodayStatsModal,
        showNotificationModal: state.modal.showNotificationModal,
        isLogin: state.auth.isLogin,
        isLoading: state.auth.isLoading,
      }),
      shallowEqual,
    );
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-2 md:p-2 xl:p-2 2xl:p-4">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>

        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {isLoading && <FullScreenLoader />}

      <StatsDetailModal
        show={showTodayStatsModal}
        onClose={() => dispatch(setShowTodayStatsModal(false))}
        setShow={() => {}}
      />
      <NotificationModal
        show={showNotificationModal}
        onClose={() => dispatch(setShowNotificationModal(false))}
        setShow={() => {}}
      />
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
