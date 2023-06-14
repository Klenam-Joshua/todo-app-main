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


        },

        head: {
          backgroundImage: `url(${imgBgDesktopDark})`,
        },
        todosContainer: {
          backgroundColor: 'var( --vDarkDesaturatedBlue)',
          boxShadow: 'none'
        }
        ,
        todos: {
          background: 'var(--checkBackground)',
        },
        todoTitle: {
          color: 'var( --LightGrayishBlue)'
        }

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

        },
        todosContainer: {
          backgroundColor: 'var(--vLightGray)',

        },
        todos: {
          background: 'var(--checkBackground)',
        }
        ,
        todoTitle: {
          color: 'var(--DarkGrayishBlue)'
        }

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
