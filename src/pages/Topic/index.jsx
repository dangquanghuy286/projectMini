import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getListTopic } from "../../services/topicService";

function Topic() {
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {
            const res = await getListTopic();
            setTopics(res)
        }
        fetchAPI();
    }, [])
    return (
        <>
            <h2>Danh sách các chủ đề</h2>
            {topics.length > 0 && (<table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tên chủ đề</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Link to={"/quiz/" + item.id}>Làm bài</Link>
                            </td>
                        </tr>))}

                </tbody>
            </table>)}


        </>
    )
}
export default Topic;