import { useNavigate } from "react-router-dom";
import { checkExits, register } from "../../services/userService";
import { generateToken } from "../../helpers/generateTonken";

function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullname = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const checkExitEmail = await checkExits("email", email);
        if (checkExitEmail.length > 0) {
            alert("Email đã tồn tại")
        } else {
            const options = {
                fullname: fullname,
                email: email,
                password: password,
                token: generateToken()
            };

            try {
                const res = await register(options);
                if (res) {
                    alert("Đăng ký thành công!");
                    navigate("/login");
                } else {
                    alert("Đăng ký thất bại! Vui lòng thử lại.");
                }
            } catch (error) {
                console.error("Lỗi khi gọi API đăng ký:", error);
                alert("Có lỗi xảy ra! Vui lòng thử lại sau.");
            }
        }

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div>
                    <input type="text" placeholder="Nhập họ tên" required />
                </div>
                <div>
                    <input type="email" placeholder="Nhập email" required />
                </div>
                <div>
                    <input type="password" placeholder="Nhập mật khẩu" required />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
