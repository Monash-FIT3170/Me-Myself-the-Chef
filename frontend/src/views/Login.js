import { useState } from 'react';
import '../css/login-signup.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        const userData = {
            username: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Login successful, perform further actions like redirecting to another page

            alert("Login successful!")
        } catch (error) {
            console.error('Login error:', error);
            // Handle login error, display error message to the user
            alert("Login failed!")
        }
    };

    return (
        <>
            <section className="main_box">
                <div className="form">
                    <center>
                        <h1>Login</h1>
                        <p>New here? <a href="#" className='link'>Sign up</a></p>
                    </center>
                    <form onSubmit={handleLogin}>
                        <center>
                            <input name="email" placeholder="Email" className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <br />
                            <br />
                            <input name="password" placeholder="Password" className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <br />
                        </center>
                        <a href="#" className='link'>Forgot password?</a>
                        <br />
                        <br />
                        <center>
                            <button type="submit" className='login_button'>Login</button>
                        </center>
                    </form>
                </div>
                <img className="login_image" src="/static/images/logo_small.png"></img>
            </section>
        </>
    );
};

export default Login;
