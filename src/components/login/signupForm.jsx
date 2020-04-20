/* eslint-disable no-sequences */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormInput from '../UI/formInput';
import Button from '../UI/button';
import { useHistory } from 'react-router-dom';
import axios from '../axios';

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
    formControl: {
        width: '100%',
        marginBottom: '40px',
    },
});

const signupForm = () => {
    const classes = useStyles();
    const history = useHistory();
    const [inputValues, setInputValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        isPasswordSame: true,
        isFormValid: false
    });

    const isFormValid =  useCallback(() => {
        return (inputValues.name && inputValues.name.trim().length > 0 && 
            inputValues.email && inputValues.email.trim().length > 0 &&
            inputValues.password && inputValues.password.trim().length > 0 &&
            inputValues.confirmPassword && inputValues.confirmPassword.trim().length > 0 &&
            inputValues.isPasswordSame);
    }, [inputValues.name, inputValues.email, inputValues.password, inputValues.confirmPassword, inputValues.isPasswordSame]);

    useEffect(() => {
        setInputValues((prevValue) => ({...prevValue, isFormValid: isFormValid()}))
    }, [inputValues.name, inputValues.email, inputValues.password, inputValues.confirmPassword, isFormValid]);

    const onInputChange = (event, inputType) => {
        switch(inputType) {
            case 'email': {
                setInputValues((prevValue) => ({...prevValue, email: event.target.value}));
                break;
            }
        
            case 'name':{
                setInputValues((prevValue) => ({...prevValue, name:event.target.value}));
                break;
            }
            case 'password':{
                setInputValues((prevValue) => {
                    let isPasswordSame = true;
                    if (prevValue.confirmPassword) {
                        isPasswordSame = prevValue.confirmPassword === event.target.value;
                    }
                    return {...prevValue, password: event.target.value, isPasswordSame}
                });
                break;
            }
            case 'confirmPassword':{
                setInputValues((prevValue) => {
                    const isPasswordSame = prevValue.password === event.target.value;
                    return {...prevValue, confirmPassword: event.target.value, isPasswordSame}
                });
                break;
            }
            default :
            break;
        }
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        if (inputValues.isFormValid) {
            axios.post('/register', {
                email: inputValues.email,
                name: inputValues.name,
                password: inputValues.password
            }).then(res => {
                console.log(res);
                history.push('/notebook');
            });
            setInputValues((prevValue) => ({...prevValue, isFormValid: false}));
        }
    };

    return (
        <form className="row align-items-center justify-content-center" noValidate autoComplete="off" onSubmit={onFormSubmit}>
            <div className={`col-12 col-md-5 col-sm-8 ${classes.signupForm}`}>
                <FormInput id="name" value={inputValues.name} onChange={(e) => onInputChange(e, 'name')} placeholder="Name" fn={loginStyles} />
                <FormInput id="email_address" value={inputValues.email} onChange={(e) => onInputChange(e, 'email')} placeholder="Email Address" fn={loginStyles} />
                <FormInput id="password" value={inputValues.password} onChange={(e) => onInputChange(e, 'password')} placeholder="Password" type="password" fn={loginStyles} />
                <FormInput id="confirm_password" value={inputValues.confirmPassword} onChange={(e) => onInputChange(e, 'confirmPassword')} placeholder="Confirm password" type="password" fn={loginStyles} />
                <Button variant="contained" fn={buttonStyles} onClick={onFormSubmit} onKeyDown={onFormSubmit} disabled={!inputValues.isFormValid}>
                    Sign Up
                </Button>
            </div>
        </form>
    );
};

export default signupForm;