import { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ stateChanger }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8080/login', {
                method: 'POST',
                body:  JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                credentials: 'include'
            });
            const data = await res.json();
            if (data.errors) {
                console.log("error");
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);
            }
            if (data.token) {
                stateChanger(true);
                console.log("all good", data.token);
                // localStorage.setItem("token", data.token);
                history.push("/");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Log in</h2>
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
            <button>Log in</button>
        </form>
    );
}
 
export default Login;