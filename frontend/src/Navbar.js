import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="links">
                <Link to="/">Eusoff App</Link>
                <Link to="/login">LOG IN</Link>
                <Link to="/signup">SIGN UP</Link>
            </div>
        </nav>
    );
}
 
export default Navbar;