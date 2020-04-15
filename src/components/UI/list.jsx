/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';

const bookList = (props) => {
    const CustomizedList = withStyles(props.fn)(List);
    const newProps = {...props};
    delete newProps.fn;
    return (
        <CustomizedList {...newProps}>
            {props.children}
        </CustomizedList>
    );
}

export default bookList;