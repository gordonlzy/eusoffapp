import { Link } from "react-router-dom";

const Home = () => {
    return (
        <header>
            <div className="flex-gap">
            <div>
                <h4>Meal Bot</h4>
                <Link to="/meal" className="btn">Check Menu</Link>
            </div>
            <div>
                <h4>Laundry Bot</h4>
                <Link to="/laundry" className="btn">Check Laundry</Link>
            </div>
            <div>
                <h4>Eusoff Favours</h4>
                <Link to="/favours" className="btn">Check Favours</Link>
            </div>
            </div>
        </header>
    );
}
 
export default Home;