import React, { useState, useContext } from 'react';
import { Navigate  } from 'react-router-dom';
import { AuthContext } from './contextApi/authContext';
import './login.css';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirectToReferrer, setRedirectToReferrer] = useState(false);
    const { user, login } = useContext(AuthContext);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
           const res= await login(username, password);
           console.log(res)
            setRedirectToReferrer(true); // Upon successful login, redirect user
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    };

    // Redirect to the home page after login
    if (redirectToReferrer || user) {
        return <Navigate  to="/" replace />;
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <button type="submit">Log In</button>
            </form>
        </div>
    );
};

export default Login;
