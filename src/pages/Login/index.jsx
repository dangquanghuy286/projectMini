import { useDispatch } from "react-redux";
import { setCookie } from "../../helpers/cookie";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { checkLogin } from "../../actions/login";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;

        try {
            const res = await login(email.value, password.value);

            if (res.length > 0) {
                const user = res[0];
                setCookie("id", user.id, 1);
                setCookie("fullname", user.fullname, 1);
                setCookie("email", user.email, 1);
                setCookie("token", user.token, 1);
                dispatch(checkLogin(true));
                navigate("/");
            } else {
                alert("Sai tài khoản hoặc mật khẩu");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login. Please try again later.");
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <input type="email" name="email" placeholder="Nhập email" required />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Nhập mật khẩu" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </>
    );
}

export default Login;
