import { useParams } from "react-router-dom";
import { useEffect, useState } from "react"
import { getTopic } from "../../services/topicService";
import { getListQuestion } from "../../services/questionService";
function Quiz() {
    const params = useParams();
    const [datatopic, setDatatopic] = useState();
    const [dataquestion, setDataquestion] = useState();
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getTopic(params.id);
            setDatatopic(res)
        }
        fetchApi();
    }, []);
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListQuestion(params.id);
            setDataquestion(res)
        }
        fetchApi();
    }, []);
    console.log(dataquestion);

    return (
        <>
            <h2>Chủ đề: {datatopic && (<>{datatopic.name}</>)}</h2>

        </>
    )
}
export default Quiz;