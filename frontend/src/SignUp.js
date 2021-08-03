import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const SignUp = ({ stateChanger }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [roomError, setRoomError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [credit, setCredit] = useState(99);
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("in");

        try {
            const res = await fetch('http://localhost:8080/signup', {
                method: 'POST',
                body:  JSON.stringify({ name, room, email, password, credit }),
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                credentials: 'include'
            });
            const data = await res.json();
            if (data.errors) {
                console.log("error");
                setNameError(data.errors.name);
                setRoomError(data.errors.room);
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);
            }
            if (data.token) {
                stateChanger(true);
                console.log("all good", data.token);
                history.push("/");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label>Name</label>
            <input 
                required
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}  
            />
            <div className="name error">{ nameError }</div>
            <label>Room</label>
            <input 
                required
                type="text" 
                value={room}
                onChange={(e) => setRoom(e.target.value)}  
            />
            <div className="room error">{ roomError }</div>
            <label>Email</label>
            <input 
                required
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}  
            />
            <div className="email error">{ emailError }</div>
            <label>Password</label>
            <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
            />
            <div className="password error">{ passwordError }</div>
            <div className="alr-signup">Already have an account? <Link to="/login">Log in</Link></div>
            <button>Sign Up</button>
        </form>
    );
}
 
export default SignUp;