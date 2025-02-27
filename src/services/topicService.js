import { get } from "../utils/request"

export const getListTopic = async () => {
    const res = await get(`topics`)
    return res;
}