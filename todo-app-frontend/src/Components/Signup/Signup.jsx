import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Signup.css";
import { imgBgDesktopDark, imgBgDesktopLight } from '../Images';
const apiUrl = import.meta.env.VITE_API_URL


const Signup = ({ style }) => {
    let isDarkMode = localStorage.getItem("DARKMODE");
    const [notFound, setNotFound] = useState(false);
    const [responseError, setResponseError] = useState(false);
    const [badRequestError, setBadRequestError] = useState(null);
    const [userExist, setUserExist] = useState(false);
    const [userAdded, setUserAdded] = useState(false);


    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userContact, setUserContact] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null);


    const [unauthorized, setUnauthorized] = useState(false);
    const navigate = useNavigate();
    const handleSignup = () => {

        async function handlesignup() {

            let data = {
                useremail: userEmail,
                userpassword: userPassword,
                userpassword_confirmation: confirmPassword,
                username: userName,
                userContact: userContact

            }

            const requestOptions = {
                mode: 'cors',
                headers: {
                    'content-Type': 'Application/json',
                    'connection': 'keep-alive',
                    'accept': '*/*',

                },
                method: 'POST',
                body: JSON.stringify(data)
            }

            try {

                let response = await fetch(`${apiUrl}signup`, requestOptions);


                if (response.status === 404) {

                    setNotFound(true);
                }
                else if (response.status === 500) { // console.log(setBadRequestError)
                    console.log(response)
                }
                else if (response.status === 409) {
                    setUserExist(true);
                }
                else if (response.status === 400) {

                    let error1 = await response.json()
                    setBadRequestError(error1);
                    console.log(error1, badRequestError)
                }
                else if (response.status === 401) {
                    setUnauthorized(true);
                    console.log(response.status)
                }

                if (!response.ok) {

                    setResponseError(true);

                }

                else if (response.status === 200) {

                    let data = await response.json();
                    localStorage.setItem("LoginItem", JSON.stringify(data));
                    setUserAdded(true);
                    navigate("/todos");


                }
            }
            catch (error) {
                // console.log(response.status)
                console.log(error);
            }
        }
        handlesignup();

    }


    return (
        <section style={isDarkMode ? { backgroundImage: `url(${imgBgDesktopLight})` } : { backgroundImage: `url(${imgBgDesktopDark})` }}
            className="signup_form_container" id='signupform_con'>
            <div className='wrapper   w-4' id='signup_form_wrapper'>
                {userAdded ? <p> user added successfully</p> : userExist ? <p className='text-red'> please user already exist</p> : ""}
                <h2>sign up</h2>

                <div className="form_container ">
                    <form onSubmit={
                        (e) => {
                            e.preventDefault();
                            handleSignup();
                        }
                    }>
                        {
                            badRequestError?.errors?.username ?
                                badRequestError.errors.username.map((error, index) => {
                                    return (
                                        <p key={index} className="text-red">
                                            {error}
                                        </p>
                                    )
                                })

                                : ""
                        }
                        <div className='row flex-dir-column'>

                            <label htmlFor="username">
                                username
                            </label>
                            <input
                                onChange={
                                    (e) => setUserName(e.target.value)
                                }
                                type="text" id="username" name="username" required />
                        </div>
                        {
                            badRequestError?.errors?.useremail ?
                                badRequestError.errors.useremail.map((error, index) => {
                                    return (
                                        <p key={index} className="text-red">
                                            {error}
                                        </p>
                                    )
                                })

                                : ""
                        }
                        <div className="row  justify-between contacts_row"  >

                            <div className='row flex-dir-column'>
                                <label htmlFor="email">
                                    email
                                </label>
                                <input
                                    onChange={
                                        (e) => setUserEmail(e.target.value)
                                    }
                                    type="email" id="email" name="useremail" required
                                />
                            </div>
                            <div className='row flex-dir-column'>
                                {
                                    badRequestError?.errors?.userContact ?
                                        badRequestError.errors.userContact.map((error, index) => {
                                            return (
                                                <p key={index} className="text-red">
                                                    {error}
                                                </p>
                                            )
                                        })

                                        : ""

                                }
                                <label htmlFor="contact">
                                    contact
                                </label>
                                <input
                                    onChange={
                                        (e) => setUserContact(e.target.value)
                                    }
                                    type="number" id="contact" name="usercontact" required
                                />
                            </div>
                        </div>
                        {
                            badRequestError?.errors?.userpassword ?
                                badRequestError.errors.userpassword.map((error, index) => {
                                    return (
                                        <p key={index} className="text-red">
                                            {error}
                                        </p>
                                    )
                                })

                                : ""
                        }
                        <div className="row  justify-between" id='password_wrapper'>

                            <div className='row flex-dir-column password_row'>
                                <label htmlFor="password">
                                    password
                                </label>
                                <input
                                    onChange={
                                        (e) => setUserPassword(e.target.value)
                                    }
                                    type="password" id="password" name="userpassword" required />
                            </div>
                            <div className='row flex-dir-column password_row'>
                                <label htmlFor="confirm_password">
                                    confirm password
                                </label>
                                <input
                                    onChange={
                                        (e) => setConfirmPassword(e.target.value)
                                    }
                                    type="password" id="confirm_password" name="confirm_password" required />
                            </div>
                        </div>
                        <div className="row" id='sbtn_container'>
                            <input type="submit" name='sbtn ' vaue="signup" required />
                        </div>
                    </form>
                </div>
                <p>

                    <span>
                        already have an account ?
                    </span>
                    <a href='/'>
                        login here !
                    </a>
                </p>

            </div>

        </section>
    );
}

export default Signup
