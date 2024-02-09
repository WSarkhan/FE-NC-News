
import { Link } from "react-router-dom"
import "./Header.css"
import { refreshPage } from "../../utils/utils"


export const Header = () => {

    return (
        <header className="header">
            <Link onClick={ refreshPage } to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <h1>NC News</h1>
            </Link>
        </header>
    )
}