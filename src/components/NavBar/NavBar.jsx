import "./NavBar.css"
import { Link } from 'react-router-dom';

export const NavBar = () => {

    return (
        <div>
            <nav className="nav-bar">
                <ul>
                    <li><Link to="/">Home</Link></li>
                </ul>
            </nav>
        </div>
    )
}