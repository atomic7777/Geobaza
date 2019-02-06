import React from 'react';
import classes from './Backdrop.module.css';
import Hoc from "../../../hoc/Hoc/Hoc"

const backdrop = (props) => (
    props.show ?
    <Hoc>
                 
        <div className={classes.Backdrop}
            onClick={props.clicked} >
           {props.loading?  <div className={classes.ldsdualring}>  </div>     : null}
         <div className={classes.Geobaza}/> 
          
        </div>    
        </Hoc>
        : null
)

export default backdrop;