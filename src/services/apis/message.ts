import { API_MESSAGE_HISTORY } from "@/config"
import Api from "../api"

export const getMessageHistory = async (page: number, page_size: number) => {
    return Api.get(API_MESSAGE_HISTORY, { page, page_size })
}