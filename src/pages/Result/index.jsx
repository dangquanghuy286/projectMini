import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Result() {
    const params = useParams();
    const [dataResult, setDataResult] = useState([]);
    useEffect(() => {
        const fetchAPI = async () => {

        }
        fetchAPI();
    }, [])
    return (
        <>
            Result
        </>
    )
}
export default Result;