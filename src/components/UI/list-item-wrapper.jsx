/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const listItem = (props) => {
    const listItemRef = useRef(null);
    useEffect(() => {
        const listItem = listItemRef.current;
        listItem.firstElementChild.setAttribute('contenteditable', '');
        const onBlurCB = (e) => {
            props.onBlurCB(e, props.primary, props.id, props.index);
        };
        listItem.firstElementChild.addEventListener("blur", onBlurCB);
        return () => {
            listItem.firstElementChild.removeEventListener("blur", onBlurCB);
        };
    }, []);

    const onClickHandler = (e) => {
        props.onClick(e, props.id);
    };

    return (
        <ListItem>
            <ListItemText primary={props.primary} onClick={onClickHandler} secondary={props.secondary} ref={listItemRef} />
        </ListItem>
    );
};

export default listItem;