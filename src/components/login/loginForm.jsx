/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormInput from '../UI/formInput';
import Button from '../UI/button';
import { Link, useHistory } from 'react-router-dom';

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

const loginForm = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <form className="row align-items-center justify-content-center" noValidate autoComplete="off">
            <div className={`col-12 col-md-5 col-sm-8 ${classes.loginForm}`}>
                <FormInput id="email_address" placeholder="Email Address" fn={loginStyles} />
                <FormInput id="password" placeholder="Password" type="password" fn={loginStyles} />
                <Button variant="contained" fn={buttonStyles} onClick={() => history.push('/notebook')}>
                    Sign In
                </Button>
                <p className={classes.footnote}>Don't have an account? <Link to='/signup'>Sign Up!</Link></p>
            </div>
        </form>
    );
};

export default loginForm;