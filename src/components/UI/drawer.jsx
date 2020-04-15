import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

const drawer = (props) => {
    const CustomizedDrawer = withStyles(props.fn)(Drawer);
    const newProps = {...props};
    delete newProps.fn;
    return (
        <CustomizedDrawer {...newProps}>
            {props.children}
        </CustomizedDrawer>
    );
}

export default drawer;