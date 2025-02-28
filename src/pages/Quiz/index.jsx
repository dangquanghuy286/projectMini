import { useNavigate, useParams } from "react-router-dom"; // Lấy tham số từ URL
import { useEffect, useState } from "react"; // Hook để quản lý trạng thái và hiệu ứng
import { getTopic } from "../../services/topicService"; // Hàm gọi API lấy thông tin chủ đề
import { getListQuestion } from "../../services/questionService"; // Hàm gọi API lấy danh sách câu hỏi
import { getCookie } from "../../helpers/cookie"
import { createAnswer } from "../../services/quizService";

function Quiz() {
    const params = useParams(); // Lấy tham số từ URL (ví dụ: ID của chủ đề)
    const [datatopic, setDatatopic] = useState(); // Trạng thái lưu chủ đề hiện tại
    const [dataquestion, setDataquestion] = useState(); // Trạng thái lưu danh sách câu hỏi
    const navigate = useNavigate();

    // useEffect đầu tiên: Lấy thông tin chủ đề từ API khi component được render
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getTopic(params.id); // Gọi API lấy dữ liệu chủ đề
            setDatatopic(res); // Lưu chủ đề vào state
        };
        fetchApi();
    }, []); // Chỉ chạy một lần khi component mount

    // useEffect thứ hai: Lấy danh sách câu hỏi từ API
    useEffect(() => {
        const fetchApi = async () => {
            const res = await getListQuestion(params.id); // Gọi API lấy danh sách câu hỏi
            setDataquestion(res); // Lưu danh sách câu hỏi vào state
        };
        fetchApi();
    }, []); // Chỉ chạy một lần khi component mount

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(e);
        let selectedAnswers = [];
        for (let i = 0; i < e.target.elements.length; i++) {
            if (e.target.elements[i].checked) {
                const name = e.target.elements[i].name;
                const value = e.target.elements[i].value;
                selectedAnswers.push({
                    questionId: parseInt(name),
                    answer: parseInt(value)
                })

            }
        }

        let options = {
            id: Date.now(),
            userId: parseInt(getCookie("id")),
            topicId: parseInt(params.id),
            answers: selectedAnswers

        }
        const res = await createAnswer(options);
        if (res) {
            navigate(`/result/${res.id}`)
        }
    }
    return (
        <>
            {/* Hiển thị tên chủ đề nếu có dữ liệu */}
            <h2>Chủ đề: {datatopic && (<>{datatopic.name}</>)}</h2>

            <div className="form-quiz">
                <form onSubmit={handleSubmit}>
                    {/* Kiểm tra nếu có dữ liệu câu hỏi thì render, nếu không thì hiển thị thông báo "Đang tải dữ liệu..." */}
                    {dataquestion?.length > 0 ? (
                        dataquestion.map((item, index) => (
                            <div className="form-quiz__item" key={item.id}>
                                <p>Câu {index + 1}: {item.question}</p>
                                {item.answers.map((itemAns, indexAns) => (
                                    <div className="form-quiz__answer" key={indexAns}>
                                        <input type="radio" name={item.id} value={indexAns} id={`quiz-${item.id}-${indexAns}`} />
                                        <label htmlFor={`quiz-${item.id}-${indexAns}`}>{itemAns}</label>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>Đang tải dữ liệu...</p> // Hiển thị khi chưa có dữ liệu
                    )}
                    <button type="submit">Nộp bài</button>
                </form>

            </div>
        </>
    );
}

export default Quiz;
