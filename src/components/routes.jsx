/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './login/login';
import Layout from './layout/layout';
import AuthContext from '../context/auth.context';

const routes = () => {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <Switch>
            <Route path='/(login|signup)' component={Login} />
            {isLoggedIn ? <Route path='/notebook/:bookId/note/:noteId' component={Layout} /> : <Redirect to="/login" />}
            {isLoggedIn ? <Route path='/notebook/:bookId' component={Layout} /> : <Redirect to="/login" />}
            {isLoggedIn ? <Route path='/notebook' component={Layout} /> : <Redirect to="/login" />}
            <Redirect from="/*" to="/login" />
        </Switch>
    )
}

export default routes;