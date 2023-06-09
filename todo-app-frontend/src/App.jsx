import Todo from './Components/Todo/Todo';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react'
import { useState } from 'react';


function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (

    <Router>
      <Routes>
        <Route exact path='/todos' element={Todo} />
      </Routes>
    </Router>

  );
}

export default App
