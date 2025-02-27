import { get } from "../utils/request";
import { getCookie } from "../helpers/cookie"
export const getAnswersByUserId = async () => {
    const userId = getCookie("id")
    const res = await get(`answers?userId=${userId}`)
    return res;
}