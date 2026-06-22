import { API_NOTIFICATION_DELETE, API_NOTIFICATION_LIST } from "@/config";
import Api from "../api";
import { SortType } from "@/types";

export const getLatestNotifications = async (data: {
  page: number;
  page_size: number;
  sort_column?: string;
  sort_order?: SortType
}) => {
  return Api.get(API_NOTIFICATION_LIST, data);
};

export const deleteNotification = async(id: string) => {
  return Api.delete(`${API_NOTIFICATION_DELETE}/${id}`)
}