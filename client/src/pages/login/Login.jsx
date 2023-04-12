import { Link } from "react-router-dom"
import "./login.css"
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useState } from "react"

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { dispatch, isFetching } = useContext(Context);
    const [error, setError] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(false); //hide error message first.
        dispatch({ type: "LOGIN_START" });
        try {
            const response = await axios.post("/authentication/login", {
                username: userRef.current.value, 	//username from form input field
                password: passwordRef.current.value, //password from form input field
            });

            dispatch({ type: "LOGIN_SUCCESSFUL", payload: response.data });
        } catch (error) {
            dispatch({ type: "LOGIN_FAILED" });
            setError(true); //show error message.
        }
    }

    return (
        <div className="login">

            <span className="loginTitle" style={{ color: "white", fontWeight: "500" }}>Login</span>

            <form className="loginForm" onSubmit={handleSubmit}>
                <label style={{ color: "white", fontWeight: "500" }}>Username</label>
                <input
                    type="text"
                    className="loginInput"
                    placeholder="Enter your username..."
                    ref={userRef}
                />

                <label style={{ color: "white", fontWeight: "500" }}>Password</label>
                <input
                    type="password"
                    className="loginInput"
                    placeholder="Enter your password..."
                    ref={passwordRef}
                />

                <button className="loginButton" type="submit" disabled={isFetching}>
                    Login
                </button>
            </form>

            <button className="loginRegisterButton">
                <Link className="link" to="/register">
                    REGISTER
                </Link>
            </button>
            {error && <span className="loginErrorMessage">Invalid Credentials!</span>}
        </div>
    )
}
