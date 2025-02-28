// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getListAnswer } from "../../services/answerService";
// import { getListQuestion } from "../../services/questionService";

// function Result() {
//     const params = useParams();
//     const [dataResult, setDataResult] = useState([]);
//     useEffect(() => {
//         const fetchAPI = async () => {
//             const dataAnswers = await getListAnswer(params.id);
//             const dataQuestion = await getListQuestion(dataAnswers.topicId);
//             console.log(dataQuestion);

//             let res = [];
//             for (let i = 0; i < dataQuestion.length; i++) {
//                 res.push({
//                     ...dataQuestion[i],
//                     ...dataAnswers.answers.find(item => item.questionId === dataQuestion)
//                 })
//             }

//         }
//         fetchAPI();
//     }, [])
//     return (
//         <>
//             Result
//         </>
//     )
// }
// export default Result;