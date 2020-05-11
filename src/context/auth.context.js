import React from 'react';

const authContext = React.createContext({ 
    isLoggedIn: false, 
    setLoggedInStatus: () => { }
});

export default authContext;