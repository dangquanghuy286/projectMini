import { useDispatch } from "react-redux";
import { setCookie } from "../../helpers/cookie";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom"
import { checkLogin } from "../../actions/login";
function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const res = await login(email, password);

        if (res.length > 0) {

            setCookie("id", res[0].id, 1)
            setCookie("fullname", res[0].fullname, 1)
            setCookie("email", res[0].email, 1)
            setCookie("token", res[0].token, 1)
            dispatch(checkLogin(true))
            navigate("/")

        } else {
            alert("Sai tafi khoarn hoajc maajt khaau")
        }

        console.log(e);

    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div>
                    <input type="email" placeholder="Nhập email"></input>
                </div>
                <div>
                    <input type="password" placeholder="Nhập mật khẩu"></input>
                </div>
                <button>Login</button>
            </form>
        </>
    )
}
export default Login;