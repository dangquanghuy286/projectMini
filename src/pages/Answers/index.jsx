import { useEffect, useState } from "react"; // Import useEffect và useState từ React để quản lý trạng thái và hiệu ứng
import { getAnswersByUserId } from "../../services/answerService"; // Import hàm gọi API lấy danh sách câu trả lời theo user ID
import { getListTopic } from "../../services/topicService"; // Import hàm gọi API lấy danh sách chủ đề
import { Link } from "react-router-dom"; // Import Link từ React Router để tạo liên kết nội bộ

function Answers() {
    const [dataAnswers, setDataAnswers] = useState([]); // Khai báo state để lưu danh sách câu trả lời của người dùng

    useEffect(() => {
        const fetchApi = async () => {
            const answersById = await getAnswersByUserId(); // Gọi API lấy danh sách câu trả lời
            const topics = await getListTopic(); // Gọi API lấy danh sách chủ đề

            let res = []; // Mảng để lưu kết quả sau khi kết hợp dữ liệu

            for (let i = 0; i < answersById.length; i++) {
                res.push({
                    ...answersById[i], // Thêm dữ liệu câu trả lời
                    ...topics.find(item => item.id === answersById[i].topicId), // Tìm và thêm thông tin chủ đề tương ứng
                });
            }

            setDataAnswers(res.reverse()); // Đảo ngược danh sách để hiển thị mới nhất trước

        };
        fetchApi(); // Gọi hàm fetch dữ liệu
    }, []); // Chạy một lần khi component mount

    return (
        <>
            <h2>Danh sách bài đã luyện tập</h2>
            <table>
                <thead>
                    <tr>
                        <th>Topic</th> {/* Cột hiển thị ID của chủ đề */}
                        <th>Answer</th> {/* Cột hiển thị tên của chủ đề */}
                        <th>Details</th> {/* Cột chứa link để xem chi tiết */}
                    </tr>
                </thead>
                <tbody>
                    {dataAnswers.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td> {/* Hiển thị ID của chủ đề */}
                            <td>{item.name}</td> {/* Hiển thị tên chủ đề */}
                            <td><Link to={"/result/" + item.id}>Xem chi tiết</Link></td> {/* Tạo link đến trang chi tiết */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Answers; // Xuất component để có thể sử dụng ở nơi khác
