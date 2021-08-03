import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navbar = ({ user, login, stateChanger }) => {
    const history = useHistory();
    const handleLogout = async (e) => {
        try {
            const res = await fetch('http://localhost:8080/logout', {
                method: 'GET',
                withCredentials: true,
                credentials: 'include'
            });
            const data = await res.json();
            if (data.redirect) {
                setIsUser(false);
                stateChanger(false);
                history.push("/");
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    const [isUser, setIsUser] = useState(user);

    return (
        <nav className="navbar">
            <h1><Link to="/">Eusoff App</Link></h1>
            <div>
                { (login || isUser) &&
                    <ul>
                        <li><Link to={`/profile/${user._id}`}>Welcome, { user.name } ({ user.room })</Link></li>
                        <li><a onClick={handleLogout}>Log out</a></li>
                    </ul>
                }
                { (!isUser && !login) &&
                    <ul>
                        <li><Link to="/login">Log in</Link></li>
                        <li><Link to="/signup" className="btn">Sign up</Link></li>
                    </ul>
                }
            </div>
        </nav>
    );
}
 
export default Navbar;