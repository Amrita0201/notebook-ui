/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LabelIcon from '@material-ui/icons/Label';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        borderTop: '1px solid #f3f3f3',
        backgroundColor: '#C7B5A7',
        color: '#fff',
        '& > button': {
            color: '#ffff',
            '&.Mui-selected': {
                color: '#C7B5A7',
                backgroundColor: '#fff'
            }
        }
    },
}));

const bottomBar = (props) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    console.log(value);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                props.onClickHandler(newValue);
            }}
            showLabels
            classes={{ root: classes.root }}
        >
            <BottomNavigationAction icon={<LibraryBooksIcon />} />
            <BottomNavigationAction icon={<LabelIcon />} />
            <BottomNavigationAction icon={<StarBorderIcon />} />
        </BottomNavigation>
    );
};

export default bottomBar;