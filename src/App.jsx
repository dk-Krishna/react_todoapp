import React, { Fragment, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { Context, server } from './main';

// importing components
import Header from "./components/Header";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import toast from 'react-hot-toast';

const App = () => {

  const { setUser, setIsAuthenticated, setLoading } = useContext(Context);

  useEffect(()=> {
    setLoading(true);

    axios
      .get(
        `${server}/user/me`, 
        { 
          withCredentials: true
        })
      .then((res)=> {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((err)=> {
        toast.error(err.response.data.message);
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);


  return (
    <Fragment>
      <Router>

        <Header />
        <Routes >

          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
        
      </Router>
    </Fragment>
  );
};

// Time Stamp: [6:13]

export default App;