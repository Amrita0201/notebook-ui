import React from 'react';
import Navbar from './navbar/navbar';
import { BrowserRouter  } from 'react-router-dom';
import Routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
