import Todo from './Components/Todo/Todo';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
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
  const [style, setStyle] = useState({})
  const [desktopMode, setDestopMode] = useState({});



  const modes = (darkMode) => {
    if (darkMode) {

      setModeIcon(iconSun)

      const modeStyle = {
        body: {

          backgroundColor: 'var(--vDarkBlue)',
          transition: '0.8s background-color, background-image'


        },

        head: {
          backgroundImage: `url(${imgBgDesktopDark})`,
        },
        todosContainer: {
          backgroundColor: 'var( --vDarkDesaturatedBlue)',
          boxShadow: 'none',

          transition: '0.8s background-color, background-image'
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
        optionsOnHover: {
          color: 'var(--LightGrayishBlue)'
        },
        option: {
          color: 'var(--DarkGrayishBlue)',
          transition: '0.4s color'
        }
        ,

        icons: { animation: 'rotate_360 1s linear 0.1s 1' }


      }
      setStyle(modeStyle);
      setDestopMode(modeStyle);
      localStorage.setItem("DARKMODE", darkMode);
      // mode = localStorage.getItem('DARKMODE');
    }
    else {
      localStorage.setItem("DARKMODE", darkMode)
      const modeStyle = {
        head: {
          backgroundImage: `url(${imgBgDesktopLight})`,
        },
        body: {
          backgroundColor: 'white',
          transition: '0.8s background-color, background-image'

        },
        todosContainer: {
          backgroundColor: 'var(--vLightGray)',
          transition: '0.8s background-color, background-image'

        },
        circle: {
          background: 'var(--checkBackground)',
        },

        todos: {
          borderBottom: '1px solid var(--LightGrayishBlue)',

        }
        ,
        optionsOnHover: {
          color: 'var(--vDarkGrayishBlue)'
        },
        option: {
          color: 'var(--darkGrayishBlue)'
        }
        ,
        todoTitle: {
          color: 'var(--DarkGrayishBlue)'
        }
        , icons: { animation: 'rotate_180 1 0.1s linear 1s' }

      }


      localStorage.removeItem('DARKMODE');

      setModeIcon(iconMoon)
      setStyle(modeStyle);
      setDestopMode(modeStyle);
    }




  }

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setSize(newWidth)
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    let darkMode = localStorage.getItem("DARKMODE");
    if (size <= 375 && darkMode) {
      const newStyle = {
        ...style,
        head: {
          backgroundImage: `url(${imgBgMobileDark})`
        }

      }
      setStyle(newStyle);

    }
    else if (size <= 375 && !darkMode) {
      const newStyle = {
        ...style,
        head: {
          backgroundImage: `url(${imgBgMobileLight})`
        }

      }
      setStyle(newStyle);

    }
    else {
      setStyle(desktopMode)
    }
  }, [size])


  return (
    <>
      <Router>

        <Routes>

          <Route path="/" element={<Login />} />
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
