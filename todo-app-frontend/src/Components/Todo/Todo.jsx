import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    imgBgDesktopDark, imgBgDesktopLight, imgBgMobileDark, imgBgMobileLight, imgFavicon, iconCheck,
    iconCross,
    iconMoon,
    iconSun
}
    from '../Images';





const Todo = () => {
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    useEffect(() => {
        async function fetchTodos() {
            const url = 'http://127.0.0.1:8001/api/';
            const header = {
                'content-Type': 'application/json',
            }

            let response = await fetch(`${url}/todos`, { header });
            let data = await response.json();
            setData(data);
        }
    }, [])

    // if (!loginToken) {

    // }
    return (
        <main className="container">
            <header className='row' id='header'>

            </header>
            <section className="row">
                <img src={imgBgDesktopDark} alt="" />
            </section>
        </main>
    )
}

export default Todo
