/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useEffect } from 'react';
import DrawerButton from '../common/drawer-button';
import Drawer from '../../UI/drawer';
import List from '../../UI/list';
import ListItem from '../../UI/list-item-wrapper';
import { useParams, useHistory } from 'react-router';
import axios from '../../axios';
import useAddItem from '../../../hooks/use-add-item.hook';
import { makeStyles } from '@material-ui/core/styles';

const drawerStyles = (theme) => ({
    paper: {
        height: 'calc(100vh - 49px)',
        width: 258,
        position: 'relative',
        zIndex: 9,
        overflow: 'hidden',
        backgroundColor: '#ffff',
        '-webkit-box-shadow': '3px 0px 7px -2px rgba(0,0,0,0.2)',
        '-moz-box-shadow': '3px 0px 7px -2px rgba(0,0,0,0.2)',
        'box-shadow': '3px 0px 7px -2px rgba(0,0,0,0.2)',
    }
});

const useStyles = makeStyles((theme) => ({
    list: {
        overflow: 'auto'
    }
}));

const notesDrawer = (props) => {
    const [listItem, setListItem, addItemToList, updateItemList] = useAddItem([]);
    const { bookId } = useParams();
    const history = useHistory();
    const focusHack = useRef(0);
    const classes = useStyles();
    const listRef = useRef(null);

    const onAddNote = () => {
        addItemToList({ name: '' });
    };

    useEffect(() => {
        axios.get(`/book/${bookId}/note`)
            .then(res => {
                console.log(res.data.data);
                setListItem(res.data.data);
            })
            .catch(err => {
                history.push('/notebook');
            });
    }, [bookId]);

    useEffect(() => {
        if (focusHack.current > 1) {
            const lastChildNode = listRef.current.lastElementChild && listRef.current.lastElementChild.firstElementChild && listRef.current.lastElementChild.firstElementChild.firstElementChild;
            lastChildNode && lastChildNode.focus();
        }
        focusHack.current++;
    }, [listItem, focusHack]);

    const onBlurCB = (e, text, id, index) => {
        console.dir(e);
        if (e.target.innerText === '') {
            alert('Book name can not be empty');
            const items = listItem.slice();
            items.pop();
            setListItem(items);
        }
        else if (text === '') {
            axios.post('/book', { name: e.target.innerText })
                .then(res => {
                    console.log(res.data.data);
                    updateItemList(e.target.innerText, index);
                })
                .catch(err => {
                    console.error(err.response.data);
                    const items = listItem.slice();
                    items.pop();
                    setListItem(items);
                });
        } else if (e.target.innerText !== text) {
            axios.post(`/book/${id}`, { name: e.target.innerText })
                .then(res => {
                    updateItemList(e.target.innerText, index);
                })
                .catch(err => {
                    console.error(err.response);
                    updateItemList(text, index);
                })
        }
    };

    const onClickCB = (e, id) => {
        history.push(`/notebook/${bookId}/note/${id}`);
    }

    return (
        <Drawer variant='persistent' anchor='left' open={true} fn={drawerStyles}>
            <List ref={listRef} className={classes.list}>
                {listItem.map((listItem, index) => (
                    <ListItem key={listItem.name + index} index={index} id={listItem.id} onBlurCB={onBlurCB} primary={listItem.name} onClick={onClickCB} secondary={`${listItem.content ? listItem.content : ''}`} />
                ))}
            </List>
            <DrawerButton onClick={onAddNote}>Add note</DrawerButton>
        </Drawer>
    );
}

export default notesDrawer;