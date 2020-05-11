import { useState, useCallback } from 'react';

const UseAuthContext = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const setLoggedInStatus = useCallback((loggedInStatus) => setIsLoggedIn(loggedInStatus), [isLoggedIn]);
    return {
        isLoggedIn,
        setLoggedInStatus
    }
};

export default UseAuthContext;