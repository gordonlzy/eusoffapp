import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <form>
            <h2>Sign up</h2>
            <label for="name">Name</label>
            <input type="text" name="name" required />
            <div className="name error"></div>
            <label for="room">Room</label>
            <input type="text" name="room" required />
            <div className="room error"></div>
            <label for="email">Email</label>
            <input type="text" name="email" required />
            <div className="email error"></div>
            <label for="password">Password</label>
            <input type="password" name="password" required />
            <div className="password error"></div>
            <div className="alr-signup">Already have an account? <Link to="/login">Log in</Link></div>
            <input type="hidden" name="credit" value= "99" />
            <button>Sign up</button>
        </form>
    );
}
 
export default SignUp;