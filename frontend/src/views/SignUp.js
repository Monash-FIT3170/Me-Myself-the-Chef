import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/login-signup.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signupError, setSignupError] = useState('');
    const { isLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();
   
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/logged_in');
        }
    }, [isLoggedIn, navigate]);

    const handleSignUp = async (e) => {
        e.preventDefault();

        // Basic validation before sending to backend
        if (username.trim() === "") {
            setSignupError("Username cannot be empty.");
            return;
        }
        if (email.trim() === "") {
            setSignupError("Email cannot be empty.");
            return;
        }
        if (password.trim() === "") {
            setSignupError("Password cannot be empty.");
            return;
        }

        const userData = {
            username: username,
            email: email,
            password: password
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const data = await response.json();
                setSignupError(data.message);
                return;
            }

            setSignupSuccess(true);
            setSignupError('');
            
        } catch (error) {
            console.error('Sign up error:', error);
            setSignupError('Sign up failed. Please try again.');
            setSignupSuccess(false);
        }
    };

    return (
        <>
            <section className="main_box">
                <div className="form">
                    <center>
                        <h1>Sign up</h1>
                        <p>Already have an account? <Link to="/login" className='link'>Login</Link></p>
                    </center>
                    {signupSuccess && (
                        <div className="alert alert-success" role="alert">
                            Sign up successful! <Link to="/login">Click here to login</Link>.
                        </div>
                    )}
                    {signupError && (
                        <div className="alert alert-danger" role="alert">
                            {signupError}
                        </div>
                    )}
                    <form onSubmit={handleSignUp}>
                        <center>
                            <input name="username" placeholder="Username" className='input form-control form_width' value={username} onChange={(e) => setUsername(e.target.value)} />
                            <br />
                            <input name="email" placeholder="Email" className='input form-control form_width' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <br />
                            <input name="password" placeholder="Password" className='input form-control form_width' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <br />
                        </center>
                        <br />
                        <center>
                            <button type="submit" className='login_button btn btn-success'>Sign up</button>
                        </center>
                    </form>
                </div>
                <div className="login_image_div">
                    <img className="login_image" src="/static/images/login_graphic.png" alt="Placeholder" />
                </div>
            </section>
        </>
    );
};

export default SignUp;