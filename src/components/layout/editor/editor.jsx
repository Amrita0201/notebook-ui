/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import AppBar from './app-bar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
}))

const editor = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar />
        </div>
    );
};

export default editor;