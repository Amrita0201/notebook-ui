/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import Drawer from '../../UI/drawer';
import SearchBar from './search-bar';
import BottomBar from './bottomBar';
import DrawerButton from '../common/drawer-button';
import List from '../../UI/list';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerStyles = (theme) => ({
    paper: {
        height: 'calc(100vh - 49px)',
        width: 258,
        position: 'relative',
        zIndex: 20,
        backgroundColor: '#ffff',
        '-webkit-box-shadow': '3px 0px 7px -2px rgba(0,0,0,0.2)',
        '-moz-box-shadow': '3px 0px 7px -2px rgba(0,0,0,0.2)',
        'box-shadow': '3px 0px 7px -2px rgba(0,0,0,0.2)',
    }
});

const notebookDrawer = () => {

    return (
        <Drawer variant="permanent" anchor="left" fn={drawerStyles}>
            <SearchBar />
            <List>
                <ListItem>
                    <ListItemText primary="Asian" secondary="16 Notes" />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Italian" secondary="5 Notes" />
                </ListItem>
            </List>
            <DrawerButton>Add Book</DrawerButton>
            <BottomBar />
        </Drawer>
    );
};

export default notebookDrawer;
