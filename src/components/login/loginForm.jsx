/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormInput from '../UI/formInput';
import Button from '../UI/button';
import { Link, useHistory } from 'react-router-dom';
import axios from '../axios';
import AuthContext from '../../context/auth.context';

const useStyles = makeStyles((theme) => ({
    loginForm: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    footnote: {
        fontSize: '13px',
        marginTop: '15px',
        color: 'rgba(0,0,0,0.4)',
        '& > a': {
            fontSize: '14px',
            textDecoration: 'none',
            color: '#3D2916'
        }
    },
}));

const buttonStyles = (theme) => ({
    root: {
        width: '100%',
        backgroundColor: 'rgba(55, 34, 15, 0.97)',
        borderRadius: '54px',
        fontSize: '16px',
        paddingTop: '10px',
        paddingBottom: '10px',
        '&:hover, &:active, &:focus': {
            backgroundColor: 'rgba(55, 34, 15, 0.97)',
            boxShadow: 'none',
        },
    },
    contained: {
        color: '#ffffff'
    }
});

const loginStyles = (theme) => ({
    outlinedInput: {
        borderRadius: '54px',
        '& > input': {
            fontSize: '14px',
            paddingLeft: '25px',
            paddingRight: '25px',
        },
        '&.Mui-focused': {
            '& > fieldset': {
                border: '1px solid black !important'
            }
        }
    },
    helperText: {
        marginLeft: 20,
        marginTop: 10,
        color: 'red',
        fontSize: 13,
    },
    formControl: {
        width: '100%',
        marginBottom: '40px',
    },
});

const loginForm = () => {
    const classes = useStyles();
    const history = useHistory();
    const { setLoggedInStatus } = useContext(AuthContext);
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
        isFormValid: false
    });
    const [error, setError] = useState({
        status: false,
        msg: ''
    });

    const onInputChange = (e, inputType) => {
        if (inputType==='email') {
            setInputValues((prevValue) => {
                return {
                    ...prevValue,
                    email: e.target.value
                };
            });
        } else if (inputType === 'password') {
            setInputValues((prevValue) => {
                return {
                    ...prevValue,
                    password: e.target.value
                }
            });
        }
    }

    const isFormValid = useCallback(() => {
        return inputValues.email && inputValues.email.trim().length > 0 &&
            inputValues.password && inputValues.password.trim().length > 0;
    }, [inputValues.email, inputValues.password]);

    useEffect(() => {
        setInputValues((prevValue) => {
            return {
                ...prevValue,
                isFormValid: isFormValid()
            }
        })
    }, [inputValues.email, inputValues.password, isFormValid]);

    const onLoginSubmit = (e) => {
        e.preventDefault();
        if (inputValues.isFormValid) {
            axios.post('/login', {
                email: inputValues.email,
                password: inputValues.password
            }).then(res => {
                setLoggedInStatus(false);
                localStorage.setItem('token', res.data.data.token);
                localStorage.setItem('user', res.data.data.name);
                setLoggedInStatus(true);
                history.push('/notebook');
            }).catch(err => {
                console.error(err.response.data);
                setError({
                    status: true,
                    msg: err.response.data.error
                });
            });
        }
    }

    return (
        <form className="row align-items-center justify-content-center" noValidate autoComplete="off">
            <div className={`col-12 col-md-5 col-sm-8 ${classes.loginForm}`}>
                <FormInput id="email_address" value={inputValues.email} onChange={(e) => onInputChange(e, 'email')} placeholder="Email Address" fn={loginStyles} />
                <FormInput error={error.msg} id="password" value={inputValues.password} onChange={(e) => onInputChange(e, 'password')} placeholder="Password" type="password" fn={loginStyles} />
                <Button variant="contained" fn={buttonStyles} onClick={onLoginSubmit} onKeyDown={onLoginSubmit} disabled={!inputValues.isFormValid}>
                    Sign In
                </Button>
                <p className={classes.footnote}>Don't have an account? <Link to='/signup'>Sign Up!</Link></p>
            </div>
        </form>
    );
};

export default loginForm;