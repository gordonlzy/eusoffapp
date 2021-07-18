import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="not-found">
            <h2>404, Page not found</h2>
            <Link to="/">Homepage</Link>
        </div>
    );
}
 
export default NotFound;