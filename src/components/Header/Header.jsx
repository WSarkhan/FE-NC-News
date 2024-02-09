
import { Link } from "react-router-dom"
import "./Header.css"



export const Header = () => {

    return (
        <header className="header">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>NC News</h1>
            </Link>
        </header>
    )
}