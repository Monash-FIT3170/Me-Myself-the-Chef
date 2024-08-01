import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/login-signup.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const { isLoggedIn, login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Check if user is logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/logged_in');
        }
    }, [isLoggedIn, navigate]);

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

            const data = await response.json();

            // Store the token and other data in localStorage
            login(data);

            // Redirect to logged in page upon successful login
            navigate('/ingredients');

        } catch (error) {
            console.error('Login error:', error);
            // Login failed, set loginError state
            setLoginError('Login failed. Please check your credentials and try again.');
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
                
                <div className="login_image_div">
                    <img className="login_image" src="/static/images/login_graphic.png" alt="Logo" />
                </div>

            </section>
        </>
    );
};

export default Login;
