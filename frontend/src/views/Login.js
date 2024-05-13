import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/login-signup.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loginError, setLoginError] = useState('');

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

            // Login successful, set loginSuccess state to true
            setLoginSuccess(true);
            setLoginError('');
            // Optionally, you can redirect the user or perform other actions here
        } catch (error) {
            console.error('Login error:', error);
            // Login failed, set loginError state
            setLoginError('Login failed. Please check your credentials and try again.');
            setLoginSuccess(false);
        }
    };

    return (
        <>
            <section className="main_box">
                <div className="form">
                    <center>
                        <h1>Login</h1>
                        <p>New here? <Link to="/sign_up" className='link'>Sign up</Link></p>
                    </center>
                    {loginSuccess && (
                        <div className="alert alert-success" role="alert">
                            Login successful!
                        </div>
                    )}
                    {loginError && (
                        <div className="alert alert-danger" role="alert">
                            {loginError}
                        </div>
                    )}
                    <form onSubmit={handleLogin}>
                        <center>
                            <input name="email" placeholder="Email" className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <br />
                            <br />
                            <input name="password" placeholder="Password" className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <br />
                        </center>
                        <br />
                        <br />
                        <center>
                            <button type="submit" className='login_button'>Login</button>
                        </center>
                    </form>
                </div>
                <img className="login_image" src="/static/images/logo_small.png" alt="Logo" />
            </section>
        </>
    );
};

export default Login;
