import { useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { imgBgDesktopDark, imgBgDesktopLight } from '../Images';
import './Login.css';
const apiUrl = import.meta.env.VITE_API_URL;

const Login = () => {

    let isDarkMode = localStorage.getItem("DARKMODE");

    const [notFound, setNotFound] = useState(false);
    const [responseError, setResponseError] = useState(false);
    const [badRequestError, setBadRequestError] = useState(null);
    const [authData, setAuthData] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [userPassword, setUserPassword] = useState(null);
    const [unauthorized, setUnauthorized] = useState(false);
    const navigate = useNavigate();
    const handleLogin = () => {

        async function handlelogin() {

            let data = {
                email: userEmail,
                password: userPassword

            }
            //  console.log(JSON.stringify(data))

            try {

                let response = await fetch(`${apiUrl}login`, {
                    mode: 'cors',
                    headers: {
                        'content-Type': 'Application/json',
                        'connection': 'keep-alive',
                        'accept': '*/*',

                    },
                    method: 'POST',
                    body: JSON.stringify(data)
                });


                if (response.status === 404) {

                    setNotFound(true);
                }
                else if (response.status === 400) {
                    let error = await response.json();

                    setBadRequestError(error)
                    setUnauthorized(true);
                }


                if (!response.ok) {

                    setResponseError(true);

                }

                else if (response.status === 200) {

                    let data = await response.json();

                    setAuthData(data);

                    localStorage.setItem("LoginItem", JSON.stringify(data));
                    navigate("/todos");


                }
            }
            catch (error) {
                // console.log(response.status)
                console.log("error" + error);
            }
        }
        handlelogin();

    }
    return (

        <div style={isDarkMode ? { backgroundImage: `url(${imgBgDesktopLight})` } : { backgroundImage: `url(${imgBgDesktopDark})` }}
            id='loginWrapper'
        >
            <div className='wrapper   w-4' id='login_wrapper'>
                <h2>login</h2>
                <p className='text-red'> {unauthorized ? "invalid  email or password" : ""}</p>
                <div className="form_container ">
                    <form onSubmit={
                        (e) => {
                            e.preventDefault()
                            handleLogin()
                        }
                    }>
                        {
                            badRequestError?.errors?.email ?
                                badRequestError.errors.email.map((error, index) => {
                                    return (
                                        <p key={index} className="text-red">
                                            {error}
                                        </p>
                                    )
                                })

                                : ""
                        }
                        <div className='row flex-dir-column'>
                            <label htmlFor="useremail" >
                                email
                            </label>
                            <input onChange={(e) => {
                                setUserEmail(e.target.value.trim())
                            }}
                                type="text" id="useremail" name="useremail" required />
                        </div>

                        <p className="text-red"> </p>
                        <div className='row flex-dir-column'>
                            <label htmlFor="password">
                                password
                            </label>
                            <input onChange={(e) => {
                                setUserPassword(e.target.value.trim())
                            }}
                                type="password" id="password" name="userpassword" />
                        </div>
                        <div className="row" id='sbtn_container'>
                            <input type="submit" name='sbtn ' vaue="signup" required />
                        </div>
                    </form>
                </div>

                <p>
                    <span>
                        don't have an account ?
                    </span>
                    <a href='/signup'>
                        signup !
                    </a>
                </p>

            </div >

        </div>
    )
}

export default Login
