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
        overflow: 'auto',
        '& p': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        '& .MuiTypography-displayBlock': {
            display: 'flex',
            '& span': {
                flexGrow: 1,
                flexBasis: 0
            },
            '& svg': {
                color: '#6b6b6b',
                opacity: 0
            },
            '&:hover svg': {
                opacity: 1
            }
        }
    }
}));

const notesDrawer = (props) => {
    const [listItem, setListItem, addItemToList, updateItemList] = useAddItem([]);
    const { bookId } = useParams();
    const history = useHistory();
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

    const onBlurCB = (e, text, id, index) => {
        const innerText = e.target.innerText;
        if (innerText === '') {
            alert('Note name can not be empty');
            const items = listItem.slice();
            items.pop();
            setListItem(items);
        }
        else if (text === '') {
            axios.post(`/book/${bookId}/note`, { name: innerText, content: '', subHeader: '' })
                .then(res => {
                    console.log(res.data.data);
                    updateItemList(innerText, index);
                })
                .catch(err => {
                    console.error(err.response.data);
                    const items = listItem.slice();
                    items.pop();
                    setListItem(items);
                });
        } else if (innerText !== text) {
            axios.put(`/book/${bookId}/note/${id}`, { name: innerText })
                .then(res => {
                    updateItemList(innerText, index);
                })
                .catch(err => {
                    console.error(err.response);
                    updateItemList(text, index);
                })
        }
    };

    const onDeleteCB = (e, index, id) => {
        axios.delete(`/book/${bookId}/note/${id}`)
            .then(res => {
                setListItem(listItem.filter((item,i) => index !== i));
                history.push(`/notebook/${bookId}/note/`);
            })
            .catch(err => console.error(err));
    };

    const onClickCB = (e, id) => {
        history.push(`/notebook/${bookId}/note/${id}`);
    }

    return (
        <Drawer variant='persistent' anchor='left' open={true} fn={drawerStyles}>
            <List ref={listRef} className={classes.list}>
                {listItem.map((listItem, index) => (
                    <ListItem key={listItem.name + index} index={index} id={listItem.id} onDeleteCB={onDeleteCB} onBlurCB={onBlurCB} primary={listItem.name} onClick={onClickCB} secondary={`${listItem.subHeader ? listItem.subHeader : ''}`} />
                ))}
            </List>
            <DrawerButton onClick={onAddNote}>Add note</DrawerButton>
        </Drawer>
    );
}

export default notesDrawer;