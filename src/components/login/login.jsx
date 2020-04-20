/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { ReactComponent as NoteIcon } from '../../assets/svg/note.svg';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from './loginForm';
import SignupForm from './signupForm';
import { Switch, Route } from 'react-router-dom';
import Container from '../UI/container';


const useStyles = makeStyles((theme) => ({
    title: {
        fontFamily: "'Eagle Lake', cursive",
        fontSize: 18,
        marginTop: 17,
        marginBottom: 65,
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        color: "#62635D"
    },
    login: {
        marginTop: 85,
        textAlign: 'center'
    }
}));

const login = () => {
    const classes = useStyles();

    return (
        <Container>
            <div className={classes.login}>
                <NoteIcon></NoteIcon>
                <h1 className={classes.title}>The Notebook</h1>
                <Switch>
                    <Route path="/login" component={LoginForm} />
                    <Route path="/signup" component={SignupForm} />
                </Switch>
            </div>
        </Container>
    );
}

export default login;