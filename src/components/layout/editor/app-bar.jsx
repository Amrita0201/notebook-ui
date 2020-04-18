/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import LabelIcon from '@material-ui/icons/Label';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const useStyles = makeStyles((theme) => ({
    appbar: {
        backgroundColor: "#EBEBEB",
        flexDirection: 'row',
        height: 48,
        alignItems: 'center',
        zIndex: 5
    },
    leftbar: {
        display: 'inline-flex',
        flexGrow: 1,
        alignItems: 'center'
    },
    rightbar: {
        display: 'inline-flex',
        alignItems: 'center',
        color: 'black'
    },
    outlinedinput: {
        height: 17,
        fontSize: 11,
        marginLeft: 10,
        backgroundColor: "#FFF",
        '& fieldset': {
            border: 'none !important',
        },
        '&.Mui-focused': {
            '& > fieldset': {
                border: '1px solid rgba(0,0,0, 0.23) !important'
            }
        }
    },
    labelicon: {
        marginLeft: 10,
        stroke: 'rgba(0,0,0,0.15)',
        strokeWidth: 1,
    },
    chip: {
        height: 17,
        fontSize: 11,
        marginLeft: 9,
        backgroundColor: "#FFF",
        '& > .MuiSvgIcon-root.MuiChip-deleteIcon': {
            height: 14
        },
        '& > .MuiChip-label': {
            marginBottom: -1
        },
    },
    dotsMenu: {
        margin: '0 12px 0 6px',
        cursor: 'pointer'
    },
    star: {
        cursor: 'pointer',
        display: 'inline-flex'
    }
}));

const handleClick = () => { };
const handleDelete = () => { };

const appBar = () => {
    const classes = useStyles();
    const [isStarred, setIsStarred] = useState(false);

    const starOnClickHanlder = () => setIsStarred((currentVal) => !currentVal);

    return (
        <AppBar position="static" className={classes.appbar}>
            <div className={classes.leftbar}>
                <LabelIcon className={classes.labelicon} />
                <OutlinedInput id="tags" placeholder="Tags" className={classes.outlinedinput} />
                <div>
                    <Chip label="TagName"
                        onClick={handleClick}
                        onDelete={handleDelete} className={classes.chip} />
                </div>
            </div>
            <div className={classes.rightbar}>
                <div onClick={starOnClickHanlder} className={classes.star}>
                    {isStarred ? <StarIcon /> : <StarBorderIcon />}
                </div>
                <MoreHorizIcon className={classes.dotsMenu}/>
            </div>
        </AppBar>
    );
}

export default appBar;