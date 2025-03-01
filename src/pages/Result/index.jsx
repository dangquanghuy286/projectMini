import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListAnswer } from "../../services/answerService";
import { getListQuestion } from "../../services/questionService";
import "./result.scss"
function Result() {
    const params = useParams();
    const [dataResult, setDataResult] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            const dataAnswers = await getListAnswer(params.id);
            const dataQuestion = await getListQuestion(dataAnswers.topicId);
            // Khởi tạo một mảng rỗng để lưu kết quả
            let res = [];
            // Duyệt qua từng phần tử trong mảng dataQuestion bằng vòng lặp for
            for (let i = 0; i < dataQuestion.length; i++) {
                // Đẩy một object mới vào mảng res
                res.push({
                    // Sao chép toàn bộ thuộc tính của phần tử dataQuestion[i] vào object mới
                    ...dataQuestion[i],

                    // Kiểm tra xem dataAnswers.answers có phải là một mảng không
                    ...(Array.isArray(dataAnswers.answers)
                        ?
                        // Nếu đúng, tìm trong mảng answers phần tử có questionId trùng với id của dataQuestion[i]
                        dataAnswers.answers.find(item => Number(item.questionId) === Number(dataQuestion[i].id)) || {}
                        :
                        // Nếu không phải mảng, trả về một object rỗng để tránh lỗi
                        {}
                    )
                });
            }

            // In kết quả ra console để kiểm tra
            setDataResult(res);

        }
        fetchApi();
    }, [])
    return (
        <>
            <h1>
                Kết quả: {dataResult.filter(item => item.correctAnswer === item.answer).length}/{dataResult.length}
            </h1>

            <div className="answer__list">
                {dataResult.map((item, index) => (
                    <div className="answer__item" key={item.id}>
                        <p>Câu {index + 1}: {item.question} {item.correctAnswer === item.answer ? (
                            <span className="answer__tag answer__tag--true">Đúng</span>
                        ) : (
                            <span className="answer__tag answer__tag--false">Sai</span>
                        )}</p>
                        {item.answers.map((itemAns, indexAns) => {
                            let isSelected = false;
                            let rightSelected = "";

                            if (item.answer === indexAns) {
                                isSelected = true;
                                rightSelected = "answer__item--selected";
                            }
                            if (item.correctAnswer === indexAns) {
                                rightSelected = "answer__item--result";
                            }
                            return (
                                <div className="answer__answer" key={indexAns}>
                                    <input type="radio" checked={isSelected} disabled />
                                    <label className={rightSelected}>{itemAns}</label>
                                </div>
                            );
                        })}

                    </div>
                ))}
            </div>

        </>
    )
}
export default Result;