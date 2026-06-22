import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

import authReducer from "./reducers/auth.reducer";
import statisticsReducer from "./reducers/statistics.reducer";
import modalReducer from "./reducers/modal.reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    statistics: statisticsReducer,
    modal: modalReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

const makeStore = () => store;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// export const store = makeStore();
export const wrapper = createWrapper<AppStore>(makeStore);
export { store };
// export const { store } = wrapper.;
