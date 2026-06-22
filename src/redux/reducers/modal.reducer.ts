import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalState } from "@/types/reducer-types";
import { NotificationType } from "@/types";

const initialState: ModalState = {
  showTodayStatsModal: false,
  showNotificationModal: false,
  selectedNotification: {id: "", title: "", description: "", image: "", link: "" }
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    setShowTodayStatsModal: (
      state: ModalState,
      action: PayloadAction<boolean>,
    ) => {
      state.showTodayStatsModal = action.payload;
    },
    setShowNotificationModal: (state: ModalState, action: PayloadAction<boolean>) => {
      state.showNotificationModal = action.payload;
    },
    setSelectedNotification: (state: ModalState, action: PayloadAction<NotificationType>) => {
      state.selectedNotification = action.payload;
    },
  },
});

export const {
  setShowTodayStatsModal,
  setShowNotificationModal,
  setSelectedNotification
} = modalSlice.actions;

export default modalSlice.reducer;
