import React from 'react';
import classes from './Button.module.css';

const Button = (props) => {
const btnClass=  props.disabled==='true' ? classes.Disabled : classes.Enabled
const disabled=  props.disabled==='true' ? true : false

return(
    <button 
        className={
            [classes.Button,
            btnClass
            ].join(' ')
            }
        disabled={disabled}
        onClick={props.clicked}>
        {props.children}    
    </button>
)

}

    export default Button;


