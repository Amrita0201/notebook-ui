/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import Drawer from '../../UI/drawer';
import SearchBar from './search-bar';
import BottomBar from './bottomBar';
import DrawerButton from '../common/drawer-button';
import List from '../../UI/list';
import ListItem from '../../UI/list-item-wrapper';
import useAddItem from '../../../hooks/use-add-item.hook';
import axios from '../../axios';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const drawerStyles = (theme) => ({
    paper: {
        height: 'calc(100vh - 49px)',
        width: 258,
        position: 'relative',
        overflow: 'hidden',
        zIndex: 20,
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

let allListItem = [];

const notebookDrawer = () => {
    const [listItem, setListItem, addItemToList, updateItemList] = useAddItem([]);
    const listRef = useRef(null);
    const focusHack = useRef(0);
    const classes = useStyles();
    const history = useHistory();
    const searchType = useRef(0);

    useEffect(() => {
        axios.get('/book')
            .then(res => {
                setListItem(res.data.data);
                allListItem = res.data.data.slice();
            });
    }, []);

    const onAddBook = () => {
        addItemToList({ name: '' });
    };

    useEffect(() => {
        if (focusHack.current > 1) {
            const lastChildNode = listRef.current.lastElementChild && listRef.current.lastElementChild.firstElementChild && listRef.current.lastElementChild.firstElementChild.firstElementChild;
            lastChildNode && lastChildNode.focus();
        }
        focusHack.current++;
    }, [listItem, focusHack]);

    const onBlurCB = (e, text, id, index) => {
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
        history.push(`/notebook/${id}`);
    }

    const onClickHandler = (val) => {
        searchType.current = val;
        switch (val) {
            case (0): {
                if (allListItem.length && listItem.length !== allListItem.length) {
                    setListItem(allListItem);
                } else {
                    axios.get('/book')
                        .then(res => {
                            setListItem(res.data.data);
                            allListItem = res.data.data.slice();
                        });
                }
                return;
            }
            case (2): {
                axios.get('/search?tag=&name=&starred=true')
                    .then(res => {
                        const data = Array.isArray(res.data.data) ? res.data.data : [];
                        setListItem(data);
                    })
                    .catch(err => {
                        console.error(err);
                    });
                return;
            }
            default:
                console.log(val);
        }
    };

    return (
        <Drawer variant="permanent" anchor="left" fn={drawerStyles}>
            <SearchBar searchType={searchType} setListItem />
            <List ref={listRef} className={classes.list}>
                {listItem.map((listItem, index) => (
                    <ListItem key={listItem.name + index} index={index} id={listItem.id} onBlurCB={onBlurCB} primary={listItem.name} onClick={onClickCB} secondary={`${listItem.numOfNotes ? listItem.numOfNotes : '0'} Notes`} />
                ))}
            </List>
            <DrawerButton onClick={onAddBook}>Add Book</DrawerButton>
            <BottomBar onClickHandler={onClickHandler} />
        </Drawer>
    );
};

export default notebookDrawer;
