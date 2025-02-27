import { setCookie } from "../../helpers/cookie";
import { login } from "../../services/userService";
import { useNavigate } from "react-router-dom"
function Login() {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        const res = await login(email, password);
        console.log(res);
        if (res.length > 0) {
            console.log(res);
            setCookie("id", res[0].id, 1)
            setCookie("fullname", res[0].fullname, 1)
            setCookie("email", res[0].email, 1)
            setCookie("token", res[0].token, 1)
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