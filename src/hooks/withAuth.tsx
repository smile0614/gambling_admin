"use client";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

import { AppState, useAppDispatch } from "@/redux/store";
import { PATH_LOGIN, PATH_PAGE } from "@/config/path";
import Loader from "@/components/common/Loader";
import { loginSuccess, logoutRequest } from "@/redux/reducers/auth.reducer";
import { convertUser, validateToken } from "@/services/apis/auth";

type WithAuthComponent<P> = React.FunctionComponent<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactElement;
};

function withAuth<P extends Record<string, never>>(
  WrappedComponent: any,
): WithAuthComponent<P> {
  const Authorization = (props: P) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useAppDispatch();

    const redirectToLogin = () => {
      // router.replace(PATH_LOGIN);
    };

    const handlerMeError = () => {
      dispatch(logoutRequest());
      localStorage.setItem("accessToken", "");
      return new Promise((resolve) => {
        if (pathname !== PATH_LOGIN) {
          redirectToLogin();
        }
        resolve(true);
      });
    };

    const checkIsAuthenticated = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          if (pathname !== PATH_LOGIN) {
            redirectToLogin();
          }
          return;
        }

        const response = await validateToken({ token: accessToken });
        dispatch(
          loginSuccess({ user: convertUser(response), token: accessToken }),
        );
        setIsLoading(false);
        return;
      } catch (err) {
        await handlerMeError();
      } finally {
        setIsLoading(false);
      }
    };

    useEffect(() => {
      checkIsAuthenticated();
    }, []);

    return isLoading ? <Loader /> : <WrappedComponent {...props} />;
  };

  return Authorization;
}

export default withAuth;
