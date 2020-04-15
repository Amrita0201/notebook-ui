/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

const useStyles = makeStyles((theme) => ({
    navbar: {
        height: 49,
        backgroundColor: '#C7B5A7',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        zIndex: 999
    },
    user: {
        marginLeft: 'auto',
        marginRight: 38,
        fontSize: 16,
        color: '#fff'
    },
}));

const navbar = (props) => {
    const classes = useStyles();

    const { isLoggedIn } = props;
    const user = isLoggedIn ? <div className={classes.user}>Jane Doe</div> : null;
    return (
        <AppBar position='relative'>
            <div className={classes.navbar}>
                {user}
            </div>
        </AppBar>
    );
};

export default navbar;
