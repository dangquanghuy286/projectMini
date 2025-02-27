import { NavLink, Outlet } from "react-router-dom";
import "./LayoutDefault.scss"
function LayoutDefault() {
    return (
        <div className="layout-default">
            <header className="layout-default__header">
                <div className="layout-default__logo"></div>
                <div className="layout-default__menu">
                    <ul>
                        <li>
                            <NavLink to="/" aria-label="Home">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/topic" aria-label="Topic">Topic</NavLink>
                        </li>
                        <li>
                            <NavLink to="/answers" aria-label="Answers">Answers</NavLink>
                        </li>
                        <li>
                            <NavLink to="/" aria-label="Logout">Log Out</NavLink>
                        </li>
                    </ul>
                </div>
            </header>
            <main className="layout-default__main"><Outlet /></main>
            <footer className="layout-default__footer">Copy right @ 2025</footer>
        </div>
    )
}
export default LayoutDefault;