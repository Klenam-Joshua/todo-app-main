import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    imgBgDesktopDark, imgBgDesktopLight, imgBgMobileDark, imgBgMobileLight, iconCheck,
    iconCross,

}
    from '../../Components/Images';

import Login from '../Login/Login';
import './Todo.css';



const Todo = ({ modes, style, icon }) => {


    let isDarkMode = localStorage.getItem("DARKMODE");
    const dataText = localStorage.getItem("LoginItem");
    const dataJson = JSON.parse(dataText);
    const [token, setToken] = useState(dataJson.usertoken);
    const [user, setUser] = useState(dataJson.user);
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [responseError, setResponseError] = useState(false);
    const [darkMode, setDarkMode] = useState(isDarkMode === "true");

    // =====function to handle darkMode toggle========
    const navigate = useNavigate();

    // console.log(token)
    const isLoggedIn = () => {
        if ((!token || !user.id)) {
            navigate('/login');

        }
    }

    isLoggedIn();



    const toggleMode = () => {
        setDarkMode(prevMode => !prevMode);

    }
    useEffect(
        () => {

            modes(darkMode);


        }, [darkMode])




    useEffect(() => {

        async function fetchTodos() {
            const url = 'http://127.0.0.1:8000/api/';
            const headers = {
                'content-Type': 'application/json',
                'token': ` Bearer ${user.token}`,
                'userId': user.id

            }
            try {

                let response = await fetch(`${url}tasks`, { headers });
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
                    console.log(data)
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        console.log(user.id)
     let fetched =    setInterval(fetchTodos,5000);
        return (()=>{
              clearInterval(fetched);
        })
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
                    {
                        filteredData?.map((item,index)=>{
                                return (
                                    <div key={index} className="row">
                                          
                                          <p>{item.title}</p>
                                </div>
                                )
                        })
                    }
            </section>
        </main >
    )
}

export default Todo
