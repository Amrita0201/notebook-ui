import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { makeStyles } from '@material-ui/core/styles';

const formInput = (props) => {
    const classes = makeStyles(props.fn)();
    const type = props.type ? { type: props.type } : null;
    return (
        <FormControl className={classes.formControl}>
            <OutlinedInput
                onChange={props.onChange}
                {...type}
                value={props.value}
                id={props.id}
                placeholder={props.placeholder}
                className={classes.outlinedInput} />
            {props.error ? <FormHelperText id="my-helper-text" className={classes.helperText}>{props.error}</FormHelperText> : null}
        </FormControl>
    )
};

export default formInput;