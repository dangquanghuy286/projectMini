import { useEffect, useState } from "react"; // Import useEffect để chạy logic khi component được render, useState để lưu trữ dữ liệu
import { getAnswersByUserId } from "../../services/answerService"; // Import hàm lấy danh sách câu trả lời theo userId
import { getListTopic } from "../../services/topicService"; // Import hàm lấy danh sách chủ đề từ API
import { Link } from "react-router-dom"; // Import Link để tạo liên kết đến trang chi tiết kết quả

function Answers() {
    const [dataAnswers, setDataAnswers] = useState([]); // Khai báo state để lưu danh sách câu trả lời của người dùng

    useEffect(() => {
        // Hàm async để gọi API
        const fetchApi = async () => {
            const answersById = await getAnswersByUserId(); // Gọi API lấy danh sách câu trả lời theo userId
            const topics = await getListTopic(); // Gọi API lấy danh sách chủ đề

            let res = []; // Mảng dùng để lưu kết quả kết hợp từ hai API

            for (let i = 0; i < answersById.length; i++) {
                // Tìm topic tương ứng với mỗi câu trả lời, cần ép kiểu để tránh lỗi so sánh số và chuỗi
                const topic = topics.find(item => Number(item.id) === Number(answersById[i].topicId));

                // Gộp thông tin từ câu trả lời và chủ đề lại
                res.push({
                    ...answersById[i], // Sao chép toàn bộ thông tin từ câu trả lời
                    name: topic ? topic.name : "Không có chủ đề" // Nếu không tìm thấy chủ đề, gán tên mặc định
                });
            }

            setDataAnswers(res.reverse()); // Đảo ngược danh sách để hiển thị mới nhất trước
        };

        fetchApi(); // Gọi hàm fetch dữ liệu
    }, []); // useEffect chỉ chạy một lần khi component mount

    return (
        <>
            <h2>Danh sách bài đã luyện tập</h2>
            {dataAnswers.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Topic</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataAnswers.map((item, index) => (
                            <tr key={`${item.id}-${index}`}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>
                                    <Link to={`/result/${item.id}`}>Xem chi tiết</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Chưa có bài luyện tập nào.</p>
            )}
        </>

    );
}

export default Answers; // Xuất component để sử dụng trong các phần khác của ứng dụng
