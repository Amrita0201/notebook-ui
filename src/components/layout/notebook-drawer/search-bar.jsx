/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import axios from '../../axios';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    backgroundColor: 'white',
    margin: '12px 7px',
    border: '1px solid lightgray',
    '&:focus-within': {
      searchIcon: {
        color: '#000'
      }
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#707070',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(2.5)}px)`,
    width: '100%',
  },
}));

const searchBar = (props) => {
  const classes = useStyles();

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13 || e.which === 13 || e.charCode === 13 || e.key === 13) {
      
    }
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        onKeyDown={onKeyDownHandler}
        inputProps={{ 'aria-label': 'search' }}
      />
    </div>
  );
}

export default searchBar;