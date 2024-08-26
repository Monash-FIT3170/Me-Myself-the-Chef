import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/login-signup.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
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

        const userData = {
            username: email,
            password: password
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Sign up failed');
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
                            <input name="email" placeholder="Email" className='input' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <br />
                            <br />
                            <input name="password" placeholder="Password" className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <br />
                        </center>
                        <br />
                        <br />
                        <center>
                            <button type="submit" className='login_button'>Sign up</button>
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
