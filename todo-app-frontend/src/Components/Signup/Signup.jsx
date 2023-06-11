import React from 'react'
import "./Signup.css";

const Signup = () => {
    return (
        <div className='wrapper'>
            <h2>sign up</h2>
            <div className="form_container  w-5">
                <form >
                    <div>
                        <label htmlFor="username">
                            username
                        </label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label htmlFor="email">
                            email
                        </label>
                        <input type="email" id="email" name="useremail" />
                    </div>
                    <div>
                        <label htmlFor="password">
                            password
                        </label>
                        <input type="password" id="password" name="userpassword" />
                    </div>
                    <div>
                        <label htmlFor="confirm_password">
                            confirm password
                        </label>
                        <input type="password" id="confirm_password" name="confirm_password" />
                    </div>
                </form>
            </div>
            <p>
                <span>
                    already have an account ?
                </span>
                <a href='/login'>
                    login here !
                </a>
            </p>

        </div>
    );
}

export default Signup
