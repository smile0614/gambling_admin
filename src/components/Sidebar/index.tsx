"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import StatsBox from "./StatsBox";
// import { saveUserInfo } from "@/Store/Actions/action";
import users from "./Roles";
import { useDispatch, useSelector } from "react-redux";
import SvgColor from "@/assets/svgs/SvgColor";
import { navConfig } from "@/config/config-menu-data";
import cn from "classnames";
import path from "path";
import { AppState } from "@/redux/store";
import RoleBasedGuard from "@/hooks/RoleBaseGuard";
import { PATH_PAGE } from "@/config/path";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const userInfo = useSelector((state: AppState) => state.auth.user);
  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);
  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={cn(
        "absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black lg:static",
        "duration-300 ease-linear dark:bg-boxdark lg:translate-x-0",
        { "translate-x-0": sidebarOpen, "-translate-x-full": !sidebarOpen },
      )}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-10 py-4.5 lg:py-5">
        <Link href={PATH_PAGE.dashboard}>
          <Image
            width={174}
            height={35}
            src={"/images/logo/logo.svg"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <SvgColor
            src={`/assets/icons/MenuIcon.svg`}
            style={{ width: 1, height: 1 }}
          />
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-2 py-0 lg:px-4 xl:px-6">
          {/* <!-- Menu Group --> */}

          {navConfig.map((group, index) => (
            <div key={index}>
              <RoleBasedGuard roles={group.roles || []}>
                <h3 className="mb-2 ml-4 text-sm font-semibold text-bodydark2">
                  {group.subheader}
                </h3>
              </RoleBasedGuard>

              <ul className="mb-5 flex flex-col gap-1.5">
                {group.items.map((item, _i) => (
                  <SidebarLinkGroup
                    activeCondition={
                      pathname?.includes(item.path)
                        ? pathname?.includes(item.path)
                        : false
                    }
                    key={_i}
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          {item.children.length > 0 && (
                            <div
                              className={cn(
                                `group relative flex cursor-pointer items-center gap-1.5 rounded-sm px-2 py-2 text-[14px] font-medium text-bodydark1 duration-300 ease-in-out xl:gap-2.5 xl:px-4 xl:text-[16px]`,
                                {
                                  "text-primary":
                                    pathname === item.path ||
                                    (item.path !== "/" &&
                                      pathname?.includes(item.path)),
                                  hidden: !item.roles.includes(userInfo.role),
                                },
                              )}
                              onClick={(e) => {
                                // e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              {item.icon && (
                                // <SvgColor
                                //   src={`/assets/icons/${item.icon}.svg`}
                                //   style={{ width: 20, height: 20 }}
                                // />
                                <Image
                                  src={`/assets/icons/menu/${item.icon}.png`}
                                  className="mb-[4px]"
                                  width={20}
                                  height={20}
                                  alt=""
                                />
                              )}
                              {item.title}
                              {item.children.length > 0 && (
                                <SvgColor
                                  src="/assets/icons/arrow.svg"
                                  className={cn(
                                    `absolute right-2 top-1/2 -translate-y-1/2 fill-current xl:right-4`,
                                    { "rotate-180": open },
                                  )}
                                  style={{ width: 20, height: 20 }}
                                />
                              )}
                            </div>
                          )}
                          {item.children.length === 0 && (
                            <Link
                              href={item.path}
                              className={cn(
                                `group relative flex items-center gap-1.5 rounded-sm px-2 py-2 text-[14px] font-medium text-bodydark1 duration-300 ease-in-out xl:gap-2.5 xl:px-4 xl:text-[16px]`,
                                {
                                  "text-primary":
                                    pathname === item.path ||
                                    (item.path !== "/" &&
                                      pathname?.includes(item.path)),
                                  hidden: !item.roles.includes(userInfo.role),
                                },
                              )}
                              onClick={(e) => {
                                // e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              {item.icon && (
                                // <SvgColor
                                //   src={`/assets/icons/${item.icon}.svg`}
                                //   style={{ width: 20, height: 20 }}
                                // />
                                <Image
                                  src={`/assets/icons/menu/${item.icon}.png`}
                                  className="mb-[4px]"
                                  width={20}
                                  height={20}
                                  alt=""
                                />
                              )}
                              {item.title}
                              {item.children.length > 0 && (
                                <SvgColor
                                  src="/assets/icons/arrow.svg"
                                  className={cn(
                                    `absolute right-2 top-1/2 -translate-y-1/2 fill-current xl:right-4`,
                                    { "rotate-180": open },
                                  )}
                                  style={{ width: 20, height: 20 }}
                                />
                              )}
                            </Link>
                          )}

                          {/* <!-- Dropdown Menu Start --> */}
                          {item.children.length > 0 && (
                            <div
                              className={cn(
                                `translate transform overflow-hidden`,
                                {
                                  hidden: !open,
                                },
                              )}
                            >
                              <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                {item.children.map((child, _k) => (
                                  <RoleBasedGuard roles={child.roles} key={_k}>
                                    <li key={_k}>
                                      <Link
                                        href={child.path}
                                        className={cn(
                                          `group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-body duration-300 ease-in-out`,
                                          {
                                            "text-primary":
                                              pathname === child.path ||
                                              pathname?.includes(child.path),
                                          },
                                        )}
                                      >
                                        {child.title}
                                      </Link>
                                    </li>
                                  </RoleBasedGuard>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* <!-- Dropdown Menu End --> */}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
