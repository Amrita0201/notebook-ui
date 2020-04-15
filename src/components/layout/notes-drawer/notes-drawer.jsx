import React from 'react';
import DrawerButton from '../common/drawer-button';
import Drawer from '../../UI/drawer';

const drawerStyles = (theme) => ({
    paper: {
        height: 'calc(100vh - 49px)',
        width: 258,
        position: 'relative',
        zIndex: 9,
        backgroundColor: '#ffff',
        '-webkit-box-shadow': '3px 0px 7px -2px rgba(0,0,0,0.2)',
        '-moz-box-shadow': '3px 0px 7px -2px rgba(0,0,0,0.2)',
        'box-shadow': '3px 0px 7px -2px rgba(0,0,0,0.2)',
    }
});


const notesDrawer = () =>{
    return (
        <Drawer variant='persistent' anchor='left' open={true} fn={drawerStyles}> 
            <DrawerButton>Add note</DrawerButton>
        </Drawer>
    );
}

export default notesDrawer;