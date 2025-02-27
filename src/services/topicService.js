import { get } from "../utils/request"

export const getListTopic = async () => {
    const res = await get(`topics`)
    return res;
}
export const getTopic = async (id) => {
    const res = await get(`topics/${id}`)
    return res;
}