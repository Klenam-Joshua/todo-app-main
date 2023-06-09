import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    imgBgDesktopDark, imgBgDesktopLight, imgBgMobileDark, imgBgMobileLight, imgFavicon, iconCheck,
    iconCross,
    iconMoon,
    iconSun
}
    from '../../Components/Images';

import Login from '../Login/Login';



const Todo = ({ token, user }) => {
    if (!token) {
        navigate('/login');
    }

    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [responseError, setResponseError] = useState(false);



    useEffect(() => {
        async function fetchTodos() {
            const url = 'http://127.0.0.1:8001/api/';
            const header = {
                'content-Type': 'application/json',
                'token': `Bearer:${token}`
            }
            try {

                let response = await fetch(`${url}/todos`, { header });
                if (response.status === 401) {
                    navigate('/login');
                }
                else if (response.status === 404) {
                    setNotFound(true);
                }

                if (!response.ok) {
                    setResponseError(true);
                }

                else if (response.status === 200) {
                    let data = await response.json();
                    setData(data);
                    setFilteredData(data);
                }
            }
            catch (error) {
                console.log(error);
            }
        }

    }, [])


    return (
        <main className="container">
            <header className='row' id='header'>

            </header>
            <section className="row">

            </section>
        </main>
    )
}

export default Todo
