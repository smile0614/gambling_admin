import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ROLES, UserType } from "@/types";
import { AuthState } from "@/types/reducer-types";

import { AppDispatch } from "../store";
import Api from "@/services/api";
import { API_USER_LOGIN } from "@/config/api.url.constant";

const initialUser: UserType = {
  id: "",
  code: "",
  name: "",
  email: "",
  loosingSettlementPercent: 0,
  wagerSettlementPercent: 0,
  role: ROLES.ADMIN,
};

const initialState: AuthState = {
  isLogin: false,
  user: initialUser,
  token: "",
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginSuccess: (
      state: AuthState,
      action: PayloadAction<{ user: UserType; token: string }>,
    ) => {
      state.isLogin = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
    },
    logOut: (state: AuthState) => {
      state.isLogin = false;
      state.token = "";
      state.user = initialUser;
    },
    setIsLoading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { loginSuccess, logOut, setIsLoading } = authSlice.actions;
export default authSlice.reducer;

// export const signInRequest = (email: string, password: string, handleError?: Function) => async (dispatch: AppDispatch) => {
//     try {
//         const response = await Api.post(API_USER_LOGIN, { email, password });
//         const { token } = response;
//         dispatch(loginSuccess({ user: initialUser, token }))
//     } catch (error) {
//         handleError && handleError()
//     }
// }

export const logoutRequest = () => (dispatch: AppDispatch) => {
  localStorage.setItem("accessToken", "");
  dispatch(logOut());
};
