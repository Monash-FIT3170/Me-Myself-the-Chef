import { useState } from 'react';
import '../css/login-signup.css';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                // response.json().then(data => {
                //     throw new Error(data.message || 'Network response was not ok');
                //   })
                throw new Error('Sign up failed');
            }

            // Sign up successful, perform further actions like redirecting to another page
            alert("Sign Up successful!")

        } catch (error) {
            console.error('Sign up error:', error);
            // Handle sign up error, display error message to the user
            alert('Sign up failed!');
        }
    };

    return (
        <>
            <section className="main_box">
                <div className="form">
                    <center>
                        <h1>Sign up</h1>
                        <p>Already have an account? <a href="#" className='link'>Login</a></p>
                    </center>
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
                    <img className="login_image" src="placeholder_image.jpg" alt="Placeholder" />
            </section>
        </>
    );
};

export default SignUp;
