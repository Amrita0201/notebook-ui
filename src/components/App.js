import React, { useState, useEffect } from 'react';
import Navbar from './navbar/navbar';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import AuthContext from '../context/auth.context';
import useAuthContext from '../hooks/use-auth.hook';
import axios from './axios';

function App() {
  const [render, setRender] = useState(false);
  const authContext = useAuthContext();
  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.get('/isloggedin')
        .then((res) => {
          if (res.status === 200) {
            authContext.setLoggedInStatus(true);
          }
        })
        .catch(err => localStorage.clear())
        .finally(() => {
          setRender(true);
        });
    } else {
      setRender(true);
    }
  }, []);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={authContext}>
        <Navbar />
        {render ? <Routes /> : null}
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
