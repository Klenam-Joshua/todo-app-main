import Todo from './Components/Todo/Todo';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import GuestLayout from './Components/GuestLayout/GuestLayout';
import './assets/style/global.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useState } from 'react';
import {
  imgBgDesktopDark, imgBgDesktopLight, imgBgMobileDark, imgBgMobileLight, imgFavicon, iconCheck,
  iconCross,
  iconMoon,
  iconSun
}
  from './Components/Images';


function App() {





  const [modeIcon, setModeIcon] = useState(iconMoon);
  const [size, setSize] = useState(window.innerWidth);
  const [style, setStyle] = useState()



  const modes = (darkMode) => {
    console.log(darkMode, "what came in")
    if (darkMode) {

      console.log(darkMode + "the one inside")

      setModeIcon(iconSun)

      const style = {
        body: {

          backgroundColor: 'var(--vDarkBlue)',
          transition:'0.8s background-color, background-image'


        },

        head: {
          backgroundImage: `url(${imgBgDesktopDark})`,
        },
        todosContainer: {
          backgroundColor: 'var( --vDarkDesaturatedBlue)',
          boxShadow: 'none',
          transition:'0.8s background-color, background-image'
        }
        ,
        todos: {
          borderBottom: '1px solid var(--vDarkGrayishBlue)'
        },

        circle: {
          background: 'var(--checkBackground)',
        },
        todoTitle: {
          color: 'var( --LightGrayishBlue)'
        },
   
        icons:{animation: 'rotate_360 1s linear 0.1s 1'}


      }
      setStyle(style);
      localStorage.setItem("DARKMODE", darkMode);
      // mode = localStorage.getItem('DARKMODE');
    }
    else {
      localStorage.setItem("DARKMODE", darkMode)
      const style = {
        head: {
          backgroundImage: `url(${imgBgDesktopLight})`,
        },
        body: {
          backgroundColor: 'white',
          transition:'0.8s background-color, background-image'

        },
        todosContainer: {
          backgroundColor: 'var(--vLightGray)',
          transition:'0.8s background-color, background-image'

        },
        circle: {
          background: 'var(--checkBackground)',
        },

        todos: {
          borderBottom: '1px solid var(--LightGrayishBlue)',

        }
        ,


        todoTitle: {
          color: 'var(--DarkGrayishBlue)'
        }
        ,icons:{animation: 'rotate_180 1 0.1s linear 1s'}

      }


      // localStorage.removeItem('DARKMODE');

      setModeIcon(iconMoon)
      setStyle(style);
    }
  }

  useEffect(() => {
    console.log(size)
    const style = {
      //style to apply
    }
  }, [size])

  function geWinowSize() {
    setSize(window.innerWidth);

  }

  window.addEventListener('resize', geWinowSize);

  return (
    <>
      <Router>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/todos' exact element={<Todo modes={modes}
            style={style}
            icon={modeIcon} />} />
        </Routes>
      </Router>
    </>

  );
}

export default App
