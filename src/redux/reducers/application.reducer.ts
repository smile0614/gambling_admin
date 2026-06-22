import { toast } from "react-toastify";
import { AppDispatch } from "../store";

export const onApplicationError =
  (appError: any, toastDuration: number = 5000) =>
  (dispatch: AppDispatch) => {
    const error = (appError && appError.message) || null;
    error && toast(error, { type: "error", toastId: "error" });
  };
