import '../../../public/static/css/login-signup.css';

const SignUp = () => {
    return (
        <>
            <section className="main_box">
                <div className="form">
                    <center>
                        <h1>Sign up</h1>
                        <p>Already have an account? <a href="#" className='link'>Login</a></p>
                    </center>
                    <form>
                        <center>
                            <input name="email" placeholder="Email" className='input' />
                            <br />
                            <br />
                            <input name="password" placeholder="Password" className='input' type="password" />
                            <br />
                        </center>
                        <br />
                        <br />
                        <center>
                            <button className='login_button'>Sign up</button>
                        </center>
                    </form>

                </div>
                    <img className="login_image" src="placeholder_image.jpg"></img>
            </section>
        </>

    )
};

export default SignUp;
