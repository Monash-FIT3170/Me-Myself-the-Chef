import '../../../public/static/css/login-signup.css';

const Login = () => {
    return (
        <>
            <section className="main_box">
                <div className="form">
                    <center>
                        <h1>Login</h1>
                        <p>New here? <a href="#" className='link'>Sign up</a></p>
                    </center>
                    <form>
                        <center>
                            <input name="email" placeholder="Email" className='input' />
                            <br />
                            <br />
                            <input name="password" placeholder="Password" className='input' type="password" />
                            <br />
                        </center>
                        <a href="#" className='link'>Forgot password?</a>
                        <br />
                        <br />
                        <center>
                            <button className='login_button'>Login</button>
                        </center>
                    </form>

                </div>
                    <img className="login_image" src="placeholder_image.jpg"></img>
            </section>
        </>

    )
};

export default Login;
