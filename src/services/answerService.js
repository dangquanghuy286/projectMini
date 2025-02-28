import { get } from "../utils/request";
import { getCookie } from "../helpers/cookie"
export const getAnswersByUserId = async () => {
    const userId = getCookie("id")
    const res = await get(`answers?userId=${userId}`)
    return res;
}
export const getListAnswer = async (id) => {
    const res = await get(`answers/${id}`)
    return res;
}