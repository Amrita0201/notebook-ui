/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Button from '../../UI/button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    text: {
        marginBottom: -2,
        marginLeft: theme.spacing(0.5)
    }
}));

const buttonStyles = (theme) => ({
    root: {
        width: `calc(100% - ${theme.spacing(2)}px)`,
        backgroundColor: 'rgba(55, 34, 15, 0.97)',
        borderRadius: '54px',
        fontSize: '13px',
        paddingTop: '10px',
        paddingBottom: '10px',
        margin: 'auto',
        marginBottom: 12,
        '&:hover, &:active, &:focus': {
            backgroundColor: 'rgba(55, 34, 15, 0.97)',
            boxShadow: 'none',
        },
    },
    contained: {
        color: '#fff'
    },
    label: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const drawerButton = (props) => {
    const classes = useStyles();
    return (
        <Button variant="contained" fn={buttonStyles}>
            <Icon fontSize="small">add_circle</Icon>
            <span className={classes.text}>
                {props.children}
                </span>
        </Button>
    );
}

export default drawerButton;