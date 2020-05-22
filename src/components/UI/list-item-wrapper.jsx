/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { useParams } from 'react-router';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    listItem: {
        backgroundColor: '#C7B5A7',
    }
}));

const listItem = (props) => {
    const classes = useStyles();
    const { bookId, noteId } = useParams();
    const primaryRef = useRef(null);
    const onEditClickHandler = (e) => {
        e.stopPropagation();
        primaryRef.current.setAttribute('contenteditable', '');
        primaryRef.current.focus();
    };

    const onKeyDownHandler = (e) => {
        e.stopPropagation();
        if (e.keyCode === 13 || e.which === 13 || e.charCode === 13 || e.key === 13) {
            e.preventDefault();
            props.onBlurCB(e, props.primary, props.id, props.index);
            primaryRef.current.removeAttribute('contenteditable');
        }
    };

    const onDeleteHandler = (e) => {
        props.onDeleteCB(e, props.index, props.id);
    };

    const primary = (
        <React.Fragment>
            <span ref={primaryRef} onKeyDown={onKeyDownHandler} onClick={(e) => {
                if (document.activeElement === primaryRef.current) {
                    e.stopPropagation();
                }
            }}>{props.primary}</span>
            <EditIcon onClick={onEditClickHandler} />
            <DeleteForeverIcon onClick={onDeleteHandler} />
        </React.Fragment>
    );

    const onClickHandler = (e) => {
        props.onClick(e, props.id);
    };

    return (
        <ListItem className={+bookId === +props.id || +noteId === +props.id ? classes.listItem : null}>
            <ListItemText primary={primary} secondary={props.secondary} onClick={onClickHandler} />
        </ListItem>
    );
};

export default listItem;