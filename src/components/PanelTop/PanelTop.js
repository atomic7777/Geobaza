import React from "react"
import Hoc from "../../hoc/Hoc/Hoc";
import classes from "./PanelTop.module.css";

const PanelTop = (props) => {

return (
<Hoc>
<div className={classes.PanelBackground}>
        <div>{props.tableTitle}</div>
        <span className={classes.Items}>
                <span >      <button onClick={ props.switchTable1}>
                            Tabela robocza
                        </button>  
                        <button onClick={ props.switchTable2}>
                            Archiwum
                        </button>
                        </span>
                        <span style={{TextAlign:'right'}}>
               {props.tableType===2 ?        <button onClick={ props.dateForward}>wprzód</button> : null }
               {props.tableType===2 ?     <button onClick={ props.dateBackward}>wstecz</button> : null }
               </span>
               </span>           

</div>

</Hoc>
)


}

export default PanelTop