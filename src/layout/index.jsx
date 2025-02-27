import { NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss"
import { getCookie } from "../helpers/cookie";
import { useSelector } from "react-redux"
function LayoutDefault() {
    const token = getCookie("token");
    const isLogin = useSelector(state => state.loginReducer);
    console.log(isLogin);

    return (
        <div className="layout-default">
            <header className="layout-default__header">
                <div className="layout-default__logo"></div>
                <div className="layout-default__menu">
                    <ul>
                        <li>
                            <NavLink to="/" aria-label="Home">Home</NavLink>
                        </li>
                        {token && (<><li>
                            <NavLink to="/topic" aria-label="Topic">Topic</NavLink>
                        </li>
                            <li>
                                <NavLink to="/answers" aria-label="Answers">Answers</NavLink>
                            </li></>)}


                    </ul>
                </div>
                <div className="layout-default__account">
                    {token ? (<><NavLink to="/logout">Đăng xuất</NavLink></>) : (<><NavLink to="/login">Đăng nhập</NavLink>
                        <NavLink to="/register">Đăng ký</NavLink></>)}

                </div>
            </header>
            <main className="layout-default__main"><Outlet /></main>
            <footer className="layout-default__footer">Copy right @ 2025</footer>
        </div>
    )
}
export default LayoutDefault;