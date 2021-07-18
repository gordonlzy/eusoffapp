import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1><Link to="/">Eusoff App</Link></h1>
            <div>
                {/* { user && 
                    <ul>
                        <li><Link to="/profile/<%= user._id %>">Welcome, { user.name } ({ user.room })</Link></li>
                        <li><Link to="/logout">Log out</Link></li>
                    </ul>
                }
                { !user &&
                    <ul>
                        <li><Link to="/login">Log in</Link></li>
                        <li><Link to="/signup" className="btn">Sign up</Link></li>
                    </ul>
                } */}
                <ul>
                    <li><Link to="/login">Log in</Link></li>
                    <li><Link to="/signup" className="btn">Sign up</Link></li>
                </ul>
            </div>
        </nav>
    );
}
 
export default Navbar;