import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <form>
            <h2>Sign up</h2>
            <label for="name">Name</label>
            <input type="text" name="name" required />
            <div class="name error"></div>
            <label for="room">Room</label>
            <input type="text" name="room" required />
            <div class="room error"></div>
            <label for="email">Email</label>
            <input type="text" name="email" required />
            <div class="email error"></div>
            <label for="password">Password</label>
            <input type="password" name="password" required />
            <div class="password error"></div>
            <div class="alr-signup">Already have an account? <Link to="/login">Log in</Link></div>
            <input type="hidden" name="credit" value= "99" />
            <button>Sign up</button>
        </form>
    );
}
 
export default SignUp;