import { Link } from "react-router-dom"
import "./register.css"
import { useState } from "react"
import axios from "axios";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false); //hide any previous error message
        try {
            const res = await axios.post("/authentication/register", {
                username, email, password
            });
            res.data && window.location.replace("/login");
        } catch (error) {
            setError(true);
        } 
    };
    return (
        <div className="register">

            <span className="registerTitle" style={{color: "white", fontWeight: "500"}}>Register</span> 

            <form className="registerForm" onSubmit={handleSubmit}> 

                <label style={{color: "white", fontWeight: "500"}}>Username</label>
                <input
                    type="text"
                    className="registerInput"
                    placeholder="Enter your username..."
                    onChange={event => setUsername(event.target.value)}
                />

                <label style={{color: "white", fontWeight: "500"}}>Email</label>
                <input
                    type="text"
                    className="registerInput"
                    placeholder="Enter your email..."
                    onChange={event => setEmail(event.target.value)}
                />

                <label style={{color: "white", fontWeight: "500"}}>Password</label>
                <input
                    type="password"
                    className="registerInput"
                    placeholder="Enter your password..."
                    onChange={event => setPassword(event.target.value)}
                />

                <button className="registerButton" type="submit">Register</button>
            </form>

            <button className="registerLoginButton">
                <Link className="link" to="/login">LOGIN</Link>
            </button>
            {error && <span className="registerErrorMessage">Something went wrong!</span>}
        </div>
    )
}
