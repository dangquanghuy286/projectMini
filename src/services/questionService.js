import { get } from "../utils/request";

export const getListQuestion = async (topicId) => {
    const res = await get(`questions?topicId=${topicId}`)
    return res;
}