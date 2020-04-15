import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from './login/login';
import Layout from './layout/layout';

const routes = () => {
    return (
        <Switch>
            <Route path='/(login|signup)' component={Login} />
            <Route path='/notebook' component={Layout} />
            <Redirect from="/*" to="login" />
        </Switch>
    )
}

export default routes;