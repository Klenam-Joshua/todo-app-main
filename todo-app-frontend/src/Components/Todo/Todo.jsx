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
import './Todo.css';



const Todo = ({ modes, style, icon, loginToken, user }) => {
    const navigate = useNavigate();



    let isDarkMode = localStorage.getItem("DARKMODE");

    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [responseError, setResponseError] = useState(false);
    const [darkMode, setDarkMode] = useState(isDarkMode === "true");

    // =====function to handle darkMode toggle========


    const toggleMode = () => {
        setDarkMode(prevMode => !prevMode);

    }
    useEffect(
        () => {

            modes(darkMode);


        }, [darkMode])




    useEffect(() => {
        if (!loginToken) {
            navigate('/login');
        }
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
        <main className="container" style={style ? style.body : console.log("loadin")}>
            <header style={style ? style.head : console.log("loadin")} id='header'>
                <div className="row  w-5  justify-between align-center" id='modeIconCont'>
                    <h1 className='text-light' id='title'>
                        TODO
                    </h1>
                    <div className="image-container"
                        onClick={() => toggleMode()}
                    >
                        <img src={icon} alt="modeIcon" />
                    </div>

                </div>

                <div style={style ? style.todos : console.log('loading')} className="row  w-5  justify-between " id='search_bar_con'>
                    <div className="circle-con  row justify-center align-center">
                        <div className="circle  ">

                        </div>
                    </div>
                    <input
                        style={style ? style.todos : console.log('loading')}
                        className="text-field" type="text" name="" id="" placeholder='Currently typing' />
                </div>
            </header>
            <section style={style ? style.todos : console.log('loading')}
                className=" w-5  " id='contents'>
                {/* 
                                   <div className="circle  row justify-center align-center">
                            <div className="checkContent">
                                <img src={iconCheck} alt="check icon" />
                            </div>
                        </div>
                         */}
            </section>
        </main >
    )
}

export default Todo
