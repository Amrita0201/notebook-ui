import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const button = (props) => {
    const CustomizedButton = withStyles(props.fn)(Button);
    const newProps = { ...props };
    delete newProps.fn;
    return (
        <CustomizedButton {...newProps}>
            {props.children}
        </CustomizedButton>
    );
}

export default button;
